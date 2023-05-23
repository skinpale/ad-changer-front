<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h1 class="ml-5">
                        This is your client profile
                    </h1>
                </v-col>
                <v-spacer></v-spacer>
                <h3 class="mr-4 mt-6">id: {{ id }}</h3>
            </v-row>
            <v-divider class="mb-10"></v-divider>
            <h3 class="ml-5">
                Your data:
            </h3>
            <v-divider></v-divider>
            <v-row class="ma-0">
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            First name:
                        </v-card-title>
                        <v-card-text>
                            {{ first_name }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Last name:
                        </v-card-title>
                        <v-card-text>
                            {{ last_name }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            Phone:
                        </v-card-title>
                        <v-card-text>
                            +{{ phone }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
import axios from '@/config/axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            id: null,
            first_name: '',
            last_name: '',
            phone: ''
        }
    },
    methods: {
        ...mapGetters(['getClientId']),
        getClientData() {
            axios({
                method: 'get',
                url: `/clients/${this.getClientId()}`
            })
                .then(response => {
                    this.id = response.data.id
                    this.first_name = response.data.first_name
                    this.last_name = response.data.last_name
                    this.phone = response.data.phone
                })
        }
    },
    created() {
        this.getClientData()
    }
}
</script>