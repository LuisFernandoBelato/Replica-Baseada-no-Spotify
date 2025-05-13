<template  >
  <div v-if="!$route.meta.noLayout" class="bg-black text-white">
    <HeaderComponent />
    <div class="flex" >
      <SidebarComponent />

      <div class="main-content flex-1 bg-gradient-to-b from-gray-900 to-black p-6">
        <router-view />
      </div>
    </div>
    <PlayerBarComponent />
  </div>
  



  <!-- ILOGIN -->
  <div v-if="$route.meta.noLayout">
    <router-view />

  </div>

</template>



<script>

import SidebarComponent from './components/Sidebar.vue';
import HeaderComponent from './components/Header.vue';
import PlayerBarComponent from './components/PlayerBar.vue';

export default {
  components: { HeaderComponent, SidebarComponent, PlayerBarComponent }
}

</script>


<style>
.app-container {
  display: flex;
}
</style>
