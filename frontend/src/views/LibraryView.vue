<template>


    <div id="library-section">
        <h2 class="text-2xl font-bold mb-6">Your Library</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <div class="bg-gray-800 p-4 rounded card-hover cursor-pointer">
                <div class="w-full aspect-square bg-gray-700 mb-4"></div>
                <h3 class="font-bold">Workout Mix</h3>
                <p class="text-gray-400 text-sm">Playlist • 50 songs</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LibraryView",

};

</script>