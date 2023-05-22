<template>
    <v-card>
        <v-list>
            <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            menuItems: null
        }
    },
    computed: {
        ...mapGetters(['getCurrentUserRole', 'getStatus']),
    },
    created() {
        if(this.getCurrentUserRole ===  'CLIENT'){
            this.menuItems = [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Products', to: '/client/products', icon: 'mdi-cube-outline' },
                { title: 'Orders', to: '/client/orders', icon: 'mdi-package' },
                { title: 'Reports', to: '/client/reports', icon: 'mdi-file-chart' },
                { title: 'Offers', to: '/client/offers', icon: 'mdi-tag' },
                { title: 'Profile', to: '/client/profile', icon: 'mdi-account' }
            ]
        }else{
            this.menuItems = [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Tariffs', to: '/agency/tariffs', icon: 'mdi-cash-multiple' },
                { title: 'Orders', to: '/agency/orders', icon: 'mdi-package' },
                { title: 'Clients', to: '/agency/clients', icon: 'mdi-account-group' },
                { title: 'Profile', to: '/agency/profile', icon: 'mdi-account' },
            ]
        }
    }
}        
</script>