<template>
    <div class="edit-user-account">
        <h1 class="text-2xl font-bold mb-4">Edit User Account</h1>
        <!-- Form to edit user account will go here -->
        <form @submit.prevent="submitForm">
            <!-- Input fields for account information -->
            <div class="w-full grid grid-cols-2 gap-4">
                <!-- user_name Input -->
                <FormInput label="user_name" inputId="user_name" type="text" v-model="editUserInfo.user_name" disabled />

                <!-- First Name Input -->
                <FormInput label="First Name" inputId="first_name" type="text" v-model="editUserInfo.first_name" />

                <!-- Last Name Input -->
                <FormInput label="Last Name" inputId="last_name" type="text" v-model="editUserInfo.last_name" />

                <!-- Email Input -->
                <FormInput label="Email" inputId="email" type="email" v-model="editUserInfo.email" />
            </div>

            <!-- Additional fields for apprenant -->
            <div class="w-full grid grid-cols-2 gap-4" v-if="editUserInfo.role === 'apprenant'">
                <!-- Matricule Input -->
                <FormInput label="Matricule" inputId="matricule" type="text" v-model="editUserInfo.matricule" />

                <!-- Departement Select -->
                <FormSelect label="Département" :options="departements" selectId="departement"
                    v-model="editUserInfo.departement_id" defaultOption="Choose departement"
                    />
            </div>

            <!-- Additional fields for membre_administratif -->
            <div class="w-full grid grid-cols-2 gap-4" v-if="editUserInfo.role === 'membre_administratif'">
                <!-- Poste Input -->
                <FormInput label="Poste" inputId="poste" type="text" v-model="editUserInfo.poste" />
            </div>

            <!-- Addiational fields for formateur -->
            <div v-if="editUserInfo.role === 'formateur'" >
                <!-- Future attributes for formateur here -->
                <Departments :userDepartements="editUserInfo.departements" @update="handleDepartmentsChange" />
            </div>

            <div class="">
                <!-- Permissions selection -->
                <PermissionsManager :userPermissions="editUserInfo.permissions" @update="handleUserPermissionsChange" />
            </div>

            <!-- Submit button -->
            <div class="grid grid-cols-2 gap-4 items-center m-4">
                <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update Account
                </button>
                <FormIndicator v-if="loading" message="Updating account ..." class="text-white" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, watch, defineEmits } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import PermissionsManager from '@/components/user/PermissionsManager.vue';
import Departments from '@/components/user/Departments.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useDepartmentsStore } from '@/stores/departments';
import FormIndicator from '@/components/forms/FormIndicator.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const userStore = useUserStore();
const departementStore = useDepartmentsStore();

const alert = ref(null);
// Reactive state for the edit user form
const editUserInfo = reactive({});
const loading = ref(false);
const departements = ref([]);

const emits = defineEmits(['update:editedUser']);

onMounted(async () => {
    if (!departementStore.isDepartmentsLoaded) {
        await departementStore.initDepartments();
    }
    departements.value = departementStore.departments.map(department => ({
        'value': department.departement_id,
        'text': department.nom_departement
    }));
});

watch(async () => {
    if (!props.user) {
        console.error('User ID is required');
        alert.value.showAlert('error', 'User ID is required', "error!!");
        return;
    }

    async function fetchUser() {
        try {
            // for now, don't process admin accounts
            if (props.user.is_admin) {
                Object.entries(props.user).forEach(([key, value]) => {
                    editUserInfo[key] = value;
                });
                return;
            }
            const url = props.user.role === 'formateur'
                ? `formateur/formateur/${props.user.user_id}/user`
                : props.user.role === 'apprenant'
                    ? `apprenant/apprenant/${props.user.user_id}/user`
                    : `administration_members/administration_members/${props.user.user_id}/user`;
            const response = await axios.get(url);
            // Clear existing properties
            Object.keys(editUserInfo).forEach(key => delete editUserInfo[key]);

            // Assign new properties to maintain reactivity
            Object.entries(response.data).forEach(([key, value]) => {
                editUserInfo[key] = value;
            });
            // console.log(editUserInfo);
        } catch (error) {
            console.error(`Failed to fetch user: ${error}`);
        }
    }

    await fetchUser();
});

const handleUserPermissionsChange = (newPermissions) => {
    editUserInfo.permissions = newPermissions;
};

const handleDepartmentsChange = (departments) => {
    editUserInfo.departements = departments;
};

const submitForm = () => {
    // Logic to submit the form
    loading.value = true;
    console.log(editUserInfo);
    setTimeout(() => {
        // Replace with actual form submission logic
        console.log('Form submitted');
        // TODO: Implement form submission to server or handling logic
        loading.value = false;
        emits('update:editedUser', editUserInfo);
    }, 1000); // Simulate form submission after 1 second
};
</script>

<style scoped>
/* Add styles for edit user account component */
</style>
