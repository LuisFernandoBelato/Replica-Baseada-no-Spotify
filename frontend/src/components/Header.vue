<template>
    <nav class="bg-black px-6 py-4 flex justify-between items-center border-b border-gray-800">
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-bold text-green-500">MusicStream</h1>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Botão de Logout -->
        <button @click="logout" class="text-white hover:text-green-500">
          Logout
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
    methods: {
      logout() {
        // Limpa os dados do localStorage
        localStorage.removeItem('loggedUser');
  
        // Redireciona para a página inicial (home)
        this.$router.push('/');
      },
    },
  };
  </script>
  
  