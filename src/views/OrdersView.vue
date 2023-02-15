<template>
  <div>
    <h1 v-if="isAuthenticated">Hello</h1>
    <h1 v-if="!isAuthenticated">Authorize!</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  }
};
</script>