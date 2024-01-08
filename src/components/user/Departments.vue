<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useDepartmentsStore } from '@/stores/departments';
import FormCheckbox from '@/components/formFields/FormCheckbox.vue';

// define props
const props = defineProps({
    userDepartements: Array
});

// The emit function is used to dispatch events to the parent component
const emit = defineEmits(['update']);

const departmentsStore = useDepartmentsStore();
const departments = ref([]);
const selectedDepartments = ref({});

onMounted(async () => {
    if (departmentsStore.isLoaded) {
        departments.value = departmentsStore.departments;
    }
    else {
        await departmentsStore.initDepartments();
        departments.value = departmentsStore.departments;
    }

    departments.value.forEach((department) => {
        selectedDepartments.value[department.departement_id] = props.userDepartements.includes(department.departement_id);
    })
})

function toggleDepartment(departmentId, isChecked) {
    selectedDepartments.value[departmentId] = isChecked;
    // Emit an update with the full list of selected departments as integers
    emit('update', Object.keys(selectedDepartments.value).filter(key => selectedDepartments.value[key]).map(key => parseInt(key)));
}

function isDepartmentSelected(departmentId) {
    return departments.value.includes(departmentId);
}

</script>

<template>
        <div class="w-full mx-auto mt-10">
        <div class="bg-discord-dark rounded-lg shadow-discord overflow-hidden border border-discord-secondary">
            <div class="p-6 border-b border-discord-secondary">
                <h2 class="text-white text-2xl font-bold mb-4 text-center">Departments</h2>
            </div>
            <div class="p-6">
                <div class="grid gap-6">
                    <FormCheckbox v-for="department in departments" :key="department.departement_id"
                        :id="`depart-${department.departement_id}`" :label="department.nom_departement"
                        :modelValue="isDepartmentSelected(department.departement_id)"
                        @change="toggleDepartment(department.departement_id, $event)"
                        class="form-checkbox text-discord-blue bg-discord-dark border-discord-secondary rounded" />
                </div>
            </div>
        </div>
    </div>
</template>