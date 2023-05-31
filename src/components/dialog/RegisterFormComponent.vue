<!-- TODO: enable v-window transitions  -->
<template>
    <v-form ref="form" v-model="form" @submit.prevent="submit">
        <v-card>
            <v-card-title>
                <span class="text-h6">Create new account</span>
                <v-spacer></v-spacer>

                <!-- Open Login dialog -->
                <!-- <v-btn 
                    class="ma=0 pa=0" 
                    small     
                    outlined 
                    @click="openLoginDialog">
                    Already have an account?
                </v-btn> -->
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- Email -->
                        <v-col cols="12">
                            <v-text-field label="Email*" placeholder="johndoe@gmail.com"
                                prepend-inner-icon="mdi-email-outline" hint="Enter your email address" clearable required
                                :readonly="loading" :rules="[rules.required, rules.email]" :error-messages="emailErrors"
                                @input="clearError" v-model="email">
                            </v-text-field>
                        </v-col>

                        <!-- Password -->
                        <v-col cols="12">
                            <v-text-field label="Password*" prepend-inner-icon="mdi-lock" required v-model="password"
                                :readonly="loading" :rules="[
                                    rules.required,
                                    rules.maxCounter,
                                    rules.minCounter]" :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show">
                            </v-text-field>
                        </v-col>

                        <!-- Repeat Password -->
                        <v-col cols="12">
                            <v-text-field label="Repeat Password*" prepend-inner-icon="mdi-lock" required
                                v-model="repeatPassword" :readonly="loading" :rules="[
                                    rules.required,
                                    rules.maxCounter,
                                    rules.minCounter,
                                    value => value === this.password || 'Passwords need to be similar']"
                                :type="show ? 'text' : 'password'">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Choose Role -->
                    <v-radio-group row :rules="[rules.required]" v-model="role">
                        <v-radio label="I am client" value="CLIENT" class="pl-12" />
                        <v-spacer />
                        <v-radio label="I am agency" value="AGENCY" class="pr-12" />
                    </v-radio-group>

                    <v-divider class="mb-5"></v-divider>

                    
                    <v-container v-if="role==='CLIENT'">
                        <v-text-field v-model="client_first_name" outlined dense label="first name"></v-text-field>
                        <v-text-field v-model="client_last_name" label="last name" outlined dense></v-text-field>
                        <v-text-field v-model="client_phone" label="phone" outlined dense></v-text-field>
                    </v-container>

                    <v-container v-if="role==='AGENCY'">
                        <v-text-field v-model="agency_name"  label="agency name" outlined dense></v-text-field>
                        <v-textarea v-model="agency_description"  label="description" outlined dense></v-textarea>
                        <v-text-field v-model="agency_phone"  label="phone" outlined dense></v-text-field>
                        <v-text-field v-model="agency_address"  label="address" outlined dense></v-text-field>
                    </v-container>

                    <v-divider></v-divider>

                    <!-- License Agreement -->
                    <v-checkbox label="I agree to site terms and conditions*" color="secondary" v-model="terms"
                        :readonly="loading" :rules="[value => value == 1 || 'Please accept company rules']">
                    </v-checkbox>

                    <!-- Hint -->
                    <small>*indicates required field</small>
                </v-container>
            </v-card-text>

            <v-card-actions class="pa-7">
                <v-spacer></v-spacer>
                <!-- Submit button -->
                <v-btn class="success" block :disabled="!form" :loading="loading" @click="submit">
                    <span class="pa-4">Submit</span>
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
        client_first_name: '',
        client_last_name: '',
        client_phone: '',

        agency_name: '',
        agency_description:'',
        agency_phone: '',
        agency_address: '',

        dialog: false,
        show: false,
        terms: false,
        form: false,
        loading: false,
        email: '',
        password: '',
        repeatPassword: '',
        role: '',
        emailErrors: [],
        rules: {
            required: value => !!value || 'Required.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            maxCounter: value => value.length <= 40 || 'Max 40 characters',
            minCounter: value => value.length >= 3 || 'Min 3 characters'
        }
    }),
    methods: {
        ...mapMutations(['login']),
        closeDialog() {
            this.$emit("close");
        },
        openLoginDialog() {
            this.$emit("toLogin");
        },
        clearError() {
            this.emailErrors = []
        },
        submit() {
            axios({
                method: 'post',
                url: 'user/register',
                data: {
                    email: this.email,
                    password: this.password,
                    role: this.role
                }
            })
                .then(response => {
                    this.login(response.data)
                    this.closeDialog()
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