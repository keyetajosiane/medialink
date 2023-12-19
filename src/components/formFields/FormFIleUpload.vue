<template>
  <div class="file-upload-container" :class="containerClasses">
    <label
      :for="inputId"
      :class="labelClasses"
      :style="{ backgroundColor: color, color: textColor }"
    >
      <input
        :id="inputId"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileUpload"
        :class="inputClasses"
      />
      <span v-if="!files.length">{{ label }}</span>
      <span v-else>{{ displayFileName }}</span>
    </label>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Upload file...'
  },
  inputId: {
    type: String,
    required: true
  },
  accept: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,
    default: 2 // Size in MB
  },
  color: {
    type: String,
    default: '#5865F2' // Discord primary color
  },
  textColor: {
    type: String,
    default: '#FFFFFF' // Discord text color
  }
});

const files = ref([]);
const error = ref('');

const displayFileName = computed(() => {
  if (props.multiple) {
    return `${files.value.length} file(s) selected`;
  } else {
    return files.value[0] ? files.value[0].name : props.label;
  }
});

const handleFileUpload = (event) => {
  const selectedFiles = [...event.target.files];
  const validFiles = [];
  const invalidFiles = [];
  
  selectedFiles.forEach(file => {
    const fileSizeMB = file.size / 1024 / 1024;
    const acceptedTypes = props.accept.split(',').map(ext => `.${ext}`).join('|');
    const regex = new RegExp(`(${acceptedTypes})$`, 'i');
    
    if (fileSizeMB <= props.maxSize && (!props.accept || file.name.match(regex))) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });
  
  if (invalidFiles.length > 0) {
    // Customize this message to fit your application's needs
    error.value = `Some files were rejected. Max size: ${props.maxSize}MB. Accepted types: ${props.accept}.`;
  } else {
    error.value = '';
  }
  
  files.value = validFiles;
};

const containerClasses = computed(() => ({
  'inline-block': true,
}));

const labelClasses = computed(() => ([
  'file-upload-label',
  'px-4 py-2 block cursor-pointer text-sm font-medium rounded-lg',
  'transition-colors duration-200 ease-in-out',
  'hover:bg-opacity-75 focus:outline-none',
]));

const inputClasses = computed(() => ([
  'file-input',
  'sr-only',
]));
</script>

<style scoped>
.file-upload-label {
  display: inline-block;
  border: 1px solid transparent;
  background-color: var(--bg-color);
  color: var(--text-color);
}
.file-upload-label:hover, .file-upload-label:active {
  background-color: #4752C4;
}
.file-upload-label:focus-within {
  box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.5);
}
.error-message {
  margin-top: 0.5rem;
  color: #ff6b6b;
  font-size: 0.875rem; /* 14px */
}
</style>