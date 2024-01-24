<template>
    <div class="bg-gray-900 text-white min-h-screen">
        <div class="container mx-auto p-4">
            <div class="mb-4 flex justify-between">
                <h1 class="text-3xl mb-4">Reading {{ source_title }}</h1>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded" @click="goBack">go back to resources</button>
            </div>
            <vue3-pdf-app class="bg-gray-800 rounded shadow" :pdf="source" :config="config" style="height: 100vh;" />
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, reactive, watch, ref, defineEmits } from 'vue';
import Vue3PdfApp from 'vue3-pdf-app';
import 'vue3-pdf-app/dist/icons/main.css';
import { useUserStore } from '@/stores/user';

const props = defineProps({
    source: {
        type: String,
        required: true
    },
    source_title: {
        type: String,
        required: true
    },
    resource_owner_id: {
        type: Number,
        required: true
    }
});

const config = reactive({
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
    secondaryToolbar: {
        secondaryPrint: false,
        secondaryDownload: false,
    },
    toolbar: {
        toolbarViewerRight: {
            presentationMode: true,
            openFile: true,
            print: false,
            download: false,
            viewBookmark: true,
        }
    }
});

const userStore = useUserStore()
const user = ref(userStore.userInfo);

watch(() => {
    if (user.value) {
        if (props.resource_owner_id == user.value.id || user.value.is_admin) {
            config.secondaryToolbar.secondaryDownload = true;
            config.secondaryToolbar.secondaryPrint = true;
            config.toolbar.toolbarViewerRight.print = true;
            config.toolbar.toolbarViewerRight.download = true;
        }
        else {
            config.secondaryToolbar.secondaryDownload = false;
            config.secondaryToolbar.secondaryPrint = false;
            config.toolbar.toolbarViewerRight.print = false;
            config.toolbar.toolbarViewerRight.download = false;
        }
    }
});

const emit = defineEmits(['stoppedReading']);
const goBack = () => {
    emit('stoppedReading');
};


</script>
  