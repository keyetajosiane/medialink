<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="grid grid-cols-3 gap-4 items-center">
        <FormInput label="Update the Password" inputId="password" type="password" v-model="password" />
        <button
            type="button"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="handlePasswordChange"
        >
            Change Password
        </button>
        <FormIndicator v-if="loading" message="Updating password ..." class="text-white" />
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import FormInput from '@/components/formFields/FormInput.vue';
import axios from 'axios';
import FormIndicator from '@/components/forms/FormIndicator.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const alert = ref(null);
const password = ref('');
const emit = defineEmits(['updatePassword']);
const loading = ref(false);

onMounted(() => {
    initFlowbite();
})
const handlePasswordChange = async () => {
    if (!password.value) {
        alert.value.showAlert('error', 'Password is required', "error!!");
        return;
    }
    loading.value = true;
    axios.put(`user/user/${props.user.user_id}/password`, { password: password.value })
        .then((response) => {
            alert.value.showAlert('success', 'Password updated successfully', "success!!");
        })
        .catch((error) => {
            const message = error.response.data.message ? error.response.data.message : error.message;
            alert.value.showAlert('error', message, "error!!");
        })
        .finally(() => {
            loading.value = false;
        })
}
</script>
