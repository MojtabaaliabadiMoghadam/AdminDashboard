<template>
  <div>
    <ckeditor
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
    />
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo ,Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize} from 'ckeditor5';
const editorConfig = ref({
  plugins: [
    Bold, Essentials, Italic, Mention, Paragraph, Undo,
    Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize
  ],
  toolbar: [
    'insertImage', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
    'bold', 'italic', '|',
    'undo', 'redo', '|',
    'imageTextAlternative'
  ],
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'toggleImageCaption',
      'imageTextAlternative'
    ]
  },
  licenseKey: '<YOUR_LICENSE_KEY>',
});
const editor = ClassicEditor
const editorData = ref('')
</script>