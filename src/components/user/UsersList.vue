<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />

    <div class="overflow-x-auto shadow-md sm:rounded-lg">

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 bg-gray-700 rounded-lg">
                <thead class="text-xs text-white uppercase">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="bg-gray-800 border-b hover:bg-gray-600">
                        <td class="px-6 py-4 text-white">
                            {{ `${user.first_name} ${user.last_name}` }}
                        </td>
                        <td class="px-6 py-4 text-white">
                            {{ user.email }}
                        </td>
                        <td class="px-6 py-4 text-white">
                            {{ user.role }}
                        </td>
                        <td class="px-6 py-4 flex">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex-1"
                                @click="editUser(user)">
                                Edit
                            </button>

                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1"
                                @click="deleteUser(user)">
                                Delete
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

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