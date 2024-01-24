<template>
  <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
  <div class="bg-gray-800 text-white p-4">
    <h1 class="text-2xl font-bold mb-4">Resources</h1>
    <div v-if="!is_reading">
      <!-- Resource list -->
      <ResourceListvueVue @readResource="handle_resource_read" />
  
      <!-- Upload resource form -->
      <ResourceUploadView v-if="canUploadResource()" />
    </div>
    <ResourceReaderView v-else :source="reading_source.source" :source_title="reading_source.title" :resource_owner_id="reading_source.resource_owner_id" />
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import ResourceUploadView from '@/views/resource/ResourceUploadView.vue';
import ResourceListvueVue from '@/views/resource/ResourceListvue.vue';
import ResourceReaderView from '@/views/resource/ResourceReaderView.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user = ref(userStore.userInfo);
const permissions = ref([]);
const resource_permissions = ref({});
const is_reading = ref(false);
const reading_source = reactive({
  source: '',
  title: '',
  resource_owner_id: -1
});

onMounted(async () => {
  if (!userStore.permissions) {
    await userStore.loadPermissions();
  }
  permissions.value = userStore.permissions;

  // Get resource permissions as object where key is nom and value is permissions_id
  permissions.value.forEach((permission) => {
    if (permission.nom.startsWith('resource_')) {
      resource_permissions.value[permission.nom] = permission.permissions_id;
    }
  })
});

// can upload resource
const canUploadResource = () => {
  return user.value.permissions.includes(resource_permissions.value['resource_create']) || user.value.is_admin;
}

const handle_resource_read = (eventData) => {
  reading_source.source = eventData.source;
  reading_source.title = eventData.title;
  reading_source.resource_owner_id = eventData.resource_owner_id;
  is_reading.value = true;
}

</script>
  
<style scoped>/* You can add additional styles if needed */</style>
  