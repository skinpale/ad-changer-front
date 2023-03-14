<template>
    <v-col v-if="this.getMenuVisible" :cols="menuCols">
        <v-card>
            <v-list>
                <draggable v-model="menuItems" handle=".handle">
                    <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.to">
                        <v-list-item-action v-if="draggable"
                            class="handle"><v-icon>mdi-drag-vertical</v-icon></v-list-item-action>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </draggable>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            menuItems: [
                { title: 'Home', to: '/', icon: 'mdi-home' },
                { title: 'Campaigns', to: '/campaigns', icon: 'mdi-bullhorn' },
                { title: 'Reports', to: '/reports', icon: 'mdi-file-chart' },
                { title: 'Profile', to: '/profile', icon: 'mdi-account' },
                { title: 'Settings', to: '/settings', icon: 'mdi-cog' },
                { title: 'Help/Support', to: '/help', icon: 'mdi-lifebuoy' },
                { title: 'Aboba', to: '/aboba', icon: 'mdi-flag' }
            ]
        }
    },
    components: { draggable },
    computed: {
        ...mapGetters(['getMenuCols', 'getDraggable', 'getMenuVisible']),
        menuCols() { return this.getMenuCols },
        draggable() { return this.getDraggable }
    } 
}        
</script>