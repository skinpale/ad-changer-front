<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container v-if="!openedReports" class="pa-0 ma-0">
            <v-container>
                <v-row>
                    <v-col cols="7">
                        <h1 class="ml-5">
                            Sent offers ({{ sentOffersAmount }})
                        </h1>
                    </v-col>
                    <v-spacer>

                    </v-spacer>
                    <v-col>
                        <v-btn class="mt-2" outlined dense @click="showsentoffers = !showsentoffers">
                            show offers
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-container>

            <v-row class="ma-0" v-if="showsentoffers">
                <v-col v-if="sentOffersAmount === 0">
                    <v-card>
                        <v-card-text>
                            No active offers
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col v-for="offer, index in sentOffers" :key="offer.id" cols="12">
                    <v-card class="pa-0">
                        <v-card-title class="ml-2">
                            #{{ index + 1 }} | Offer for order №{{ offer.order.id }}
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
                    </v-card>
                </v-col>
            </v-row>

            <v-container>
                <v-row>
                    <v-col cols="7">
                        <h1 class="ml-5">
                            Active orders ({{ activeOffersAmount }})
                        </h1>
                    </v-col>
                    <v-spacer>

                    </v-spacer>
                    <v-col>
                        <v-btn class="mt-2" outlined dense @click="showactiveoffers = !showactiveoffers">
                            show orders
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-container>

            <v-row class="ma-0" v-if="showactiveoffers">
                <v-col v-if="activeOffersAmount === 0">
                    <v-card>
                        <v-card-text>
                            No active orders
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col v-for="order, index in activeOrders" :key="order.id" cols="12">
                    <v-card class="pa-0">
                        <v-card-title class="ml-2">
                            #{{ index + 1 }} | Offer for order №{{ order.order.id }}
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
                                            {{ order.order.auditory }}
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
                                            {{ order.order.description }}
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
                                        <v-card-text v-if="order.frequency.name === 'per_month'">
                                            Each month
                                        </v-card-text>
                                        <v-card-text v-if="order.frequency.name === 'per_week'">
                                            Each week
                                        </v-card-text>
                                        <v-card-text v-if="order.frequency.name === 'per_quarter'">
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
                                            {{ order.tactics.name }}
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
                                            {{ order.payPlanDTO.total }}
                                            <v-icon x-small>mdi-currency-usd</v-icon>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card outlined elevation="0">
                                        <v-card-title v-if="order.frequency.name === 'per_month'">
                                            Amount of months:
                                        </v-card-title>
                                        <v-card-title v-if="order.frequency.name === 'per_week'">
                                            Amount of weeks:
                                        </v-card-title>
                                        <v-card-title v-if="order.frequency.name === 'per_quarter'">
                                            Amount of quarters:
                                        </v-card-title>
                                        <v-card-text>
                                            {{ order.payPlanDTO.amount }}
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card outlined elevation="0">
                                        <v-card-title>
                                            Cost per each month:
                                        </v-card-title>
                                        <v-card-text>
                                            {{ order.payPlanDTO.per }}
                                            <v-icon x-small>mdi-currency-usd</v-icon>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn block class="ma-2" elevation="0" color="success" @click="openReports(order)">
                                to reports
                                <v-icon small>mdi-file-chart</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-else class="pa-0 ma-0">
            <v-container fluid clas="pa-0 ma-0">
                <v-card class="pa-0 ma-0">
                    <v-card-title class="ml-5">
                        Create new report
                        <v-spacer></v-spacer>
                        <v-btn elevation="0" @click="openedReports = false">back</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="auditory" class="px-4" outlined dense label="Auditory"></v-text-field>
                        <span class="ml-5">Current date: {{ currentDate }}</span>
                    </v-card-text>
                    <v-card-actions class="ma-5">
                        <v-btn block class="success" elevation="0" @click="createReport()">
                            create
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="my-4">
                    <v-card-title class="ml-5">See reports by dates:
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text clas="pa-0 ma-0">
                        <v-sparkline :fill="false" :gradient="gradient" :line-width="5" :padding="10" :smooth="4"
                            :value="value" auto-draw stroke-linecap="round" class="pa-3">
                            <!-- <template v-slot:label="item">
                                {{ item.value }}p.
                            </template> -->
                        </v-sparkline>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col v-if="datesLength == 2" cols="12" @click="getReports()">
                                <v-btn block>show chart</v-btn>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-date-picker v-model="dates" color="green" range :min="minDate" :max="maxDate"></v-date-picker>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field dense v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import axios from '@/config/axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            sentOffers: [],
            activeOrders: [],
            showsentoffers: false,
            showactiveoffers: true,

            openedReports: false,

            currentOrderId: null,
            currentContractId: null,


            gradient: ['#00c6ff', '#F0F', '#FF0'],
            value: [],

            dates: [],
            minDate: '',
            maxDate: '',

            auditory: '',

            currentDate: null
        };
    },
    methods: {
        ...mapGetters(['getAgencyId']),
        getSentOffers() {
            axios({
                method: 'get',
                url: `contract/sentOffers/${this.getAgencyId()}`
            })
                .then(response => {
                    this.sentOffers = response.data
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        getActiveOrders() {
            axios({
                method: 'get',
                url: `contract/activeOrders/${this.getAgencyId()}`
            })
                .then(response => {
                    this.activeOrders = response.data
                    console.log(this.activeOrders)
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        setCurrentDate() {
            const date = new Date();
            this.currentDate = date.toDateString(); // Format the date as a string
        },
        openReports(offer) {
            this.currentOrderId = offer.order.id
            this.currentContractId = offer.contractId
            this.openedReports = true
            this.minDate = offer.order.from_date
            this.maxDate = offer.order.to_date
        },
        createReport() {
            axios({
                method: 'post',
                url: 'report',
                params: {
                    auditory: this.auditory,
                    contractId: this.currentContractId,
                }
            })
                .then(response => {
                    this.activeOrders = response.data
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        getReports() {
            this. value = []
            axios({
                method: 'get',
                url: 'report',
                params: {
                    from_date: this.dates[0],
                    to_date: this.dates[1],
                    contractId: this.currentContractId,
                }
            })
                .then(response => {
                    this.value = response.data.map(item => item.auditory);
                    console.log(this.value)
                })
                .catch(error => {
                    console.error('Error fetching reports:', error);
                });
        }
    },
    computed: {
        sentOffersAmount() {
            return this.sentOffers.length
        },
        activeOffersAmount() {
            return this.activeOrders.length
        },
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
        datesLength() {
            return this.dates.length
        }
    },
    created() {
        this.getSentOffers();
        this.getActiveOrders();
        this.setCurrentDate()
    }
}
</script>