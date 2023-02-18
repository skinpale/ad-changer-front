<template>
    <v-form
        ref="form"
        v-model="form" 
        @submit.prevent="sign">
        <v-card>
            <!-- TODO: create header background for card -->
            <v-card-title>
                <span class="text-h6">Login to your account</span>
                <v-spacer></v-spacer>
            </v-card-title> 

            <v-card-text>
                <v-container>
                    <v-row>                     
                        <!-- Email -->
                        <v-col cols="12">
                            <v-text-field 
                                label="Email*" 
                                placeholder="johndoe@gmail.com"
                                prepend-inner-icon="mdi-email-outline" 
                                hint="Enter your email address"
                                clearable 
                                required
                                :readonly="loading"
                                :rules="[rules.required, rules.email]"
                                :error-messages="emailErrors"
                                @input="clearError"
                                v-model="email">
                            </v-text-field>
                        </v-col>

                        <!-- Password -->
                        <v-col cols="12">
                            <v-text-field  
                                label="Password*"
                                prepend-inner-icon="mdi-lock"
                                required 
                                v-model="password"
                                :readonly="loading"
                                :rules="[
                                    rules.required, 
                                    rules.maxCounter, 
                                    rules.minCounter]"
                                :error-messages="passwordErrors"
                                :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @input="clearError"
                                @click:append="show = !show">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <!-- Forgot Password Link -->
                    <v-btn 
                        class="pa-0 text-none" 
                        small
                        plain>
                            Forgot your password?
                    </v-btn>
                </v-container>
            </v-card-text>

            <v-card-actions class="pa-7">
                <v-spacer></v-spacer>
                <!-- Submit button -->
                <v-btn 
                    class="success"
                    block
                    :disabled="!form"
                    :loading="loading"
                    @click="submit">                        
                    <span class="pa-4">Sign</span>
                    <v-icon class="ma-0" right>mdi-chevron-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import axios from '@/config/axios';
import { mapMutations } from 'vuex';

export default {
    data: () => ({
        dialog: false,
        show: false,
        form: false,
        loading: false,
        email: '',
        password: '',
        emailErrors: [],
        passwordErrors: [],
        rules:{
            required: value => !!value || 'Required.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            maxCounter: value => value.length <= 40 || 'Max 40 characters',
            minCounter: value => value.length >=3 || 'Min 3 characters',
        }
    }),
    methods: {
        ...mapMutations(['login']),
        closeDialog() {
            this.$emit("close");
        },
        openRegisterDialog() {
            this.$emit("toRegister");
        },
        clearError(){
            this.emailErrors = [],
            this.passwordErrors = []
        },
        async submit(){
            await axios({
                method: 'get',
                url: 'user/login',
                params: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                this.login(response.data)
                this.closeDialog()
            })
            .catch(error => {
                if (error.response.status === 401) {
                    if (error.response.data === "User not found") {
                        this.emailErrors.push("This email is not registered");
                    } else if (error.response.data === "Incorrect password") {
                        this.passwordErrors.push("Incorrect password");
                    }
                }
            });
        }
        
    },
}
</script>