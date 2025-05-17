<template>
  <div id="users-section">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Users Management</h2>
      <button
        @click="openModal()"
        class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
      >
        Add New User
      </button>
    </div>

    <!-- Mensagem de sucesso/erro -->
    <div v-if="mensagem" class="mb-4 text-center" :class="mensagemClass">
      {{ mensagem }}
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="border-b border-gray-800">
          <tr>
            <th class="pb-2">Name</th>
            <th class="pb-2">Email</th>
            <th class="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody id="users-table-body">
          <tr
            v-for="userItem in users"
            :key="userItem._id"
            class="border-b border-gray-800 hover:bg-gray-800"
          >
            <td>{{ userItem.nome }}</td>
            <td>{{ userItem.email }}</td>
            <td class="py-3">
              <button
                class="text-blue-400 hover:text-blue-300 mr-2"
                @click="editUser(userItem)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="text-red-400 hover:text-red-300"
                @click="deleteUser(userItem._id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="4" class="py-3 text-center text-gray-400">Nenhum usuário encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de adicionar/editar usuário -->
    <div
      v-if="showUserModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal()"
    >
      <div class="modal-content bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        <button
          @click="closeModal()"
          class="absolute top-3 right-3 text-white text-2xl"
        >&times;</button>

        <h2 class="text-xl font-bold mb-4 text-white">
          {{ isEditing ? 'Edit User' : 'Add New User' }}
        </h2>
        <form @submit.prevent="isEditing ? updateUser() : createUser()">
          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Name</label>
            <input
              v-model="user.nome"
              type="text"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Email</label>
            <input
              v-model="user.email"
              type="email"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Password</label>
            <div class="relative">
              <input
                v-model="user.senha"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full bg-gray-700 border border-gray-600 rounded p-2 pr-10 focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                @click="toggleShowPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">CEP</label>
            <input
              v-model="user.cep"
              @blur="fetchAddress"
              type="text"
              required
              placeholder="12345-678"
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Logradouro</label>
            <input
              v-model="user.logradouro"
              type="text"
              readonly
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Bairro</label>
            <input
              v-model="user.bairro"
              type="text"
              readonly
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Estado (UF)</label>
            <input
              v-model="user.estado"
              type="text"
              readonly
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal()"
              class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
            >
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../services/axiosInstance";
import axios from "axios";

export default {
  name: "UsersView",
  data() {
    return {
      users: [],
      showUserModal: false,
      isEditing: false,
      mensagem: "",
      showPassword: false,
      user: {
        _id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        logradouro: "",
        bairro: "",
        estado: "",
      },
    };
  },
  computed: {
    mensagemClass() {
      return this.mensagem.startsWith("Erro") ? "text-red-400" : "text-green-400";
    },
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    // LIST
    async fetchUsers() {
      try {
        const { data } = await axiosInstance.get("/get-users");
        this.users = data;
      } catch (err) {
        console.error(err);
      }
    },

    // CREATE
    async createUser() {
      try {
        const payload = {
          nome: this.user.nome,
          email: this.user.email,
          senha: this.user.senha,
          cep: this.user.cep,
          logradouro: this.user.logradouro,
          bairro: this.user.bairro,
          estado: this.user.estado,
        };
        await axiosInstance.post("/create-user", payload);
        this.mensagem = `Usuário "${this.user.nome}" criado com sucesso!`;
        this.closeModal();
        await this.fetchUsers();
      } catch (error) {
        this.mensagem = `Erro ao criar usuário: ${error.response?.data?.message || error.message}`;
      }
    },

    // DELETE
    async deleteUser(id) {
      try {
        await axiosInstance.delete(`/delete-user/${id}`);
        this.mensagem = "Usuário removido com sucesso!";
        await this.fetchUsers();
      } catch (err) {
        this.mensagem = `Erro ao deletar usuário: ${err.message}`;
      }
    },

    // EDIT
    editUser(u) {
      this.isEditing = true;
      this.showUserModal = true;
      this.user = { ...u }; // já traz senha mascarada
    },

    // UPDATE
    async updateUser() {
      try {
        const { _id, nome, email, senha, cep, logradouro, bairro, estado } = this.user;
        await axiosInstance.put(`/edit-user/${_id}`, {
          nome,
          email,
          senha,
          cep,
          logradouro,
          bairro,
          estado,
        });
        this.mensagem = "Usuário atualizado com sucesso!";
        this.closeModal();
        await this.fetchUsers();
      } catch (err) {
        this.mensagem = `Erro ao atualizar usuário: ${err.message}`;
      }
    },

    // ViaCEP
    async fetchAddress() {
      this.user.logradouro = "";
      this.user.bairro = "";
      this.user.estado = "";
      const cep = this.user.cep.replace(/\D/g, "");
      if (cep.length !== 8) return;
      try {
        const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!resp.data.erro) {
          this.user.logradouro = resp.data.logradouro;
          this.user.bairro = resp.data.bairro;
          this.user.estado = resp.data.uf;
        }
      } catch (e) {
        console.error("ViaCEP error:", e);
      }
    },

    // Toggle visibilidade da senha
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    openModal() {
      this.resetForm();
      this.isEditing = false;
      this.showUserModal = true;
      this.mensagem = "";
    },
    closeModal() {
      this.showUserModal = false;
      this.resetForm();
    },
    resetForm() {
      this.user = {
        _id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        logradouro: "",
        bairro: "",
        estado: "",
      };
      this.showPassword = false;
    },
  },
};
</script>

<style scoped>
.modal-content {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}
</style>
