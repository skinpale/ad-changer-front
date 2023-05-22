<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="px-0">
                <v-card class="transparent" elevation="0">
                    <v-app-bar class="transparent" height="50" elevation="0">
                        <!-- TODO: add menu togglere -->
                        <!-- Logo + Title -->
                        <div class="logo" @click="goHome">
                            <v-icon color="#e24bdd" size="35"
                                style="margin-top: -15px; margin-right: -8px;">mdi-terraform</v-icon>
                            <span class="gradient-text font-weight-bold text-h5">
                                adverts
                            </span>
                            <div class="gradient-text caption pl-2" style="margin-top: -7%;">
                                Exchange Your Ads.
                            </div>
                        </div>
                        <v-spacer></v-spacer>


                        <!-- Search bar -->
                        <!-- <v-text-field outlined dense hide-details label="Search"></v-text-field>
                        <v-spacer></v-spacer> -->

                        <!-- Theme toggler -->
                        <v-btn icon rouned small class="rounded-pill" @click="toggleTheme">
                            <v-icon>
                                {{ darkTheme ? 'mdi-brightness-4' : 'mdi-brightness-7' }}
                            </v-icon>
                        </v-btn>

                        <!-- User is authorized  -->
                        <div v-if="isAuthenticated">
                            <!-- Logout -->
                            <v-btn text @click="onLogout" class="text-none">
                                <!-- <v-icon class="pr-1" small>mdi-logout</v-icon> -->
                                Logout
                            </v-btn>
                        </div>

                        <!-- User is NOT authorized -->
                        <div v-else>
                            <!-- Login Dialog Form -->
                            <v-dialog v-model="loginDialog" scrollable>
                                <template v-slot:activator="{ on, props }">
                                    <v-btn elevation="0" v-on="on" v-bind="props" class="text-none mx-2">
                                        Sign in
                                    </v-btn>
                                </template>
                                <LoginFormComponent @close="loginDialog = false"
                                    @toRegister="loginDialog = false, registerDialog = true" />
                            </v-dialog>

                            <!-- Register Dialog Form -->
                            <v-dialog v-model="registerDialog" scrollable>
                                <template v-slot:activator="{ on, props }">
                                    <v-btn elevation="0" v-on="on" v-bind="props" class="text-none primary">
                                        Sign up
                                    </v-btn>
                                </template>
                                <RegisterFormComponent @close="registerDialog = false"
                                    @toLogin="loginDialog = true, registerDialog = false" />
                            </v-dialog>
                        </div>
                    </v-app-bar>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginFormComponent from '../dialog/LoginFormComponent.vue';
import RegisterFormComponent from '../dialog/RegisterFormComponent.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: { LoginFormComponent, RegisterFormComponent },
    data: () => ({
        props: '',
        darkTheme: null,
        loginDialog: false,
        registerDialog: false
    }),

    //FIXME: rework auth checking
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    created() {
        this.checkTheme()
    },
    methods: {
        ...mapActions(['logout']),
        goHome() {
            if (this.$route.path !== '/') this.$router.push('/')
        },
        onLogout() {
            this.logout(this.$route.path)
        },
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
            this.$vuetify.theme.dark = this.darkTheme;
        },
        checkTheme() {
            this.darkTheme = this.$vuetify.theme.dark
        }
    }
}
</script>

<style>
.logo {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.v-dialog {
    max-width: 30%;
}

@media (max-width: 959px) {
    .v-dialog {
        max-width: 100%;
    }
}

.gradient-text {
    background: linear-gradient(to right, #e24bdd, #6230f6);
    background-clip: text;
    color: transparent;
}

.gradient-text:hover {
    size: 10px;
}
</style>