<template>
  <!-- Songs CRUD Section -->
  <div id="songs-section">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Songs Management</h2>
      <button
        @click="openModal()"
        class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
      >
        Add New Song
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
            <th class="pb-2">Title</th>
            <th class="pb-2">Artist</th>
            <th class="pb-2">Genre</th>
            <th class="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody id="songs-table-body">
          <tr
            v-for="songItem in songs"
            :key="songItem._id"
            class="border-b border-gray-800 hover:bg-gray-800"
          >
            <td>{{ songItem.nome }}</td>
            <td>{{ songItem.artist }}</td>
            <td>{{ songItem.genero }}</td>
            <td class="py-3">
              <button
                class="text-blue-400 hover:text-blue-300 mr-2"
                @click="editSong(songItem)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="text-red-400 hover:text-red-300"
                @click="deleteSong(songItem._id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="songs.length === 0">
            <td colspan="5" class="py-3 text-center text-gray-400">
              Nenhuma música encontrada.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de adicionar/editar -->
    <div
      v-if="showSongModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal()"
    >
      <div class="modal-content bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        <button
          @click="closeModal()"
          class="absolute top-3 right-3 text-white text-2xl"
        >&times;</button>

        <h2 class="text-xl font-bold mb-4 text-white">
          {{ isEditing ? 'Edit Song' : 'Add New Song' }}
        </h2>

        <form @submit.prevent="isEditing ? updateSong() : createSong()">
          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Title</label>
            <input
              v-model="song.nome"
              type="text"
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Artist</label>
            <input
              v-model="song.artist"
              type="text"
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Genre</label>
            <input
              v-model="song.genero"
              type="text"
              class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-400 mb-2">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              @change="handleAudioUpload"
              class="w-full text-gray-200"
            />
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

export default {
  name: "SongsView",
  data() {
    return {
      songs: [],
      showSongModal: false,
      isEditing: false,
      mensagem: "",
      song: {
        _id: "",
        nome: "",
        artist: "",
        genero: "",
        audioFile: null,
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
    this.fetchSongs();
  },
  methods: {
    // LIST
    async fetchSongs() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const { data } = await axiosInstance.get(`/get-musics-by-user/${user.id}`);
        this.songs = data;
      } catch (err) {
        console.error("Erro ao carregar músicas:", err);
      }
    },

    // CREATE
    async createSong() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const formData = new FormData();
        formData.append("nome", this.song.nome);
        formData.append("artist", this.song.artist);
        formData.append("genero", this.song.genero);
        formData.append("autorId", user.id);
        formData.append("audioFile", this.song.audioFile);
        formData.append("thumbnailFile", this.song.thumbnailFile);
        await axiosInstance.post("/create-music", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.mensagem = `Música "${this.song.nome}" cadastrada com sucesso!`;
        this.closeModal();
        this.fetchSongs();
      } catch (err) {
        console.error("Erro ao criar música:", err);
        this.mensagem = "Erro ao criar música. Tente novamente.";
      }
    },

    // EDIT - abre modal preenchido
    editSong(item) {
      this.isEditing = true;
      this.showSongModal = true;
      this.song = {
        _id: item._id,
        nome: item.nome,
        artist: item.artist,
        genero: item.genero,
        audioFile: null,
        thumbnailFile: null,
      };
      this.mensagem = '';
    },

    // UPDATE
    async updateSong() {
      try {
        const logged = JSON.parse(localStorage.getItem('loggedUser') || '{}');
        const autorId = logged._id;
        const formData = new FormData();
        formData.append("nome", this.song.nome);
        formData.append("artist", this.song.artist);
        formData.append("genero", this.song.genero);
        formData.append("autorId", autorId);
        if (this.song.audioFile) formData.append("audioFile", this.song.audioFile);
        if (this.song.thumbnailFile) formData.append("thumbnailFile", this.song.thumbnailFile);

        await axiosInstance.put(
          `/edit-music/${this.song._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        this.mensagem = 'Música atualizada com sucesso!';
        this.closeModal();
        this.fetchSongs();
      } catch (error) {
        console.error(error);
        this.mensagem = `Erro ao atualizar música: ${error.response?.data?.message || error.message}`;
      }
    },

    // DELETE
    async deleteSong(id) {
      try {
        await axiosInstance.delete(`/delete-music/${id}`);
        this.mensagem = 'Música removida.';
        this.fetchSongs();
      } catch (err) {
        console.error(err);
        this.mensagem = 'Erro ao excluir música.';
      }
    },

    handleAudioUpload(event) {
      this.song.audioFile = event.target.files[0];
    },
    handleThumbnailUpload(event) {
      this.song.thumbnailFile = event.target.files[0];
    },
    openModal() {
      this.resetForm();
      this.isEditing = false;
      this.showSongModal = true;
      this.mensagem = '';
    },
    closeModal() {
      this.showSongModal = false;
      this.resetForm();
    },
    resetForm() {
      this.song = { _id: '', nome: '', artist: '', genero: '', audioFile: null, thumbnailFile: null };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.modal-content {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}
</style>
