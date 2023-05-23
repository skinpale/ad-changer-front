<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <h1 class="ml-5">
                Offers for advertisement contracts
            </h1>
            <v-divider></v-divider>
        </v-container>

        <v-row class="ma-0">
            <v-col v-if="offerCount === 0">
                <v-card>
                    <v-card-text>
                        No offers
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="offer in offers" :key="offer.id" cols="12">
                <v-card class="pa-0">
                    <v-card-title class="ml-2">
                        Offer for order №{{ offer.order.id }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="mb-1 ml-1">
                            <h3>
                                Order data:
                            </h3>
                        </div>
                        <v-row>
                            <v-col cols="3">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Auditory:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.order.auditory }}
                                        <v-icon x-small>mdi-account</v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Description:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.order.description }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div class="mb-1 ml-1 mt-5">
                            <h3>
                                Agency data:
                            </h3>
                        </div>
                        <v-row>
                            <v-col cols="3">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Agency name:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.agency.name }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="3">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Agency phone:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.agency.phone }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Agency address:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.agency.address }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div class="mb-1 ml-1 mt-5">
                            <h3>
                                Tariff data:
                            </h3>
                        </div>
                        <v-row>
                            <v-col cols="6">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Payment frequency:
                                    </v-card-title>
                                    <v-card-text v-if="offer.frequency.name === 'per_month'">
                                        Each month
                                    </v-card-text>
                                    <v-card-text v-if="offer.frequency.name === 'per_week'">
                                        Each week
                                    </v-card-text>
                                    <v-card-text v-if="offer.frequency.name === 'per_quarter'">
                                        Each quarter
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Advertisement payment model:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.tactics.name }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div class="mb-1 ml-1 mt-5">
                            <h3>
                                Payment calculations:
                            </h3>
                        </div>
                        <v-row>
                            <v-col cols="4">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Total cost:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.payPlanDTO.total }}
                                        <v-icon x-small>mdi-currency-usd</v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card outlined elevation="0">
                                    <v-card-title v-if="offer.frequency.name === 'per_month'">
                                        Amount of months:
                                    </v-card-title>
                                    <v-card-title v-if="offer.frequency.name === 'per_week'">
                                        Amount of weeks:
                                    </v-card-title>
                                    <v-card-title v-if="offer.frequency.name === 'per_quarter'">
                                        Amount of quarters:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.payPlanDTO.amount }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card outlined elevation="0">
                                    <v-card-title>
                                        Cost per each month:
                                    </v-card-title>
                                    <v-card-text>
                                        {{ offer.payPlanDTO.per }}
                                        <v-icon x-small>mdi-currency-usd</v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="px-5 pb-4">
                        <v-row>
                            <v-col>
                                <v-btn block class="success" elevation="0" @click="confirmOffer(offer.order.id, offer.payPlanDTO.per)">
                                    accept
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
        <v-snackbar text v-model="startedCampaign" :timeout="2000" color="green" right>
            Campaign started!
            <template v-slot:action="{ attrs }">
                <v-btn small color="green" text v-bind="attrs" @click="startedCampaign = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>

        <v-snackbar text v-model="noMoney" :timeout="2000" color="red" right>
            You have not enough money to start
            <template v-slot:action="{ attrs }">
                <v-btn small color="red" text v-bind="attrs" @click="noMoney = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>
import axios from '@/config/axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            offers: [],
            startedCampaign: false,
            noMoney: false
        };
    },
    methods: {
        ...mapGetters(['getClientId']),
        getOffers() {
            axios({
                method: 'get',
                url: `/contract/${this.getClientId()}`
            })
                .then(response => {
                    this.offers = response.data
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        confirmOffer(id1, per1) {
            axios({
                method: 'get',
                url: `/contract/start/campaign`,
                params:{
                    order_id: id1,
                    per: per1
                }
            })
                .then(response => {
                    this.offers = response.data
                    this.startedCampaign = true
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                    this.noMoney = true
                });
        }
    },
    computed: {
        offerCount() {
            return this.offers.length
        }
    },
    created() {
        this.getOffers();
    }
}
</script>