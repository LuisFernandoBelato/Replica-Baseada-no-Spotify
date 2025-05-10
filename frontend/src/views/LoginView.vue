<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="goHome" class="bg-white p-8 rounded shadow-md w-80">
      <h2 class="text-2xl mb-6 text-center">Login</h2>
      <input   type="email"    placeholder="Email"    class="w-full mb-4 p-2 border rounded"/>
      <input  type="password" placeholder="Senha"   class="w-full mb-6 p-2 border rounded"/>
      <button type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",


  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
