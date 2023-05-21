<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <h1 class="ml-5">
                This is your products
            </h1>
            <v-divider class="mb-10"></v-divider>
            <v-btn v-if="!this.showform" block class="success" @click="openForm" elevation="0">
                create
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-card v-if="this.showform" shaped>
                <v-card-title class="ml-8 pt-4 pb-0 mb-0">
                    <h3>Create new product</h3>
                </v-card-title>
                <v-card-text>
                    <v-row class="mx-4 mb-4 pt-4">
                        <v-col>
                            <v-text-field v-model="title" label="Title*" hint="Enter product name" required class="mb-4">
                            </v-text-field>
                            <v-textarea v-model="description" outlined name="description" label="Product description"
                                required>
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="px-10 pb-10">
                    <v-row>
                        <v-col cols=2>
                            <v-btn block @click="openForm" elevation="0">
                                <v-icon>mdi-arrow-left-bold</v-icon>back
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block class="success" elevation="0" @click="createProduct"
                                :disabled="isSaveButtonDisabled">
                                save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-container>

        <v-row class="ma-0">
            <v-col v-for="product in products" :key="product.id" cols="4">
                <v-card class="pa-0">
                    <v-card-title>
                        <h4>
                            {{ product.title }}
                        </h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        {{ product.description }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" elevation="0" small color="red" @click="deleteProduct(product.id)">
                            delete
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col v-if="productCount === 0 && !this.showform">
                <v-card>
                    <v-card-text>
                        No products
                    </v-card-text>
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
                <v-btn small color="green" text v-bind="attrs" @click="deleted = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>

        <v-snackbar text v-model="orderExisted" :timeout="2000" color="red" right>
            Delete order first!
            <template v-slot:action="{ attrs }">
                <v-btn small color="red" text v-bind="attrs" @click="orderExisted = false">
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
            products: [],
            showform: false,
            clientId: null,
            title: '',
            description: '',
            created: false,
            deleted: false,
            orderExisted: false
        };
    },
    methods: {
        ...mapGetters(['getClientId']),
        openForm() {
            this.showform = !this.showform
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
                    this.products = response.data;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        createProduct() {
            axios({
                method: 'post',
                url: 'product',
                params: {
                    clientId: this.clientId,
                },
                data: {
                    title: this.title,
                    description: this.description
                }
            })
                .then(response => {
                    console.log(response)
                    this.showform = false
                    this.title = ''
                    this.description = ''
                    this.getProducts()
                    this.created = true
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        deleteProduct(id) {
            axios({
                method: 'delete',
                url: 'product',
                params: {
                    productId: id,
                }
            })
                .then(response => {
                    console.log(response)
                    this.getProducts()
                    this.deleted = true
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.orderExisted = true
                    }
                });
        }
    },
    computed: {
        isSaveButtonDisabled() {
            return this.title.trim() === '' || this.description.trim() === '';
        },
        productCount() {
            return this.products.length
        }
    },
    created() {
        this.getProducts()
    }
}

</script>