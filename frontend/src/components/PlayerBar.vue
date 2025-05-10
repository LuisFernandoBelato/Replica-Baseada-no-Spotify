<template>
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 flex items-center justify-between">
        <div class="flex items-center w-1/4">
            <div class="w-12 h-12 bg-gray-700 mr-3"></div>
            <div>
                <p class="font-bold text-sm">Song Title</p>
                <p class="text-gray-400 text-xs">Artist Name</p>
            </div>
            <button class="ml-4 text-gray-400 hover:text-white">
                <i class="far fa-heart"></i>
            </button>
        </div>

        <div class="w-2/4">
            <div class="flex justify-center items-center space-x-4 mb-1">
                <button class="text-gray-400 hover:text-white">
                    <i class="fas fa-random"></i>
                </button>
                <button class="text-gray-400 hover:text-white">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105">
                    <i class="fas fa-play"></i>
                </button>
                <button class="text-gray-400 hover:text-white">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class="text-gray-400 hover:text-white">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-400">0:00</span>
                <div class="flex-1 h-1 bg-gray-700 rounded-full">
                    <div class="h-1 bg-green-500 rounded-full w-1/4"></div>
                </div>
                <span class="text-xs text-gray-400">3:45</span>
            </div>
        </div>

        <div class="flex items-center justify-end w-1/4 space-x-3">
            <button class="text-gray-400 hover:text-white">
                <i class="fas fa-list"></i>
            </button>
            <button class="text-gray-400 hover:text-white">
                <i class="fas fa-laptop"></i>
            </button>
            <button class="text-gray-400 hover:text-white">
                <i class="fas fa-volume-up"></i>
            </button>
            <div class="w-20 h-1 bg-gray-700 rounded-full">
                <div class="h-1 bg-green-500 rounded-full w-3/4"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "PlayerBarComponent",
};
</script>