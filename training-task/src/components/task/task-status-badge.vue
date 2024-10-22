<script setup lang="ts">
import { Task, useTasks } from "../../composables/task";
import { TaskStatus, taskStatuses } from "../../constants/status";
import { storeToRefs } from "pinia";

const props = defineProps<{
  task: Task;
}>();

const { updateTask } = useTasks();
const { isUpdateLoading } = storeToRefs(useTasks());
</script>

<template>
  <div
    :class="['task-status-wrapper', { 'skeleton-loading-bg': isUpdateLoading }]"
  >
    <div
      @click="
        task.status !== taskStatuses.open &&
          updateTask({ ...task, status: taskStatuses.open })
      "
      :class="['badge', { open: task.status === taskStatuses.open }]"
    >
      Открыта
    </div>
    <div
      @click="
        task.status !== taskStatuses.close &&
          updateTask({ ...task, status: taskStatuses.close })
      "
      :class="['badge', { close: task.status === taskStatuses.close }]"
    >
      Закрыта
    </div>
  </div>
</template>

<style scoped>
.task-status-wrapper {
  font-size: 14px;
  display: flex;
  height: 32px;
  border: 1px solid #dadada;
  padding: 2px;
  border-radius: 8px;
  align-items: center;
  gap: 2px;
  overflow: hidden;
}

.badge {
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 4px;
  cursor: pointer;
}

.open {
  background-color: #00bf72;
  color: #fff;
  cursor: default;
}

.close {
  background-color: #b60303;
  color: #fff;
  cursor: default;
}
</style>
