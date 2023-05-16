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
        ...mapGetters(['getCurrentUserRole'])
    },
    created() {
        if(this.getCurrentUserRole ===  'CLIENT'){
            this.menuItems = [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Products', to: '/products', icon: 'mdi-cube-outline' },
                { title: 'Orders', to: '/orders', icon: 'mdi-package' },
                { title: 'Reports', to: '/reports', icon: 'mdi-file-chart' },
                { title: 'Offers', to: '/offers', icon: 'mdi-tag' },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' }
            ]
        }else{
            this.menuItems = [
                { title: 'Orders', to: '/orders', icon: 'mdi-package' },
                { title: 'Tariffs', to: '/tariffs', icon: 'mdi-cash-multiple' },
                { title: 'Clients', to: '/clients', icon: 'mdi-account-group' },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' }
            ]
        }
    }
}        
</script>