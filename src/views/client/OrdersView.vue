<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <h1 class="ml-5">
                This is your orders
            </h1>
            <v-divider class="mb-10"></v-divider>
            <v-btn v-if="!this.showform" block class="success" @click="openForm" elevation="0">
                create
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-card v-if="this.showform" shaped>
                <v-card-title class="ml-8 pt-4 pb-0 mb-0">
                    <h3>Create new order</h3>
                </v-card-title>
                <v-divider class="mt-2"></v-divider>
                <v-card-text>
                    <v-row class="mx-4 mb-4 pt-4">
                        <v-col>
                            <h3>
                                1. Choose your product you want to advertise:
                            </h3>
                            <v-row class="pa-0 ma-0">
                                <v-col cols="4" class="px-0 mx-0">
                                    <v-select v-model="product" :items="products" label="Select product to advert" outlined
                                        item-text="title" item-value="id"></v-select>
                                </v-col>
                            </v-row>
                            <div class="my-2">
                                <h3>
                                    2. Give some concretize description about what you exactly want to achieve
                                </h3>
                            </div>
                            <v-row class="pa-0 ma-0">
                                <v-textarea v-model="description" outlined name="description" label="Order description"
                                    required>
                                </v-textarea>
                            </v-row>
                            <div class="my-2">
                                <h3>
                                    3. Choose methods of ad you prefer
                                </h3>
                            </div>
                            <v-row class="pa-0 ma-0">
                                <v-col class="pa-0 ma-0">
                                    <v-combobox v-model="chips" :items="methods" chips item-text="name" clearable
                                        label="Ad methods" multiple outlined class="pa-0 ma-0">
                                        <template v-slot:selection="{ attrs, item, select, selected }">
                                            <v-chip v-bind="attrs" :input-value="selected" close @click="select"
                                                @click:close="remove(item)">
                                                <strong>{{ item.name }}</strong>&nbsp;
                                            </v-chip>
                                        </template>
                                    </v-combobox>
                                </v-col>
                            </v-row>
                            <div class="my-2">
                                <h3>
                                    4. Enter amount of money you have
                                </h3>
                            </div>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field v-model="price" outlined class="pa-0 ma-0" prefix="$" />
                                </v-col>
                            </v-row>

                            <div class="my-2">
                                <h3>
                                    5. Choose preferred dates of advertising
                                </h3>
                            </div>
                            <v-divider class="pb-4"></v-divider>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-date-picker v-model="dates" color="green" range></v-date-picker>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar"
                                        readonly></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="px-10 pb-10">
                    <v-row>
                        <v-col cols=2>
                            <v-btn block elevation="0" @click="showform = false">
                                <v-icon>mdi-arrow-left-bold</v-icon>back
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block class="success" elevation="0" @click="createOrder()">
                                create
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-container>

        <v-row class="ma-0">
            <v-col v-if="orderCount === 0 && !this.showform">
                <v-card>
                    <v-card-text>
                        No orders
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="order, index in orders" :key="order.id" cols="6">
                <v-card class="pa-0">
                    <v-overlay :z-index="1" :value="overlay">
                        <v-card>
                            <v-card-title>
                                Do you want to delete this order?
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
                                        <v-btn class="white--text" color="red" large @click="deleteOrder(currentOrderId)"
                                            elevation="0">
                                            delete
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-overlay>
                    <v-progress-linear value="100" v-if="order.order.status == 'FIND_AGENCY'"
                        color="blue"></v-progress-linear>
                    <v-progress-linear value="100" v-if="order.order.status == 'ON_ACCEPT'"
                        color="orange"></v-progress-linear>
                    <v-progress-linear value="100" v-if="order.order.status == 'ACTIVE_CAMPAIGN'"
                        color="green"></v-progress-linear>
                    <v-card-title>
                        <v-row>
                            <v-col class="pa-0">
                                <h6 class="ml-2">#{{ index + 1 }}</h6>
                                <h4 class="ml-3">
                                    Order №{{ order.order.id }} - {{ order.product.title }}
                                </h4>
                            </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                        <h6 v-if="order.order.status == 'FIND_AGENCY'">
                            <v-chip label outlined>find agency</v-chip>
                        </h6>
                        <h6 v-if="order.order.status == 'ON_ACCEPT'">
                            <v-chip label outlined color="yellow">on accept</v-chip>
                        </h6>
                        <h6 v-if="order.order.status == 'ACTIVE_CAMPAIGN'">
                            <v-chip label outlined color="green"> active campaign</v-chip>
                        </h6>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container class="ma-0 pa-0">
                            <div>{{ order.order.description }}</div>
                        </v-container>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                            <v-col>
                                <div class="mb-2">Price: ~{{ order.order.oriented_price }} <v-icon
                                        small>mdi-currency-uah</v-icon>
                                </div>
                                <div>Date: {{ transformTimestamp(order.order.from_date) }} - {{
                                    transformTimestamp(order.order.to_date)
                                }}</div>
                                <v-chip v-for="method in order.methods" :key="method.id" class="mr-2 mt-4" outlined>
                                    {{ method.name }}
                                </v-chip>
                            </v-col>
                        </v-row>

                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" elevation="0" small color="red" @click="showConfirm(order.order.id)">
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


        <v-snackbar text v-model="activeCampaign" :timeout="2000" color="red" right>
            Error! Active campaign
            <template v-slot:action="{ attrs }">
                <v-btn small color="red" text v-bind="attrs" @click="activeCampaign = false">
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
            showform: false,
            activeCampaign: false,
            overlay: false,
            currentOrderId: null,
            created: false,
            deleted: false,
            products: [],
            methods: [],
            product: null,
            dates: ['2019-09-10', '2019-09-20'],
            chips: [],
            description: '',
            price: ''
        };
    },
    methods: {
        ...mapGetters(['getClientId']),
        getOrders() {
            this.clientId = this.getClientId();

            axios({
                method: 'get',
                url: 'order/orders',
                params: {
                    client_id: this.clientId,
                }
            })
                .then(response => {
                    this.orders = response.data;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        getProducts() {
            this.clientId = this.getClientId();

            axios({
                method: 'get',
                url: 'product/products',
                params: {
                    client: this.clientId,
                }
            })
                .then(response => {
                    this.products = response.data
                    // .map(item => item)

                })
                .catch(error => {
                    if (error.response.status === 400) {
                        //
                    }
                });
        },
        getMethods() {
            axios({
                method: 'get',
                url: 'methods'
            })
                .then(response => {
                    this.methods = response.data.map(item => item)
                })
        },
        showConfirm(id) {
            this.currentOrderId = id;
            this.overlay = true
        },
        deleteOrder(id) {
            this.overlay = false;

            axios({
                method: 'delete',
                url: 'order',
                params: {
                    order_id: id,
                }
            })
                .then(response => {
                    console.log(response)
                    this.getOrders()
                    this.deleted = true
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.activeCampaign = true
                    }
                });
        },
        createOrder() {
            this.clientId = this.getClientId();

            axios({
                method: 'post',
                url: 'order',
                data: {
                    order: {
                        description: this.description,
                        oriented_price: this.price,
                        from_date: this.dates[0],
                        to_date: this.dates[1],
                        productId: this.product,
                        clientId: this.clientId
                    },
                    methods: this.chips
                }
            })
                .then(response => {
                    console.log(response)
                    this.getOrders()
                    this.created = true
                    this.showform = false
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.activeCampaign = true
                    }
                });
        },
        openForm() {
            this.showform = !this.showform
        },
        transformTimestamp(timestamp) {
            return moment(timestamp).format('DD/MM/YYYY');
        },
        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
        }
    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
        orderCount() {
            return this.orders.length
        }
    },
    created() {
        this.getOrders();
        this.getProducts();
        this.getMethods();
    }
}
</script>