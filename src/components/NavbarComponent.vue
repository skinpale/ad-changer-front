<template>
    <div>
        <v-app-bar 
            class="transparent"
            elevation="0"
            dark 
            dense
            absolute
            app>
            <!-- Logo + Title -->
            <v-toolbar-title>
                <v-btn
                    class="mx-5 text-none text-h5 font-weight-bold" 
                    text
                    href="/">
                    <v-icon>mdi-vuetify</v-icon>
                    <span class="gradient-underline">Advertisement Exchanger</span>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- User is authorized  -->
            <div v-if="isAuthenticated">
            
                <!-- TODO: replace menu buttons -->
                <!-- Profile button -->
                <!-- <router-link style="text-decoration: none;" to="/profile">
                    <v-btn small text>
                        <v-icon class="pr-1" small>mdi-account</v-icon>profile
                    </v-btn>
                </router-link> -->

                <!-- Orders button -->
                <!--<router-link style="text-decoration: none;" to="/orders">
                    <v-btn small text>
                        <v-icon class="pr-1" small>mdi-list-box</v-icon>orders
                    </v-btn>
                </router-link> -->

                <!-- TODO: add pays section -->
                <!-- Pays button -->
                <!-- <router-link style="text-decoration: none;" to="/pays">
                    <v-btn small text>
                        <v-icon class="pr-1" small>mdi-currency-usd</v-icon>pays</v-btn>
                </router-link> -->

                <!-- Logout -->
                <v-btn text @click="onLogout" class="text-none">
                    <!-- <v-icon class="pr-1" small>mdi-logout</v-icon> -->
                    Logout
                </v-btn>
            </div>

            <!-- User is NOT authorized -->
            <div v-else>
                <!-- Login Dialog Form -->
                <v-dialog dark v-model="loginDialog" scrollable>
                    <template v-slot:activator="{ on, props }">
                        <v-btn text v-on="on" v-bind="props" class="text-none">
                            <!-- <v-icon class="pr-1" small>mdi-login</v-icon> -->
                            Sign in
                        </v-btn>
                    </template>
                    <LoginFormComponent 
                        @close="
                            loginDialog = false" 
                        @toRegister="
                            loginDialog = false, 
                            registerDialog = true" />
                </v-dialog>

                <!-- Divider -->
                <span class="mx-3">|</span>
                
                <!-- Register Dialog Form -->
                <v-dialog dark v-model="registerDialog" scrollable>
                    <template v-slot:activator="{ on, props }">
                        <v-btn text v-on="on" v-bind="props" class="text-none">
                            <!-- <v-icon class="pr-1" small>mdi-login</v-icon> -->
                            Sign up
                        </v-btn>
                    </template>
                    <RegisterFormComponent 
                        @close="
                            registerDialog = false" 
                        @toLogin="
                            loginDialog = true, 
                            registerDialog = false" />
                </v-dialog>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import LoginFormComponent from './LoginFormComponent.vue';
import RegisterFormComponent from './RegisterFormComponent.vue';
import { mapGetters,mapActions } from 'vuex';

export default {
    components: { LoginFormComponent, RegisterFormComponent },
    data: () => ({
        props: '',
        loginDialog: false,
        registerDialog: false
    }),

    //FIXME: rework auth checking
    computed:{
        ...mapGetters(['isAuthenticated'])
    },
    methods:{
        ...mapActions(['logout']),
        onLogout(){
            this.logout(this.$route.path)
        }
    }
}
</script>

<style>

.v-dialog {
    max-width: 30%;
}

@media (max-width: 959px) {
    .v-dialog {
        max-width: 100%;
    }
}

.gradient-underline::before {
    background: linear-gradient(to right, #e24bdd, #6235f6);
    content: "";

    left: 0;
    right: 0;
    height: 3px;
    bottom: -3px;
    
    position: absolute;
    transform: scaleX(1);
    transform-origin: top left;
    transition: transform 0.5s ease;
}

.gradient-underline:hover::before {
    transform: scaleX(0);
    transform-origin: top left;
}
</style>