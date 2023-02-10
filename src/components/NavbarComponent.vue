<template>
    <nav>
        <v-toolbar elevation="1" dark color="#181818">
            <v-toolbar-title>
                <v-btn text prepend-icon="mdi-vuetify" class="text-capitalize font-weight-bold text-h5 mx-5"
                    size="large" href="/">
                    <span class="gradient-underline">Advertisement Exchanger</span>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div>
                <router-link style="text-decoration: none;" to="/profile">
                    <v-btn small text>
                        <v-icon class="pr-1" small>mdi-account</v-icon>profile
                    </v-btn>
                </router-link>

                <router-link style="text-decoration: none;" to="/orders">
                    <v-btn small text>
                        <v-icon class="pr-1" small>mdi-list-box</v-icon>orders
                    </v-btn>
                </router-link>

                <router-link style="text-decoration: none;" to="/pays">
                    <v-btn small text>
                        <v-icon class="pr-1" small>
                            mdi-currency-usd
                        </v-icon>pays</v-btn>

                </router-link>
            </div>

            <span class="mx-3">|</span>

            <!-- Login Dialog Form -->
            <v-dialog v-model="loginDialog" persistent max-width="30%">
                <template v-slot:activator="{ on, props }">
                    <v-btn small text v-on="on" v-bind="props">
                        <v-icon class="pr-1" small>
                            mdi-login
                        </v-icon>
                        login
                    </v-btn>
                </template>
                <LoginFormComponent @close="loginDialog = false" @toRegister="openRegisterDialog" />
            </v-dialog>

            <!-- Register Dialog Form -->
            <v-dialog v-model="registerDialog" persistent max-width="30%">
                <RegisterFormComponent @close="registerDialog = false" @toLogin="openLoginDialog" />
            </v-dialog>
        </v-toolbar>
    </nav>
</template>

<script>
import LoginFormComponent from './LoginFormComponent.vue';
import RegisterFormComponent from './RegisterFormComponent.vue';

export default {
    data() {
        return {
            props: '',
            loginDialog: false,
            registerDialog: false
        }
    },
    components: { LoginFormComponent, RegisterFormComponent },
    methods: {
        openLoginDialog() {
            this.registerDialog = false;
            this.loginDialog = true;
        },
        openRegisterDialog() {
            this.loginDialog = false;
            this.registerDialog = true;
        }
    }
}
</script>

<style>
.gradient-underline {
    position: relative;
}

.gradient-underline::before {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #e24bdd, #6235f6);
    transform: scaleX(1);
    transform-origin: top left;
    transition: transform 0.3s ease;
}

.gradient-underline:hover::before {
    transform: scaleX(0);
    transform-origin: top left;
}
</style>