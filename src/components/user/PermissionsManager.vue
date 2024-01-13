<template>
    <div class="w-full mx-auto mt-10">
        <div class="bg-discord-dark rounded-lg shadow-discord overflow-hidden border border-discord-secondary">
            <div class="p-6 border-b border-discord-secondary">
                <h2 class="text-white text-2xl font-bold mb-4 text-center">Permissions</h2>
            </div>
            <div class="p-6">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(permissions, group) in groupedPermissions" :key="group"
                        class="mb-6 bg-discord-light rounded-md p-4">
                        <h3 class="text-white text-lg font-semibold mb-3">{{ resolveGroupName(group) }}</h3>
                        <div class="grid grid-cols-1 gap-4">
                            <FormCheckbox v-for="permission in permissions" :key="permission.permissions_id"
                                :id="`perm-${permission.permissions_id}`" :label="permission.nom"
                                :modelValue="isPermissionSelected(permission.permissions_id)"
                                @change="togglePermission(permission.permissions_id, $event)"
                                class="form-checkbox text-discord-blue bg-discord-dark border-discord-secondary rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, defineProps, watchEffect, onMounted } from 'vue';
import FormCheckbox from "../formFields/FormCheckbox.vue";
import { useUserStore } from '@/stores/user';

// Define the props the component accepts
const props = defineProps({
    userPermissions: Array // An array of permission ids that the user has
});

// Stores
const userStore = useUserStore();

const permissionsData = ref([]);
const groupNames = {
  'departement': 'Department Permissions',
  'resource': 'Resource Permissions',
  'user': 'User Permissions',
  'module': 'Module Permissions',
};

// Reactive state to keep track of selected permissions
const selectedPermissions = ref({});

// The emit function is used to dispatch events to the parent component
const emit = defineEmits(['update']);

// Pre-populate selectedPermissions based on userPermissions prop
onMounted(async () => {
    
    // permissions data
    if(!userStore.permissions){
        await userStore.loadPermissions()
    }
    permissionsData.value = userStore.permissions
    permissionsData.value.forEach((permission) => {
        selectedPermissions.value[permission.permissions_id] = props.userPermissions.includes(permission.permissions_id);
    });
});

// Computed property to group permissions by category
const groupedPermissions = computed(() => {
    const groups = {};
    permissionsData.value.forEach((permission) => {
        // Assuming 'group' is a property of permission object that determines the category
        const groupName = permission.group;
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(permission);
    });
    return groups;
});

// Method to determine the display name for a group
function resolveGroupName(groupCode) {
    // Use the mapping from groupNames prop if available, otherwise default to the group code
    return groupNames[groupCode] || groupCode;
}

// Method to check if a permission is selected
function isPermissionSelected(permissionId) {
    return !!selectedPermissions.value[permissionId];
}

// Method to toggle a permission
function togglePermission(permissionId, isChecked) {
    selectedPermissions.value[permissionId] = isChecked;
    // Emit an update with the full list of selected permissions as integers
    emit('update', Object.keys(selectedPermissions.value).filter(key => selectedPermissions.value[key]).map(key => parseInt(key)));
}
</script>

<style>
.text-white {
    color: #ffffff;
    /* White text color for headings */
}

.rounded-md {
    border-radius: 0.375rem;
    /* Equivalent to Tailwind's .rounded-md */
}

.p-6 {
    padding: 1.5rem;
    /* Equivalent to Tailwind's .p-6 */
}

.mb-3 {
    margin-bottom: 0.75rem;
    /* Equivalent to Tailwind's .mb-3 */
}

.mb-6 {
    margin-bottom: 1.5rem;
    /* Equivalent to Tailwind's .mb-6 */
}

.grid {
    display: grid;
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    /* One column grid */
}

.gap-4 {
    gap: 1rem;
    /* Equivalent to Tailwind's .gap-4 */
}

.shadow-discord {
    /* Adjust the box-shadow values to match Discord's elevation style */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.bg-discord-dark {
    background-color: #36393f;
    /* Discord dark theme background color */
}

.border-discord-secondary {
    border-color: #2f3136;
    /* Discord secondary border color */
}

.text-discord-blue {
    color: #7289da;
    /* Discord blue text color */
}

/* Ensure you have the correct hex codes for Discord's UI colors */</style>