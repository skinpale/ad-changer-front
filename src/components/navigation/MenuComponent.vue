<template>
    <v-col cols="2">
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
    </v-col>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Orders', to: '/orders', icon: 'mdi-cart' },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' },
            ]
        }
    }
}        
</script>