<template>
  <div class="min-h-screen bg-[#121212] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo e título -->
      <div class="text-center">
        <img src="@/assets/spotify-logo-white.png" alt="Spotify" class="mx-auto h-12 w-auto mb-6" />
        <h2 class="mt-2 text-3xl font-extrabold text-white">Entre na sua conta</h2>
      </div>
      <!-- Formulário -->
      <form @submit.prevent="login" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              placeholder="Email ou nome de usuário"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-[#282828] focus:outline-none focus:ring-[#1DB954] focus:border-[#1DB954] focus:z-10 sm:text-sm"
            />
          </div>
          <div class="mt-2 relative">
            <label for="password" class="sr-only">Senha</label>
            <input
              id="password"
              v-model="form.senha"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              placeholder="Senha"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-[#282828] focus:outline-none focus:ring-[#1DB954] focus:border-[#1DB954] focus:z-10 sm:text-sm pr-10"
            />
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              v-model="form.remember"
              class="h-4 w-4 text-[#1DB954] focus:ring-[#1DB954] border-gray-600 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-400">
              Lembrar-me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-[#1DB954] hover:underline">Esqueceu a senha?</a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#1DB954] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954]"
          >
            Entrar
          </button>
        </div>

        <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>

        <p class="mt-4 text-center text-sm text-gray-400">
          Não tem uma conta?
          <a href="#" class="font-medium text-[#1DB954] hover:underline">Inscreva-se no Spotify</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/axiosInstance";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: "",
        senha: "",
        remember: false,
      },
      showPassword: false,
      error: "",
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.error = "";
      try {
        const payload = {
          email: this.form.email,
          senha: this.form.senha,
        };
        const { data: user } = await axiosInstance.post("/login", payload);
        localStorage.setItem("loggedUser", JSON.stringify(user));
        this.$router.push({ name: "home" });
      } catch (err) {
        this.error =
          err.response?.status === 401
            ? "Email ou senha inválidos."
            : "Ocorreu um erro. Tente novamente.";
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
/* Cores oficiais do Spotify */
.bg-[#121212] { background-color: #121212; }
.bg-[#282828] { background-color: #282828; }
.text-white { color: #FFFFFF; }
.text-gray-400 { color: #B3B3B3; }
</style>
