<template>
  <DataTable
      v-model:editingRows="editingRows"
      :value="localData"
      :editMode="editMode"
      :dataKey="dataKey"
      @row-edit-save="onRowEditSave"
      :pt="{
      table: { style: 'min-width: 50rem' },
      column: {
        bodycell: ({ state }) => ({
          style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
        })
      }
    }"
  >
    <Column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :style="{ width: column.width || 'auto' }"
    >
      <!-- Use the default slot for custom rendering if provided -->
      <template #body="slotProps">
        <slot :name="column.field" :item="slotProps.data">
          <span>{{ slotProps.data[column.field] }}</span> <!-- Default rendering -->
        </slot>
      </template>
      <!-- Provide editor if applicable -->
      <template v-if="column.editor" #editor="{ data, field }">
        <component
            :is="column.editor"
            v-model="data[field]"
            v-bind="column.editorProps"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';

// Define the column interface
interface ColumnDefinition {
  field: string;
  header: string;
  width?: string;
  editor?: any;
  editorProps?: object;
  body?: (data: any, field: string) => string;
}

// Define props for the component
interface IPropsData {
  editMode?: string;
  columns: ColumnDefinition[];
  data: any[];
  dataKey: string;
}

const props = withDefaults(defineProps<IPropsData>(), {
  editMode: 'row',
  columns: [],
  data: [],
  dataKey: 'id',
});

// Create a local copy of data to avoid direct prop mutation
const localData = ref([...props.data]);

// Watch for changes in props data and update local copy
watch(
    () => props.data,
    (newData) => {
      localData.value = [...newData];
    }
);

// Store the rows currently being edited
const editingRows = ref<any[]>([]);

// Handle saving a row edit
function onRowEditSave(event: { data: any }) {
  const { data } = event;
  const index = localData.value.findIndex(p => p[props.dataKey] === data[props.dataKey]);
  if (index !== -1) {
    localData.value[index] = { ...data };
    alert('Row saved!');
  }
}

</script>
