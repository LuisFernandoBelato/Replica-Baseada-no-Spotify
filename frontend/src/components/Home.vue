<template>
    <div id="home-section" class="section">
      <h2 class="text-2xl font-bold mb-6">Playlist</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <div
          v-for="playlist in playlists"
          :key="playlist._id"
          class="bg-gray-800 p-4 rounded card-hover cursor-pointer"
           @click="goToPlaylist(playlist._id)"
        >
        {{ console.log("playlist", playlist) }}
          <div class="w-full aspect-square mb-4 overflow-hidden rounded" style="background:rgba(55,65,81,0.5)">
            <img
            v-if="playlist.thumbnailPath"
            :src="`http://localhost:8000${playlist.thumbnailPath}`"
            alt="thumbnail"
            class="w-full h-full object-cover"
            style="filter:brightness(1.2);"
            />
            <div v-else class="w-full h-full bg-gray-600"></div>
          </div>
          <h3 class="font-bold text-white">{{ playlist.nome }}</h3>
          <p class="text-gray-400 text-sm">{{ playlist.dono.nome }}</p>
        </div>
      </div>
  
      <h2 class="text-2xl font-bold mt-10 mb-6">Musics</h2>
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
  
      <!-- Player Bar aparece só quando currentMusic estiver definido -->
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
    name: "HomeComponent",
    components: { PlayerBarComponent },
    data() {
      return {
        musics: [],
        currentMusic: null,
        playlists:[],
      };
    },
    mounted() {
      this.fetchMusics();
      this.fetchPlaylist();
    },
    methods: {
      async fetchMusics() {
        try {
          const { data } = await axiosInstance.get("/get-musics");
          this.musics = data;
        } catch (err) {
          console.error("Erro ao buscar musics:", err);
        }
      },
      playMusic(music) {
        // define a música corrente e o PlayerBarComponent irá lidar com o áudio
        this.currentMusic = music;
      },
      async fetchPlaylist() {
        try {
          const { data } = await axiosInstance.get("/get-playlists");
          console.log("data = ", data);
          this.playlists = data;
        } catch (err) {
          console.error("Erro ao buscar playlist:", err);
        }
      },
      goToPlaylist(playlistId) {
        this.$router.push({ name: "playlist-detail", params: { id: playlistId } });
      },
    },
  };
  </script>
  