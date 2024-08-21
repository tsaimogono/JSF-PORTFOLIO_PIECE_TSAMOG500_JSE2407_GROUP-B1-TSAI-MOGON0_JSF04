<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your username"
        />
        <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
      </div>

      <div class="mb-4 relative">
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          class="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
        />
        <button type="button" @click="togglePasswordVisibility" class="absolute right-2 top-2">
          <span v-if="passwordVisible">👁️</span>
          <span v-else>👁️‍🗨️</span>
        </button>
        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div v-if="loginFailed" class="mt-4 text-red-500">Login failed. Please check your credentials.</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn } from '../stores'; 

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const loading = ref(false);
    const errors = ref({ username: '', password: '' });
    const loginFailed = ref(false);
    const router = useRouter();

    /**
     * Toggles the visibility of the password field.
     */
    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    /**
     * Handles the login process.
     * Validates the input fields, sends the login request, and handles the response.
     */
    const handleLogin = async () => {
      errors.value = { username: '', password: '' };
      loginFailed.value = false;

      // Validate username and password fields
      if (!username.value) {
        errors.value.username = 'Username is required';
        return;
      }

      if (!password.value) {
        errors.value.password = 'Password is required';
        return;
      }

      loading.value = true;

      try {
        // Send login request to the API
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, password: password.value }),
        });

        const result = await response.json();

        if (response.ok) {
          // Store JWT token in local storage and update login state
          localStorage.setItem('jwt', result.token);
          isLoggedIn.value = true;
          // Redirect to the home page or previous page
          router.push('/');
        } else {
          loginFailed.value = true;
        }
      } catch (error) {
        console.error('Login error:', error);
        loginFailed.value = true;
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      passwordVisible,
      loading,
      errors,
      loginFailed,
      togglePasswordVisibility,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
