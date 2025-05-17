<template>
  <div id="playlists-section">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Playlists Management</h2>
      <button
        @click="openModal()"
        class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
      >
        Add New Playlist
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
            <th class="pb-2">Description</th>
            <th class="pb-2">Owner</th>
            <th class="pb-2">Songs</th>
            <th class="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pl in playlists"
            :key="pl._id"
            class="border-b border-gray-800 hover:bg-gray-800"
          >
            <td>{{ pl.nome }}</td>
            <td>{{ pl.descricao }}</td>
            <td>{{ pl.dono.nome }}</td>
            <td>{{ pl.musicas.length }}</td>
            <td class="py-3">
              <button
                class="text-blue-400 hover:text-blue-300 mr-2"
                @click="openEditModal(pl)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="text-red-400 hover:text-red-300"
                @click="deletePlaylist(pl._id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="playlists.length === 0">
            <td colspan="6" class="py-3 text-center text-gray-400">
              Nenhuma playlist encontrada.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de criar / editar playlist -->
    <div
      v-if="showPlaylistModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal()"
    >
      <div class="modal-content bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        <button @click="closeModal()" class="absolute top-3 right-3 text-white text-2xl">
          &times;
        </button>

        <h2 class="text-xl font-bold mb-4 text-white">
          {{ isEdit ? 'Edit Playlist' : 'Add New Playlist' }}
        </h2>
        <form @submit.prevent="savePlaylist">
          <!-- Campos iguais aos de criação -->
          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Name</label>
            <input
              v-model="playlist.nome"
              type="text"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Description</label>
            <textarea
              v-model="playlist.descricao"
              rows="3"
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Songs</label>
            <select
              v-model="playlist.musicsIds"
              multiple
              required
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            >
              <option v-for="song in allSongs" :key="song._id" :value="song._id">
                {{ song.nome }} - {{ song.artist }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Permission</label>
            <select
              v-model="playlist.permission"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              @change="handleThumbnailUpload"
              class="w-full text-gray-200"
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
              {{ isEdit ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../services/axiosInstance";

export default {
  name: "PlaylistsView",
  data() {
    return {
      playlists: [],
      allSongs: [],
      showPlaylistModal: false,
      mensagem: "",
      isEdit: false,
      editPlaylistId: null,
      playlist: {
        nome: "",
        descricao: "",
        musicsIds: [],
        permission: "PUBLIC",
        thumbnailFile: null,
      },
    };
  },
  computed: {
    mensagemClass() {
      return this.mensagem.startsWith("Erro") ? "text-red-400" : "text-green-400";
    },
  },
  mounted() {
    this.fetchPlaylists();
    this.fetchAllSongs();
  },
  methods: {
    async fetchAllSongs() {
      try {
        const { data } = await axiosInstance.get("/get-musics");
        this.allSongs = data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchPlaylists() {
      try {
        const logged = JSON.parse(localStorage.getItem('loggedUser') || '{}');
        const userId = logged._id;
        const { data } = await axiosInstance.get(`/get-playlists-by-user/${userId}`);
        this.playlists = data;
      } catch (err) {
        console.error(err);
      }
    },

    handleThumbnailUpload(event) {
      this.playlist.thumbnailFile = event.target.files[0];
    },

    // Abre modal para criação
    openModal() {
      this.isEdit = false;
      this.editPlaylistId = null;
      this.resetForm();
      this.showPlaylistModal = true;
      this.mensagem = "";
    },
    // Abre modal para edição, pré-carregando fields
    openEditModal(pl) {
      this.isEdit = true;
      this.editPlaylistId = pl._id;
      this.playlist.nome = pl.nome;
      this.playlist.descricao = pl.descricao;
      this.playlist.musicsIds = pl.musicas.map(m => m._id);
      this.playlist.permission = pl.permission;
      this.playlist.thumbnailFile = null; // se quiser manter thumb, deixe como está
      this.showPlaylistModal = true;
      this.mensagem = "";
    },

    // Handler único para Save/Update
    savePlaylist() {
      return this.isEdit ? this.updatePlaylist() : this.createPlaylist();
    },

    // Cria nova
    async createPlaylist() {
      try {
        const logged = JSON.parse(localStorage.getItem("loggedUser") || "{}");
        const formData = new FormData();
        formData.append("nome", this.playlist.nome);
        formData.append("descricao", this.playlist.descricao);
        formData.append("donoId", logged._id);
        formData.append("musicasIdsArray", JSON.stringify(this.playlist.musicsIds));
        formData.append("permission", this.playlist.permission);
        if (this.playlist.thumbnailFile) {
          formData.append("thumbnailFile", this.playlist.thumbnailFile);
        }
        await axiosInstance.post("/create-playlist", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.mensagem = `Playlist "${this.playlist.nome}" criada!`;
        this.closeModal();
        this.fetchPlaylists();
      } catch (err) {
        console.error(err);
        this.mensagem = `Erro ao criar playlist: ${err.response?.data?.message || err.message}`;
      }
    },

    // Atualiza existente
    async updatePlaylist() {
      try {
        const logged = JSON.parse(localStorage.getItem("loggedUser") || "{}");
        const formData = new FormData();
        formData.append("nome", this.playlist.nome);
        formData.append("descricao", this.playlist.descricao);
        formData.append("donoId", logged._id);
        formData.append("musicasIdsArray", JSON.stringify(this.playlist.musicsIds));
        formData.append("permission", this.playlist.permission);
        if (this.playlist.thumbnailFile) {
          formData.append("thumbnailFile", this.playlist.thumbnailFile);
        }
        await axiosInstance.put(
          `/edit-playlist/${this.editPlaylistId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.mensagem = `Playlist "${this.playlist.nome}" atualizada!`;
        this.closeModal();
        this.fetchPlaylists();
      } catch (err) {
        console.error(err);
        this.mensagem = `Erro ao atualizar playlist: ${err.response?.data?.message || err.message}`;
      }
    },

    // Deleta
    async deletePlaylist(id) {
      try {
        await axiosInstance.delete(`/delete-playlist/${id}`);
        this.mensagem = "Playlist removida com sucesso!";
        this.fetchPlaylists();
      } catch (err) {
        console.error(err);
        this.mensagem = `Erro ao deletar playlist: ${err.response?.data?.message || err.message}`;
      }
    },

    closeModal() {
      this.showPlaylistModal = false;
      this.resetForm();
      this.isEdit = false;
      this.editPlaylistId = null;
    },
    resetForm() {
      this.playlist = {
        nome: "",
        descricao: "",
        musicsIds: [],
        permission: "PUBLIC",
        thumbnailFile: null,
      };
    },
  },
};
</script>

<style scoped>
.modal-content {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}
</style>
