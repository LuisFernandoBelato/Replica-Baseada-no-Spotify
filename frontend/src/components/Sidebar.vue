<template>
  <div class="sidebar w-64 bg-black p-6 hidden md:block">
    <!-- Navegação principal -->
    <div class="mb-8">
      <ul>
        <li class="mb-2">
          <router-link :to="{ name: 'home' }"
          class="flex items-center space-x-3 text-gray-400 hover:text-white p-2 rounded"
          active-class="active-nav-item"
          >
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            :to="{ name: 'library' }"
            class="flex items-center space-x-3 text-gray-400 hover:text-white p-2 rounded"
            active-class="active-nav-item"
          >
            <i class="fas fa-book"></i>
            <span>Your Library</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Management -->
    <div class="mb-8">
      <h3 class="text-gray-400 uppercase text-xs font-bold mb-4">Management</h3>
      <ul>
        <li class="mb-2">
          <router-link
            :to="{ name: 'users' }"
            class="flex items-center space-x-3 text-gray-400 hover:text-white p-2 rounded"
            active-class="active-nav-item"
          >
            <i class="fas fa-users"></i>
            <span>Users</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            :to="{ name: 'playlists' }"
            class="flex items-center space-x-3 text-gray-400 hover:text-white p-2 rounded"
            active-class="active-nav-item"
          >
            <i class="fas fa-list"></i>
            <span>Playlists</span>
          </router-link>
        </li>
        <li class="mb-2">
          <router-link
            :to="{ name: 'songs' }"
            class="flex items-center space-x-3 text-gray-400 hover:text-white p-2 rounded"
            active-class="active-nav-item"
          >
            <i class="fas fa-music"></i>
            <span>Songs</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="mt-8">
      <button class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full w-full">
        Upgrade to Premium
      </button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "SidebarComponent",
  };
  </script>

<style scoped>
.sidebar {
  height: calc(100vh - 90px);
}
.active-nav-item {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
  
