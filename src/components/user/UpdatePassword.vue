<template>
    <div class="grid grid-cols-3 gap-4 items-center">
        <FormInput label="Update the Password" inputId="password" type="password" v-model="password" />
        <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="handlePasswordChange"
        >
            Change Password
        </button>
        <FormIndicator v-if="loading" message="Updating password ..." class="text-white" />
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import FormInput from '@/components/formFields/FormInput.vue';
import axios from 'axios';
import FormIndicator from '@/components/forms/FormIndicator.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});
const password = ref('');
const emit = defineEmits(['updatePassword']);
const loading = ref(false);

const handlePasswordChange = async () => {
    if (!password.value) {
        emit('updatePassword', {
            success: false,
            message: 'Empty password not allowed',
        });
        return;
    }
    loading.value = true;
    axios.put(`user/user/${props.user.user_id}/password`, { password: password.value })
        .then((response) => {
            emit('updatePassword', {
                success: true,
                message: response.data.message,
            })
        })
        .catch((error) => {
            const message = error.response.data.message ? error.response.data.message : error.message;
            emit('updatePassword', {
                success: false,
                message: message,
            })
        })
        .finally(() => {
            loading.value = false;
        })
}
</script>