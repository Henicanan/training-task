<script setup lang="ts">
import UiTable from "./components/ui/ui-table.vue";
import { Task, useTasks } from "./composables/task";
import { ref } from "vue";
import { taskStatuses } from "./constants/status";
import { generateUuid } from "./utils/uid";
import TrashIcon from "./components/icons/trash-icon.vue";
import TaskStatusBadge from "./components/task/task-status-badge.vue";
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";

const { addTask, deleteTask, fetchTasks, updateTask } = useTasks();
const { isAddLoading, isLoading, data } = storeToRefs(useTasks());
fetchTasks();

const columns = [
  { name: "title", label: "Название" },
  { name: "status", label: "Статус" },
  { name: "actions", label: "" },
];
const newTask = ref<Task>({
  id: generateUuid(),
  title: "",
  description: "",
  status: taskStatuses.open,
});

const editingTask = ref<Task>();
const titleInput = ref<HTMLInputElement>();

const handleUpdateTask = () => {
  if (!editingTask.value) {
    return;
  }
  if (!editingTask.value.title) {
    editingTask.value = undefined;
    return;
  }
  updateTask(editingTask.value);
  editingTask.value = undefined;
};

onClickOutside(titleInput, handleUpdateTask);

const handleSubmit = () => {
  if (!newTask.value.title) {
    return;
  }
  addTask(newTask.value);
  newTask.value = {
    id: generateUuid(),
    title: "",
    description: "",
    status: taskStatuses.open,
  };
};
</script>

<template>
  <div class="wrapper">
    <UiTable
      class="table"
      :rows="data"
      :columns="columns"
      :body-style="{ minHeight: '400px' }"
      grid-template-columns="1fr 10rem 2rem"
      :is-loading="isLoading"
    >
      <template #title="{ item }">
        <div
          v-if="editingTask?.id !== item.id"
          @click="editingTask = { ...item }"
        >
          {{ item.title }}
        </div>
        <input v-else v-model="editingTask.title" ref="titleInput" />
      </template>
      <template #status="{ item }"><TaskStatusBadge :task="item" /></template>
      <template #actions="{ item }"
        ><TrashIcon class="remove-button" @click="deleteTask(item)"
      /></template>
    </UiTable>
    <form class="add-form" @submit.prevent="handleSubmit">
      <input
        class="add-input"
        placeholder="Введите название задачи"
        v-model="newTask.title"
      />
      <button class="add-button" :disabled="isAddLoading" type="submit">
        Создать
      </button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 40rem;
  padding-top: 1rem;
}

.remove-button {
  color: rgb(211, 48, 48);
  cursor: pointer;
}

.add-form {
  display: flex;
  align-items: center;
  border: 1px solid #dadada;
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
  padding: 6px 10px;
}

.add-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
}

.add-button {
  border-radius: 4px;
  background-color: #6b50cd;
  color: #fff;
  border: none;
  padding: 4px 8px;
}

.add-button:disabled {
  background-color: #787777;
}
</style>
