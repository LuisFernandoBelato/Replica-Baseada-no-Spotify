<template>
    <div v-if="track" class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center w-1/4">
           <img
     v-if="track.thumbnailPath"
     :src="`http://localhost:8000${track.thumbnailPath}`"
     alt="thumb"
     class="w-12 h-12 object-cover mr-3 rounded"
   />
        <div>
          <p class="font-bold text-sm">{{ track.nome }}</p>
          <p class="text-gray-400 text-xs">{{ track.autor.nome }}</p>
        </div>
        <button class="ml-4 text-gray-400 hover:text-white" @click="toggleLike">
          <i class="far fa-heart"></i>
        </button>
      </div>

      <div class="w-2/4">
        <div class="flex justify-center items-center space-x-4 mb-1">
          <button class="text-gray-400 hover:text-white"><i class="fas fa-random"></i></button>
          <button class="text-gray-400 hover:text-white" @click="prev"><i class="fas fa-step-backward"></i></button>
          <button
            @click="togglePlay"
            class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105"
          >
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </button>
          <button class="text-gray-400 hover:text-white" @click="next"><i class="fas fa-step-forward"></i></button>
          <button class="text-gray-400 hover:text-white"><i class="fas fa-redo"></i></button>
        </div>
        <!-- barra de progresso simples -->
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-400">{{ formatTime(currentTime) }}</span>
          <div class="flex-1 h-1 bg-gray-700 rounded-full">
            <div class="h-1 bg-green-500 rounded-full" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="text-xs text-gray-400">{{ formatTime(duration) }}</span>
        </div>
      </div>
  
      <!-- Volume e listas -->
      <div class="flex items-center justify-end w-1/4 space-x-3">
        <button class="text-gray-400 hover:text-white"><i class="fas fa-list"></i></button>
        <button class="text-gray-400 hover:text-white"><i class="fas fa-laptop"></i></button>
        <button class="text-gray-400 hover:text-white"><i class="fas fa-volume-up"></i></button>
        <div class="w-20 h-1 bg-gray-700 rounded-full">
          <div class="h-1 bg-green-500 rounded-full w-3/4"></div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PlayerBarComponent",
    props: {
        track: {
      type: Object,
      default: null
    },
    },
    data() {
      return {
        audio: null,
        isPlaying: false,
        duration: 0,
        currentTime: 0,
      };
    },
    computed: {
      progress() {
        return this.duration ? (this.currentTime / this.duration) * 100 : 0;
      },
    },
    watch: {
      track: {
        immediate: true,
        handler(newTrack) {
            if (!newTrack || !newTrack.filePath) {
         console.warn("PlayerBar: track sem filePath, não criando áudio.", newTrack);
         this.isPlaying = false;
         return;
       }
          if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
          // cria novo Audio e já começa a tocar:
          this.audio = new Audio(`http://localhost:8000${newTrack.filePath}`);
          this.audio.addEventListener("loadedmetadata", () => {
            this.duration = this.audio.duration;
          });
          this.audio.addEventListener("timeupdate", () => {
            this.currentTime = this.audio.currentTime;
          });
          this.audio.addEventListener("ended", () => {
            this.isPlaying = false;
          });
          this.audio.play();
          this.isPlaying = true;
        },
      },
    },
    methods: {
      togglePlay() {
        if (!this.audio) return;
        if (this.isPlaying) {
          this.audio.pause();
        } else {
          this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
      },
      prev() {
        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
      },
      next() {
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
      },
      toggleLike() {
        // se quiser marcar favorito…
      },
      formatTime(sec) {
        const m = Math.floor(sec / 60)
          .toString()
          .padStart(2, "0");
        const s = Math.floor(sec % 60)
          .toString()
          .padStart(2, "0");
        return `${m}:${s}`;
      },
    },
    beforeUnmount() {
      if (this.audio) {
        this.audio.pause();
        this.audio.src = "";
      }
    },
  };
  </script>
  