<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container class="pa-0 ma-0">
            <h1 class="ml-5">
                It's all available orders
            </h1>
            <v-divider class="mb-2"></v-divider>
        </v-container>
        <v-container class="px-3 ma-0">
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
                    <v-btn @click="sortByPrice" rounded class="mr-2" elevation="0">
                        <div v-if="sortPricesOrder === 'asc'">
                            <v-icon color="green">mdi-arrow-up</v-icon>
                            Price up
                        </div>
                        <div v-else-if="sortPricesOrder === 'desc'">
                            <v-icon color="red">mdi-arrow-down</v-icon>
                            price down
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
        <v-progress-linear v-if="loading" :active="loading" :indeterminate="loading"
            color="deep-purple accent-4"></v-progress-linear>
        <v-row class="ma-0">
            <v-col v-if="orderCount === 0">
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
                        <v-container class="ma-0 pa-0">Product description:
                            <div>{{ order.product.description }}</div>
                        </v-container>
                        <v-divider class="my-4"></v-divider>
                        <v-container class="ma-0 pa-0">Order description:
                            <div>{{ order.order.description }}</div>
                        </v-container>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                            <v-col>
                                <div class="mb-2">Customer:
                                    {{ order.client.first_name }} {{ order.client.last_name }}
                                </div>
                                <div class="mb-2">Amount of money:
                                    {{ order.order.oriented_price }}
                                    <v-icon small>mdi-currency-uah
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
                        <v-btn block class="success" elevation="0" small>
                            offer
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
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
            sortPricesOrder: 'asc',
            sortDatesOrder: 'asc',
            loading: false,
            cols: 6
        };
    },
    methods: {
        ...mapGetters(['getAgencyId']),
        sortByPrice() {
            if (this.sortPricesOrder === 'asc') {
                this.orders.sort((a, b) => a.order.oriented_price - b.order.oriented_price);
                this.sortPricesOrder = 'desc';
            } else {
                this.orders.sort((a, b) => b.order.oriented_price - a.order.oriented_price);
                this.sortPricesOrder = 'asc';
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
        }
    },
    watch: {
        loading(val) {
            if (!val) return
            this.sortPricesOrder = 'asc'
            this.sortDatesOrder = 'asc'
            setTimeout(() => (this.loading = false), 500)
        },
    },
    created() {
        this.getAllOrders()
    }
}
</script>

