<template>
    <div id="home-section" class="section">
        <h2 class="text-2xl font-bold mb-6">Good afternoon</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <div class="bg-gray-800 bg-opacity-40 hover:bg-gray-700 p-4 rounded flex items-center card-hover cursor-pointer">
                <div class="w-16 h-16 bg-green-500 rounded mr-4"></div>
                <span class="font-bold">Liked Songs</span>
            </div>
            <!-- More playlist cards would go here -->
        </div>

        <h2 class="text-2xl font-bold mt-10 mb-6">Made For You</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <div class="bg-gray-800 p-4 rounded card-hover cursor-pointer">
                <div class="w-full aspect-square bg-gray-700 mb-4"></div>
                <h3 class="font-bold">Daily Mix 1</h3>
                <p class="text-gray-400 text-sm">Your daily mix of songs</p>
            </div>
            <!-- More recommendation cards would go here -->
        </div>
    </div>
</template>

<script>
export default {
  name: "HomeComponent",
};
</script>