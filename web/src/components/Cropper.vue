<template>
    <div class="image-cropper">
      <input type="file" @change="onFileChange" accept="image/*" />
      <div v-if="src">
        <cropper
          ref="cropperRef"
          :src="src"
          :aspect-ratio="aspectRatio"
          :view-mode="1"
          :auto-crop-area="1"
          :background="false"
          @cropend="onCropEnd"
        />
        <button @click="cropImage">Crop Image</button>
        <button @click="clear">Clear</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import { Cropper } from 'vue3-cropper';
  
  const emit = defineEmits();
  const src = ref(null);
  const croppedImage = ref(null);
  const cropperRef = ref(null);
  
  const aspectRatio = 16 / 9; // Set your desired aspect ratio
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        src.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onCropEnd = () => {
    // Optional: Handle crop end event
  };
  
  const cropImage = () => {
    if (cropperRef.value) {
      croppedImage.value = cropperRef.value.getCroppedCanvas().toDataURL();
      emit('image-cropped', croppedImage.value);
      clear();
    }
  };
  
  const clear = () => {
    src.value = null;
    croppedImage.value = null;
  };
  </script>
  
  <style scoped>
  .image-cropper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  