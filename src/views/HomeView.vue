<template>
    <v-col :cols="contentCols">
        <v-container fluid class="scrollable-container pa-0 ma-0">
            <v-card class="mb-4">
                <v-skeleton-loader type="image" v-if="!isCardLoaded" :loading="true" height="100"></v-skeleton-loader>
                <v-img v-if="isCardLoaded" src="https://www.meme-arsenal.com/memes/858bca7c09c9181dc50247184634c493.jpg"
                    height="200"></v-img>
                <v-card-title v-if="isCardLoaded">Райан Гослинг</v-card-title>
                <v-card-text v-if="isCardLoaded">В фильме Драйв</v-card-text>
            </v-card>
            <v-card>
                <v-skeleton-loader type="image" v-if="!isCardLoaded" :loading="true" height="100"></v-skeleton-loader>
                <v-img v-if="isCardLoaded" src="https://i.ytimg.com/vi/2Ud60AxGJSI/maxresdefault.jpg" height="500"></v-img>
                <v-card-title v-if="isCardLoaded">Патрик Бейтман</v-card-title>
                <v-card-text v-if="isCardLoaded">Американский психопат</v-card-text>
            </v-card>
        </v-container>
    </v-col>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isCardLoaded: false,
        }
    },
    mounted() {
        // simulate a delay in generating the card data
        setTimeout(() => {
            this.isCardLoaded = true;
        }, 1000);
    },
    computed: {
        ...mapGetters(['getContentCols']),
        contentCols() { return this.getContentCols; }
    }
}
</script>