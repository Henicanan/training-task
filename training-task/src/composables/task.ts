import { defineStore } from "pinia";
import { TaskStatus } from "../constants/status";
import { ref } from "vue";

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;
}

export const useTasks = defineStore("tasks", () => {
  const data = ref<Task[]>([]);
  const isLoading = ref(false);
  const isAddLoading = ref(false);
  const isDeleteLoading = ref(false);
  const isUpdateLoading = ref(false);

  const fetchTasks = async () => {
    isLoading.value = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        data.value = JSON.parse(localStorage.getItem("tasks") || "[]");
        console.log(data.value);
        resolve("");
      }, 500);
    });
    isLoading.value = false;
  };

  const addTask = async (newTask: Task) => {
    isAddLoading.value = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("tasks", JSON.stringify([...data.value, newTask]));
        fetchTasks();
        resolve("");
      }, 500);
    });
    isAddLoading.value = false;
  };

  const deleteTask = async (task: Task) => {
    isDeleteLoading.value = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(
          "tasks",
          JSON.stringify(
            data.value.filter((t) => {
              return t.id !== task.id;
            })
          )
        );
        fetchTasks();
        resolve("");
      }, 500);
    });
    isDeleteLoading.value = false;
  };

  const updateTask = async (task: Task) => {
    isUpdateLoading.value = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        const taskToUpdate = data.value.find((t) => {
          return t.id === task.id;
        });
        if (taskToUpdate) {
          taskToUpdate.title = task.title;
          taskToUpdate.description = task.description;
          taskToUpdate.status = task.status;
        }
        localStorage.setItem("tasks", JSON.stringify(data.value));
        fetchTasks();
        resolve("");
      }, 500);
    });
    isUpdateLoading.value = false;
  };
  return {
    addTask,
    deleteTask,
    fetchTasks,
    updateTask,
    isUpdateLoading,
    isAddLoading,
    isDeleteLoading,
    isLoading,
    data,
  };
});
