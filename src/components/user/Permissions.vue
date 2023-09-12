<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const props = defineProps({
    getSelectedPermissions: Function,
});

const permissions = ref([]);
const selectedPermissions = ref([])
const loading = ref(false);
const error = ref(null);

onMounted(() => {
    loading.value = true
    axios.get('permissions/permission')
        .then((response) => {
            permissions.value = response.data;
        })
        .catch((error) => {
            console.log(error);
            error.value = 'Failed to fetch permissions';
        })
        .finally(() => {
            loading.value = false
        })
})

// when the user checks a permission, add it to the selectedPermissions array
const selectPermission = (permission) => {
    const index = selectedPermissions.value.indexOf(permission);
    console.log(index);
    if (index > -1) {
        selectedPermissions.value.splice(index, 1);
    } else {
        selectedPermissions.value.push(permission);
    }

    // notify the parent
    props.getSelectedPermissions(selectedPermissions.value);
}
</script>
<template>
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
            <div class="text-xl font-medium text-black">Permissions</div>
            <!-- Loading state -->
            <p class="text-gray-500" v-if="loading">Loading permissions...</p>
            <!-- Error state -->
            <p class="text-red-500" v-if="error">{{ error }}</p>
            <!-- Permissions list -->
            <p class="text-gray-500" v-for="(permission, index) in permissions" :key="index" v-else>
                <input type="checkbox" :value="permission.permissions_id" :checked="selectedPermissions.includes(permission.permissions_id)" @change="selectPermission(permission.permissions_id)">
                {{ permission.nom }}
            </p>
        </div>
    </div>
</template>
