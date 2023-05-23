<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container class="pa-0 ma-0">
            <h1 v-if="!showCreateForm" class="ml-5">
                It's all available orders
            </h1>
            <h1 v-else class="ml-5">
                Create new offer
            </h1>
            <v-divider class="mb-2"></v-divider>
        </v-container>


        <v-container v-if="!showCreateForm" class="px-3 ma-0">
            <v-row>
                <v-col cols="4">
                    <v-btn @click="getAllOrders" rounded elevation="0">
                        <v-icon v-if="!loading" class="mr-2">
                            mdi-refresh
                        </v-icon>
                        refresh
                    </v-btn>
                </v-col>
                <v-col cols="8" class="text-right">
                    <v-btn @click="changeOrdersCountInRow" fab small class="mr-2" elevation="0">
                        <v-icon v-if="cols === 6">
                            mdi-view-day
                        </v-icon>
                        <v-icon v-if="cols === 12">
                            mdi-view-dashboard
                        </v-icon>
                    </v-btn>
                    <v-btn @click="sortByAuditory" rounded class="mr-2" elevation="0">
                        <div v-if="sortAuditoryOrder === 'asc'">
                            <v-icon color="green">mdi-account</v-icon>
                            Less auditory
                        </div>
                        <div v-else-if="sortAuditoryOrder === 'desc'">
                            <v-icon color="red">mdi-account</v-icon>
                            More auditory
                        </div>
                    </v-btn>
                    <v-btn @click="sortByDate" elevation="0">
                        <div v-if="sortDatesOrder === 'asc'">
                            <v-icon color="red">mdi-sort-calendar-ascending</v-icon>
                            Latest First
                        </div>
                        <div v-else-if="sortDatesOrder === 'desc'">
                            <v-icon color="green">mdi-sort-calendar-descending</v-icon>
                            New First
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-if="showCreateForm">
            <v-row>
                <v-col>
                    <v-card height>
                        <v-card-title>
                            <v-btn elevation="0" x-small @click="showCreateForm = false" class="warning">
                                <v-icon class="ma-0 pa-0">mdi-arrow-left-bold</v-icon>
                                <span>back</span>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-row class="pt-7 ml-1">
                                <h1>
                                    1. Information about order
                                </h1>
                            </v-row>
                            <v-divider class="my-6"></v-divider>
                            <v-row>
                                <v-col cols="4">
                                    <v-card elevation="0" outlined>
                                        <v-card-title>Product name</v-card-title>
                                        <v-card-text>{{ order.product.title }}</v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="8">
                                    <v-card elevation="0" outlined>
                                        <v-card-title>Product description</v-card-title>
                                        <v-card-text>{{ order.product.description }}</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-card elevation="0" outlined>
                                        <v-card-title>Needed auditory</v-card-title>
                                        <v-card-text>{{ order.order.auditory }} <v-icon
                                                small>mdi-account</v-icon></v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="3">
                                    <v-card elevation="0" outlined>
                                        <v-card-title>From:</v-card-title>
                                        <v-card-text>{{ transformTimestamp(order.order.from_date) }} </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="3">
                                    <v-card elevation="0" outlined>
                                        <v-card-title>To:</v-card-title>
                                        <v-card-text>{{ transformTimestamp(order.order.to_date) }} </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=12>
                                    <v-card elevation="0" outlined>
                                        <v-card-text>
                                            <v-chip v-for="method in order.methods" :key="method.id" class="mr-2 primary">
                                                {{ method.name }}
                                            </v-chip>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-card outlined elevation="0">
                                        <v-card-title>Order description</v-card-title>
                                        <v-card-text>{{ order.order.description }}</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row class="pt-7 ml-1">
                                <h1>
                                    2. Payment calculating
                                </h1>
                            </v-row>
                            <v-divider class="my-6"></v-divider>
                            <v-row>
                                <v-col cols="8">
                                    <v-select v-model="selectedTariff" :items="tariffs" outlined dense label="Choose Tariff"
                                        item-text="tariff.name" item-value="tariff"></v-select>
                                </v-col>
                                <v-col>
                                    <v-btn block elevation="0" @click="getCalculations()">
                                        calculate payings
                                    </v-btn></v-col>
                            </v-row>
                            <v-row v-if="calculated">
                                <v-col>
                                    total: {{ total }}
                                </v-col>
                                <v-col>
                                    per: {{ per }}
                                </v-col>
                                <v-col>
                                    amount: {{ amount }}
                                </v-col>
                            </v-row>
                            <v-row v-if="calculated">
                                <v-col>
                                    <v-btn class="success" block elevation="0" @click="createContract()">
                                        create contract
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions></v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-progress-linear v-if="loading" :active="loading" :indeterminate="loading"
            color="deep-purple accent-4"></v-progress-linear>
        <v-row v-if="!showCreateForm" class="ma-0">
            <v-col v-if="orderCount() === 0">
                <v-card>
                    <v-card-text>
                        No orders
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="order, index in orders" :key="order.id" :cols="cols">
                <v-card class="pa-0">
                    <v-card-title>
                        <v-row>
                            <v-col class="pa-0">
                                <h6 class="ml-2">#{{ index + 1 }}</h6>
                                <h4 class="ml-3">
                                    Order №{{ order.order.id }} - {{ order.product.title }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container class="ma-0 pa-0">Order description:
                            <div>{{ order.order.description }}</div>
                        </v-container>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                            <v-col>
                                <div class="mb-2">Customer:
                                    {{ order.client.first_name }} {{ order.client.last_name }}
                                </div>
                                <div class="mb-2">Auditory:
                                    {{ order.order.auditory }}
                                    <v-icon small>mdi-currency-people
                                    </v-icon>
                                </div>
                                <div>Dates to perform: {{ transformTimestamp(order.order.from_date) }} - {{
                                    transformTimestamp(order.order.to_date)
                                }}</div>
                                <v-chip v-for="method in order.methods" :key="method.id" class="mr-2 mt-4" outlined>
                                    {{ method.name }}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn block class="success" elevation="0" small @click="toCreate(order)">
                            offer
                            <v-icon>
                                mdi-plus
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
    </v-container>
</template>

<script>
import axios from '@/config/axios';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    data() {
        return {
            orders: [],
            sortAuditoryOrder: 'asc',
            sortDatesOrder: 'asc',
            loading: false,
            cols: 6,
            tariffs: [],
            selectedTariff: null,
            createOffer: null,
            showCreateForm: false,
            order: null,
            calculations: null,
            total: '',
            per: '',
            amount: '',
            calculated: false,
            created: false
        };
    },
    methods: {
        ...mapGetters(['getAgencyId']),
        sortByAuditory() {
            if (this.sortAuditoryOrder === 'asc') {
                this.orders.sort((a, b) => a.order.auditory - b.order.auditory);
                this.sortAuditoryOrder = 'desc';
            } else {
                this.orders.sort((a, b) => b.order.auditory - a.order.auditory);
                this.sortAuditoryOrder = 'asc';
            }
        },
        sortByDate() {
            if (this.sortDatesOrder === 'asc') {
                this.orders.sort((a, b) =>
                    new Date(a.order.from_date) - new Date(b.order.from_date)
                );
                this.sortDatesOrder = 'desc';
            } else {
                this.orders.sort((a, b) =>
                    new Date(b.order.from_date) - new Date(a.order.from_date)
                );
                this.sortDatesOrder = 'asc';
            }
        },
        getAllOrders() {
            this.loading = true
            this.sortAuditoryOrder = 'asc'
            this.sortDatesOrder = 'asc'

            axios({
                method: 'get',
                url: 'order/orders/all'
            })
                .then(response => {
                    this.orders = response.data;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        toCreate(order) {
            this.showCreateForm = true
            this.order = order
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
        orderCount() {
            return this.orders.length
        },
        transformTimestamp(timestamp) {
            return moment(timestamp).format('DD/MM/YYYY');
        },
        changeOrdersCountInRow() {
            if (this.cols === 12) {
                this.cols = 6
            }
            else {
                this.cols = 12
            }
        },
        getCalculations() {
            const tariff = this.selectedTariff
            const order = this.order.order

            axios({
                method: 'get',
                url: 'contract/calculate',
                params: {
                    order_id: order.id,
                    tariff_id: tariff.id
                }
            })
                .then(response => {
                    this.total = response.data.total,
                        this.per = response.data.per,
                        this.amount = response.data.amount
                    this.calculated = true
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });

        },
        createContract() {
            const tariff = this.selectedTariff
            const order = this.order.order

            axios({
                method: 'post',
                url: 'contract',
                data: {
                    orderId: order.id,
                    tariffId: tariff.id
                }
            })
                .then(response => {
                    this.showCreateForm = false
                    this.created = true
                    this.selectedTariff = null
                    this.calculated=false
                    console.log(response)
                })
                .catch(error => {
                    console.error('Error fetching tariffs:', error);
                });
        }
    },
    watch: {
        loading(val) {
            if (!val) return
            this.sortPricesOrder = 'asc'
            this.sortDatesOrder = 'asc'
            setTimeout(() => (this.loading = false), 500)
        }
    },
    created() {
        this.getAllOrders()
        this.getTariffs()
    }
}
</script>

