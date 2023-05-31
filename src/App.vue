<template>
    <v-app>
        <!-- Navbar -->
        <navbar-component/>
        <!-- Content -->
        <v-main>
            <!-- User is authorized -->
            <v-container v-if="isAuthenticated" >
                <v-row class="pa-0 ma-0">
                    <!-- Information message -->
                    <v-col v-if="message" cols="12">
                        <v-toolbar dense rounded elevation="0" class="warning">
                            <v-card-title> account information</v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="hideMessage">
                                <v-icon >mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-col>
                    <!-- Menu -->
                    <v-col cols="3">
                        <menu-component/>
                    </v-col>
                    <!-- Content -->
                    <v-col cols="9">
                        <router-view />
                    </v-col>
                </v-row>
            </v-container>
            <!-- User is NOT authorized -->
            <v-container v-else class="scrollable-container" >
                <jumbotron-component />
            </v-container>
            <!-- Snackbar message -->
            <v-snackbar text v-model="redirected" :timeout="2000" color="red" right>
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
            message: false,
        };
    },
    components: {
        NavbarComponent,
        JumbotronComponent,
        MenuComponent
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'getClientId', 'getAgencyId'])
    },
    methods: {
        hideMessage() {
            this.message = false;
        },
        get(){
            console.log()
        }
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
    min-height: 30rem;
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