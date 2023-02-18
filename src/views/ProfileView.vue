<template>
    <v-row>
        <!-- Menu -->
        <menu-component />
        <!-- Content -->
        <v-col cols="10">
            <v-card max-width="500px" class="mx-auto mt-10">
                <h1>Email: {{ user.email }}</h1>
                <h1>Password: {{ user.password }}</h1>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        MenuComponent
    },
    computed: {
        ...mapGetters(['user', 'isAuthenticated']),
    }
};
</script>