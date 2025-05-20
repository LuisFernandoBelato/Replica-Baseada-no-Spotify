<template>
    <div id="playlist-detail-section" class="section">
      <h2 class="text-2xl font-bold mb-6">{{ playlist.nome }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div
          v-for="music in musics"
          :key="music._id"
          class="bg-gray-800 p-4 rounded card-hover cursor-pointer"
          @click="playMusic(music)"
        >
          <div class="w-full aspect-square mb-4 overflow-hidden rounded" style="background:rgba(55,65,81,0.5)">
            <img
              v-if="music.thumbnailPath"
              :src="`http://localhost:8000${music.thumbnailPath}`"
              alt="thumbnail"
              class="w-full h-full object-cover"
              style="filter:brightness(1.2);"
            />
            <div v-else class="w-full h-full bg-gray-600"></div>
          </div>
          <h3 class="font-bold text-white">{{ music.nome }}</h3>
          <p class="text-gray-400 text-sm">{{ music.autor.nome }}</p>
        </div>
      </div>
  
      <PlayerBarComponent
        v-if="currentMusic"
        :track="currentMusic"
        @close="currentMusic = null"
      />
    </div>
  </template>
  
  <script>
  import axiosInstance from "@/services/axiosInstance";
  import PlayerBarComponent from "@/components/PlayerBar.vue";
  
  export default {
    name: "PlaylistDetailComponent",
    components: { PlayerBarComponent },
    data() {
      return {
        playlist: {},
        currentMusic: null,
        musics:[]
      };
    },
    mounted() {
      this.fetchPlaylistDetails();
    },
    methods: {
      async fetchPlaylistDetails() {
        try {
          const playlistId = this.$route.params.id;
          const { data } = await axiosInstance.get(`/get-playlist/${playlistId}`);
          this.playlist = data;

          for (const musicId of this.playlist.musicas) {
            await this.fetchMusicsDetails(musicId); // Chama o método que vai buscar os detalhes da música
            }
          
        } catch (err) {
          console.error("Erro ao buscar detalhes da playlist:", err);
        }
      },
      async fetchMusicsDetails(id) {
        try {
          const { data } = await axiosInstance.get(`/get-music/${id}`);
          this.musics.push(data);
          
        } catch (err) {
          console.error("Erro ao buscar detalhes da playlist:", err);
        }
      },
      playMusic(music) {
        this.currentMusic = music;
      },
    },
  };
  </script>
  