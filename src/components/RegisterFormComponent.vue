<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Sign Up</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password*" type="password" required></v-text-field>
                    </v-col>
                </v-row>
                <div>
                    <small>*indicates required field</small>
                </div>
                <div>
                    <v-btn dark small class="ma=0 pa=0" @click="openLoginDialog">
                        Already have an account?
                    </v-btn>
                </div>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="closeDialog">
                <span class="pa-4">Close</span>
            </v-btn>
            <v-btn @click="closeDialog">
                <span class="pa-4">Submit</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
    methods: {
        closeDialog() {
            this.$emit("close");
        },
        openLoginDialog(){
            this.$emit("toLogin");
        }      
    },
}
</script>