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
                { title: 'Home', to: '/', icon: 'mdi-home', disabled: true },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' },
                { title: 'Products', to: '/products', icon: 'mdi-cube-outline', disabled: status === 'Pending' },
                { title: 'Orders', to: '/orders', icon: 'mdi-package', disabled: status === 'Pending' },
                { title: 'Reports', to: '/reports', icon: 'mdi-file-chart', disabled: status === 'Pending' },
                { title: 'Offers', to: '/offers', icon: 'mdi-tag', disabled: status === 'Pending' }
            ]
        }else{
            this.menuItems = [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' },
                { title: 'Orders', to: '/orders', icon: 'mdi-package', disabled: status === 'Pending' },
                { title: 'Tariffs', to: '/tariffs', icon: 'mdi-cash-multiple', disabled: status === 'Pending' },
                { title: 'Clients', to: '/clients', icon: 'mdi-account-group', disabled: status === 'Pending' }
            ]
        }
    }
}        
</script>