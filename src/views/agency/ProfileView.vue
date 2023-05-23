<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h1 class="ml-5">
                        This is your agency profile
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
                <v-col cols="4">
                    <v-card>
                        <v-card-title>
                            Agency name:
                        </v-card-title>
                        <v-card-text>
                            {{ name }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>
                            Phone:
                        </v-card-title>
                        <v-card-text>
                            +{{ phone }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card height="100">
                        <v-card-title>
                            Certification status
                        </v-card-title>
                        <v-card-text>
                            <div v-if="isCertified" color="green">
                                <v-icon color="green">mdi-check</v-icon>
                                certified
                            </div>
                            <div v-else color="red">
                                no certified
                                <v-icon color="red" large class="ma-0 pa-0">mdi-alpha-x</v-icon>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            Description:
                        </v-card-title>
                        <v-card-text>
                            {{ description }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card>
                        <v-card-title>
                            Address:
                        </v-card-title>
                        <v-card-text>
                            {{ address }}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>
                            Account created at:
                        </v-card-title>
                        <v-card-text>
                            {{ createdAt }}
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
import moment from 'moment';

export default {
    data() {
        return {
            id: null,
            name: '',
            description: '',
            phone: '',
            address: '',
            isCertified: false,
            createdAt: null
        }
    },
    methods: {
        ...mapGetters(['getAgencyId']),
        getAgencyData() {
            axios({
                method: 'get',
                url: `/agencies/${this.getAgencyId()}`
            })
                .then(response => {
                    this.id = response.data.agency.id
                    this.name = response.data.agency.name
                    this.description = response.data.agency.description
                    this.phone = response.data.agency.phone
                    this.address = response.data.agency.address
                    this.isCertified = response.data.agency.isCertified
                    this.createdAt = this.transformTimestamp(response.data.createdAt)
                })
        },
        transformTimestamp(timestamp) {
            return moment(timestamp).format('DD/MM/YYYY');
        }
    },
    created() {
        this.getAgencyData()
    }
}
</script>