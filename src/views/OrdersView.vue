<template>
  <v-row>
      <!-- Menu -->
      <menu-component />
      <!-- Content -->
      <v-col cols="10">
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
  </v-row>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';

export default {
  components: {
      MenuComponent
  }
}
</script>