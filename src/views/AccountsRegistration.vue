<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import CardBox from '@/components/CardBox.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import { mdiAccount, mdiAsterisk, mdiEmail } from '@mdi/js';
import { reactive } from 'vue'

const form = reactive({
    username: '',
    pass: '',
    firstname: '',
    lastname: '',
    email: '',
})

const submit = () => {

}
</script>

<template>
    <LayoutAuthenticated>
        <SectionFullScreen v-slot="{ cardClass }" class="flex-col" bg="purplePink">
            <h1 class="text-4xl font-bold text-white text-center mb-4">Register for a New Account</h1>
            <CardBox :class="cardClass" is-form @submit.prevent="submit">
                <FormField label="Username" help="Please enter your username">
                    <FormControl v-model="form.username" :icon="mdiAccount" name="username" autocomplete="username" />
                </FormField>
                <FormField label="First name" help="Please enter your first name">
                    <FormControl v-model="form.firstname" :icon="mdiAccount" type="text" name="firstname"
                        autocomplete="firstname" />
                </FormField>
                <FormField label="Last name" help="Please enter your last name">
                    <FormControl v-model="form.lastname" :icon="mdiAccount" type="text" name="lastname"
                        autocomplete="lastname" />
                </FormField>
                <FormField label="Password" help="Please enter your password">
                    <FormControl v-model="form.pass" :icon="mdiAsterisk" type="password" name="password"
                        autocomplete="current-password" />
                </FormField>
                <FormField label="Email" help="Please enter your email">
                    <FormControl v-model="form.email" :icon="mdiEmail" type="email" name="email" autocomplete="email" />
                </FormField>


                <template #footer>
                    <BaseButtons>
                        <BaseButton type="submit" color="info" label="Register" />
                        <BaseButton to="/dashboard" color="danger" outline label="Reset" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionFullScreen>
    </LayoutAuthenticated></template>