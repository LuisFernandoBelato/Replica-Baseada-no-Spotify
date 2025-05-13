<template>
    <div id="users-section">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Users Management</h2>
        <button
          @click="showUserModal = true"
          class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Add New User
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b border-gray-800">
            <tr>
              <th class="pb-2">ID</th>
              <th class="pb-2">Name</th>
              <th class="pb-2">Email</th>
              <th class="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody id="users-table-body">
            <tr class="border-b border-gray-800 hover:bg-gray-800">
              <td class="py-3">1</td>
              <td>leo</td>
              <td>leo</td>
              <td class="py-3">
                <button class="text-blue-400 hover:text-blue-300 mr-2" @click="showUserModal = true">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-400 hover:text-red-300">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div
        v-if="showUserModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showUserModal = false"
      >
        <div class="modal-content bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
          <button
            @click="showUserModal = false"
            class="absolute top-3 right-3 text-white text-2xl"
          >&times;</button>
  
          <h2 class="text-xl font-bold mb-4">Add New User</h2>
          <form id="user-form">
            <input type="hidden" id="user-id" />
  
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                id="user-name"
                class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              />
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                id="user-email"
                class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              />
            </div>

              <div class="mb-4">
              <label class="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                id="user-password"
                class="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500"
              />
            </div>
  
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showUserModal = false"
                class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="showUserModal = false"
                class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UsersView",
    data() {
      return {
        showUserModal: false
      };
    }
  };
  </script>
  
  <style scoped>
  .modal-content {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  }
  </style>
  