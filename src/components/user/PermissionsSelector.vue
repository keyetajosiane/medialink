<template>
    <div>
        <slot name="permission-group" v-for="group in permissions" :key="group.id" :group="group">
            <!-- Default content if no slot is provided -->
            <div v-for="permission in group.permissions" :key="permission.id">
                <label :for="`perm-${permission.id}`">{{ permission.name }}</label>
                <input type="checkbox" :id="`perm-${permission.id}`" :value="permission"
                    v-model="internalSelectedPermissions">
            </div>
            <!-- Hypothetical submit button for permissions group -->
            <FormButton @click="submitPermissionsGroup(group)">Submit</FormButton>
        </slot>
    </div>
</template>
  
<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import FormButton from '../formFields/FormButton.vue';

const props = defineProps({
    permissions: {
        type: Array,
        default: () => [],
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);
const internalSelectedPermissions = ref(props.modelValue);

watch(internalSelectedPermissions, (newVal) => {
    emit('update:modelValue', newVal);
});

const submitPermissionsGroup = (group) => {
    // Logic to submit the permissions for a specific group
};
</script>