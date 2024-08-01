<template>
    <div class="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="block w-full mb-4 p-3 border border-gray-300 rounded-md"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="block w-full mb-4 p-3 border border-gray-300 rounded-md"
      />
      <button
        @click="handleLogin"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { isLoggedIn } from '../Stores'; // Import your store module
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
  
      const handleLogin = () => {
        if (username.value && password.value) {
          isLoggedIn.value = true; // Update the store's value
          alert('Logged in!');
        } else {
          alert('Please enter username and password');
        }
      };
  
      return {
        username,
        password,
        handleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS utility classes are used, so no additional CSS is needed */
  </style>
  