<template>
    <v-col :cols="contentCols">
        <v-card max-width="500px" class="mx-auto mt-10">
            <h1>Email: {{ user.email }}</h1>
            <h1>Password: {{ user.password }}</h1>
        </v-card>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['user', 'isAuthenticated', 'getContentCols']),
        contentCols() { return this.getContentCols; }
    }
};
</script>