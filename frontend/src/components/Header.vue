<template>
    <nav class="bg-black px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div class="flex items-center space-x-4">
            <button onclick="toggleSidebar()" class="text-gray-400 hover:text-white">
                <i class="fas fa-bars text-2xl"></i>
            </button>
            <h1 class="text-2xl font-bold text-green-500">MusicStream</h1>
        </div>
        <div class="flex items-center space-x-4">
            <div class="relative">
                <input type="text" placeholder="Search" class="bg-gray-800 text-white px-4 py-2 rounded-full w-64 focus:outline-none">
                <i class="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span class="text-xs font-bold">JS</span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>