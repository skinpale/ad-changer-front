<template>
    <div>
        <!-- Filters section -->
        <!-- TODO: edit filters -->
        <!-- <v-toolbar color="transparent" elevation="0" class="pb-5"> -->
            <!-- <v-btn small rounded outlined class="success">
                <v-icon left>mdi-plus</v-icon>create new order
            </v-btn>
            <v-spacer></v-spacer> -->
            <!-- FIXME: fix v-btn view -->
            <!-- <v-btn small rounded outlined class="mx-4">
                <v-icon left>mdi-sort</v-icon>status
            </v-btn>
            <v-btn small rounded outlined>
                <v-icon left>mdi-sort</v-icon>date
            </v-btn> -->
        <!-- </v-toolbar> -->

        <v-container class="scrollable-container pa-0 ma-0">
            
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        axios.get('/api/orders')
            .then(response => {
                this.orders = response.data
            })
        axios.get('/api/campaigns')
            .then(response => {
                this.campaigns = response.data
            })
    }
}
</script>