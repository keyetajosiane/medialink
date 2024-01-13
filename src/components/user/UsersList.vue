<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="min-w-full bg-gray-900">
            <thead class="bg-gray-700">
                <tr>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-400">Name</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-400">Email</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-400">Role</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-400">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="border-b border-gray-800 hover:bg-gray-600 transition duration-300">
                    <td class="text-left py-3 px-4 text-gray-200">{{ `${user.first_name} ${user.last_name}` }}</td>
                    <td class="text-left py-3 px-4 text-gray-200">{{ user.email }}</td>
                    <td class="text-left py-3 px-4 text-gray-200">{{ user.role }}</td>
                    <td class="text-left py-3 px-4">
                        <button @click="editUser(user)"
                            class="px-4 py-2 bg-blue-600 text-white text-xs font-bold mr-3 rounded hover:bg-blue-700 transition duration-300">Edit</button>
                        <button @click="deleteUser(user)"
                            class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition duration-300">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- editing section -->
        <div v-if="isEditing" class="mt-20" ref="editSection">
            <EditUser :user="editingUser" @update:editedUser="closeEdit" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useUserStore } from '@/stores/user';
import EditUser from '@/components/user/EditUser.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';

const users = ref([
    // ... your users data
]);

const userStore = useUserStore();

const isEditing = ref(false);
const editingUser = reactive({});
const editSection = ref(null);

const alert = ref(null);

onMounted(async () => {
    initFlowbite();

    if (!userStore.usersList) {
        await userStore.loadUsersList();
    }
    users.value = userStore.usersList;
});

const editUser = async (user) => {
    // clear existing properties
    Object.keys(editingUser).forEach((key) => {
        delete editingUser[key];
    })
    // assign new properties
    Object.entries(user).forEach(([key, value]) => {
        editingUser[key] = value;
    })
    isEditing.value = true;
    // wait for the DOM to update
    await nextTick();
    // scroll to the editing section
    editSection.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const closeEdit = async () => {
    isEditing.value = false;
    editingUser.value = null;
    // show success alert
    alert.value.showAlert('success', 'User updated successfully', "success!!");
    // wait for the DOM to update
    await nextTick();
    // scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteUser = (user) => {
    // logic to delete user
    console.log('Deleting user', user);
};
</script>

<style scoped>/* You might want to add some custom styles or use Tailwind utilities here */</style>