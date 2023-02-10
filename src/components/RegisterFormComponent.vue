<template>
    <v-form 
        ref="form"
        v-model="form" 
        @submit.prevent="submit">
        <v-card>
            <v-card-title>
                <span class="text-h5">Sign Up</span>
                <v-spacer></v-spacer>

                <!-- Open Login dialog -->
                <v-btn 
                    class="ma=0 pa=0" 
                    small     
                    outlined 
                    @click="openLoginDialog">
                    Already have an account?
                </v-btn>
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
                                :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show">
                            </v-text-field>
                        </v-col>

                        <!-- Repeat Password -->
                        <v-col cols="12">
                            <v-text-field  
                                label="Repeat Password*" 
                                prepend-inner-icon="mdi-lock"
                                required
                                v-model="repeatPassword"
                                :readonly="loading"
                                :rules="[
                                    rules.required, 
                                    rules.maxCounter, 
                                    rules.minCounter,
                                    value => value === this.password || 'Passwords need to be similar']"
                                :type="show ? 'text' : 'password'" >
                            </v-text-field>
                        </v-col>                    
                    </v-row>
                
                    <!-- License Agreement -->
                    <v-checkbox 
                        label="I agree to site terms and conditions*"
                        color="secondary"
                        v-model="terms"
                        :readonly="loading"
                        :rules="[value => value == 1 || 'Please accept company rules']">
                    </v-checkbox>

                    <!-- Hint -->
                    <small>*indicates required field</small>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Submit button -->
                <v-btn 
                    class="success"
                    :disabled="!form"
                    :loading="loading"
                    @click="submit">                        
                    <span class="pa-4">Submit</span>
                    <v-icon class="ma-0" right>mdi-chevron-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import axios from '@/config/axios';

export default {
    data: () => ({
        dialog: false,
        show: false,
        terms: false,
        form: false,
        loading: false,
        email: '',
        password: '',
        repeatPassword: '',
        emailErrors: [],
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
        closeDialog() {
            this.$emit("close");
        },
        openLoginDialog(){
            this.$emit("toLogin");
        },
        clearError(){
            this.emailErrors = []
        },
        async submit(){
            await axios({
                method: 'post',
                url: 'user/register',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)

                console.log(response)
            })
            .catch(error => {
                if (error.response.status === 409) {
                    this.emailErrors.push('This email is already in use')
                }
            });
        }
    }
}
</script>