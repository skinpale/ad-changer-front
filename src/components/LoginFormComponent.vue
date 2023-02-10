<template>
    <v-form
        ref="form"
        v-model="form" 
        @submit.prevent="sign">
        <v-card>
            <v-card-title>
                <span class="text-h5">Sign In</span>
                <v-spacer></v-spacer>

                <!-- Open Register dialog -->
                <v-btn 
                    class="ma=0 pa=0" 
                    small
                    outlined  
                    @click="openRegisterDialog">
                    Don't have an account?
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
                                hint="Enter your email address"
                                clearable 
                                required
                                :readonly="loading"
                                :rules="[rules.required, rules.email]"
                                v-model="email">
                            </v-text-field>
                        </v-col>

                        <!-- Password -->
                        <v-col cols="12">
                            <v-text-field  
                                label="Password*"
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

            <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Submit button -->
                <v-btn 
                    class="success"
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
export default {
    data: () => ({
        dialog: false,
        show: false,
        form: false,
        loading: false,
        email: '',
        password: '',
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
        openRegisterDialog() {
            this.$emit("toRegister");
        },
        validate(){
            this.$refs.form.validate()
        },
        submit(){
            // validation condition
            // if(!this.form) return

            // logic for saving user ->

            // data packing to json
            // const json = JSON.stringify({
            //     email: this.email,
            //     password: this.password
            // })

            // loader
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
        
    },
}
</script>