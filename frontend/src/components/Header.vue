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
  import axiosInstance from '@/services/axiosInstance';
  
  export default {
    name: "HeaderComponent",
    methods: {
      async logout() {
        try {
          await axiosInstance.post('/logout');
          this.$router.push('/');
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        }
      },
    },
  };
  </script>
  
  