<template>
  <v-app class="main">
    <navbar-component/>
    <router-view/>
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent';

export default {
  name: 'App',

  components: {
    NavbarComponent
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  background-color: #1a1a1a;
  /* background: linear-gradient(240deg, rgb(246, 246, 246) 0%, rgb(216, 200, 249) 100%); */
}
</style>
