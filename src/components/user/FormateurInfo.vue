<template>
  <div>
    <!-- Future attributes for formateur here -->
    <Departments :userDepartements="[]" @update="handleDepartmentsChange" />
  </div>
</template>

<script setup>
import Departments from '@/components/user/Departments.vue';
import { ref, reactive,toRefs, onMounted, watch, defineEmits } from 'vue';
import axios from 'axios';

const formateurInfo = reactive({
  departements: []
});

const handleDepartmentsChange = (departments) => {
  formateurInfo.departements = departments;
};

const emit = defineEmits(['update:baseAccountInfo']);

watch(formateurInfo, () => {
  emit('update:baseAccountInfo', toRefs(formateurInfo));
});
</script>