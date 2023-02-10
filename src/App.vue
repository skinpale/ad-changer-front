<template>
  <v-app class="main">
    <navbar-component />
    <router-view />
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent';

export default {
  name: 'App',

  components: {
    NavbarComponent
  },
};
</script>

<style>
#app {
  background-color: #1a1a1a;
}
</style>
