<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <h1 class="ml-5">
                It's your payment tariffs
            </h1>
            <v-divider class="mb-10"></v-divider>
            <v-btn v-if="!this.showform" block class="success" @click="openForm" elevation="0">
                create
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-card v-if="this.showform">
                <v-card-title class="pt-4 pb-0 mb-0">
                    <h3>Create new tariff</h3>
                </v-card-title>
                <v-divider class="mt-2"></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field v-model="name" outlined dense label="Name"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="cost" outlined dense label="Cost"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select v-model="tactics" :items="allTactics" outlined dense label="Tactics" item-text="name"
                                item-value="id"></v-select>
                        </v-col>
                        <v-col>
                            <v-select v-model="frequency" :items="allFrequencies" outlined dense label="Frequencies"
                                item-text="name" item-value="id"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="px-4 pb-10">
                    <v-row>
                        <v-col cols=2>
                            <v-btn block elevation="0" @click="showform = false">
                                <v-icon>mdi-arrow-left-bold</v-icon>back
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block class="success" elevation="0" @click="createTariff()">
                                create
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-container>

        <v-row class="ma-0">
            <v-col v-if="tariffCount === 0 && !this.showform">
                <v-card>
                    <v-card-text>
                        No tariffs
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="tariff, index in tariffs" :key="tariff.id" cols="6">
                <v-card class="pa-0">
                    <v-overlay :z-index="1" :value="overlay">
                        <v-card>
                            <v-card-title>
                                Do you want to delete this tariff?
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-btn class="white--text" large @click="overlay = false" elevation="0">
                                            cancel
                                        </v-btn>
                                    </v-col>
                                    <v-spacer />
                                    <v-col>
                                        <v-btn class="white--text" color="red" large @click="deleteTariff(currentTariffId)"
                                            elevation="0">
                                            delete
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-overlay>
                    <v-card-title>
                        <v-row>
                            <v-col class="pa-0">
                                <h4 class="ml-2">
                                    #{{ index + 1 }} - {{ tariff.tariff.name }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container class="ma-0 pa-0">
                            Frequency of payments:
                            <span v-if="tariff.frequency.name === 'per_month'">1/month</span>
                            <span v-if="tariff.frequency.name === 'per_quarter'">1/quarter</span>
                            <span v-if="tariff.frequency.name === 'per_week'">1/week</span>
                        </v-container>
                        <v-container class="ma-0 pa-0">
                            Advertisement payment tactics: {{ tariff.tactics.name }}
                        </v-container>
                        <v-container class="ma-0 pa-0">
                            Cost: {{ tariff.tariff.cost }} <v-icon small class="pa-0 ma-0">mdi-currency-usd</v-icon>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" elevation="0" small color="red" @click="showConfirm(tariff.tariff.id)">
                            delete
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar text v-model="created" :timeout="2000" color="green" right>
            Successful created!
            <template v-slot:action="{ attrs }">
                <v-btn small color="green" text v-bind="attrs" @click="created = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>


        <v-snackbar text v-model="deleted" :timeout="2000" color="green" right>
            Successful deleted!
            <template v-slot:action="{ attrs }">
                <v-btn small color="green" text v-bind="attrs" @click="deleted = false, currentOrderId = order.id">
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
            tariffs: [],
            overlay: false,
            currentTariffId: null,
            deleted: false,
            showform: false,
            allTactics: [],
            allFrequencies: [],
            tactics: null,
            frequency: null,
            cost: null,
            name: '',
            created: false
        };
    },
    methods: {
        ...mapGetters(['getAgencyId']),
        getAllTactics() {
            axios({
                method: 'get',
                url: 'tactics'
            })
                .then(response => {
                    this.allTactics = response.data;
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        getAllFrequencies() {
            axios({
                method: 'get',
                url: 'frequency'
            })
                .then(response => {
                    this.allFrequencies = response.data;
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        getTariffs() {
            axios({
                method: 'get',
                url: `tariff/tariffs/${this.getAgencyId()}`
            })
                .then(response => {
                    this.tariffs = response.data;
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        deleteTariff(id) {
            axios({
                method: 'delete',
                url: `tariff/${id}`
            })
                .then(response => {
                    console.log(response)
                    this.tariffs = []
                    this.getTariffs()
                    this.deleted = true
                    this.overlay = false
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        createTariff() {
            axios({
                method: 'post',
                url: `tariff`,
                data: {
                    name: this.name,
                    cost: this.cost,
                    frequencyId: this.frequency,
                    tacticsId: this.tactics,
                    agencyId: this.getAgencyId()
                }
            })
                .then(response => {
                    console.log(response)
                    this.tariffs = []
                    this.getTariffs()
                    this.created = true
                    this.showform = false
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        },
        openForm() {
            this.showform = !this.showform
        },
        showConfirm(id) {
            this.currentTariffId = id
            this.overlay = true
        }
    },
    computed: {
        tariffCount() {
            return this.tariffs.length
        }
    },
    created() {
        this.getTariffs(),
            this.getAllTactics(),
            this.getAllFrequencies()
    }
}
</script>