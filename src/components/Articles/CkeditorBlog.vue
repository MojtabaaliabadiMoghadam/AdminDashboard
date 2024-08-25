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
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CKFinder,
  CKFinderUploadAdapter,
  CloudServices,
  CKBox,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
} from 'ckeditor5';
const editorConfig = ref({
  plugins: [
    Autoformat,
    BlockQuote,
    Bold,
    CKFinder,
    CKFinderUploadAdapter,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation,
    Underline,
  ],
  toolbar: [
    'undo',
    'redo',
    '|',
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    '|',
    'link',
    'uploadImage',
    'insertTable',
    'blockQuote',
    'mediaEmbed',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
  ],
  shouldNotGroupWhenFull: true,
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Default image width',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50% page width',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75% page width',
        value: '75',
      },
    ],
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage',
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  licenseKey: '<YOUR_LICENSE_KEY>',
});
const editor = ClassicEditor
const editorData = ref('')
</script>