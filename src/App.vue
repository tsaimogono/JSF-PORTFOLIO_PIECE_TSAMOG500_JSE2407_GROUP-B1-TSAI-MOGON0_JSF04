<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './Routes/+Navbar.vue'; // Adjust path as necessary

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Styles for the App component */
main {
  padding: 20px;
}
</style>
