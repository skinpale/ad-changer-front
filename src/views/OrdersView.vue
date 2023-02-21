<template>
    <v-col :cols="contentCols">
        <v-card>
            <v-card-title>Orders</v-card-title>
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getContentCols']),
        contentCols() { return this.getContentCols; }
    }
}
</script>