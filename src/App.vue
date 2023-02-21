<template>
    <v-app>
        <!-- Navbar -->
        <navbar-component />
        <!-- Content -->
        <v-main>
            <!-- User is authorized -->
            <v-container v-if="isAuthenticated">
                <v-row>
                    <!-- Menu -->
                    <menu-component/>
                    <!-- Content -->
                    <router-view />
                </v-row>
            </v-container>
            <!-- User is NOT authorized -->
            <v-container v-else class="scrollable-container">
                <jumbotron-component />
            </v-container>
            <!-- Unauthorized access error -->
            <!-- FIXME: replace text with {text} -->
            <v-snackbar text v-model="redirected" :timeout="8000" color="red" right>
                You have no permissions
                <template v-slot:action="{ attrs }">
                    <v-btn small color="red" text v-bind="attrs" @click="redirected = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import NavbarComponent from './components/navigation/NavbarComponent.vue';
import JumbotronComponent from './components/JumbotronComponent.vue';
import MenuComponent from './components/navigation/MenuComponent.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
            redirected: false,
        };
    },
    components: {
        NavbarComponent,
        JumbotronComponent,
        MenuComponent
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    watch: {
        $route(to, from) {
            if (to.query.redirected === 'true') {
                this.redirected = true;
                this.$router.push(from);
            }
        }
    }
};
</script>

<style>
html,
body {
    overflow: hidden;
}

.scrollable-container {
    max-height: 85vh;
    overflow-y: scroll;
}

.scrollable-container::-webkit-scrollbar {
    display: none;
}

.theme--dark.v-application {
    background-color: var(--v-background-base, #121212) !important;
}

.theme--light.v-application {
    background-color: var(--v-background-base, white) !important;
}
</style>