<script setup lang="ts" generic="T">
import { StyleValue } from "vue";

const props = defineProps<{
  isLoading?: boolean;
  columns: {
    name: string;
    label: string;
  }[];
  rows: T[];
  gridTemplateColumns: string;
  bodyStyle?: StyleValue;
}>();
</script>

<template>
  <div>
    <div class="header">
      <div class="column" v-for="column in columns" :key="column.name">
        {{ column.label }}
      </div>
    </div>
    <div class="body" :style="bodyStyle">
      <template v-if="!isLoading">
        <div class="row" v-for="row in rows" :key="JSON.stringify(row)">
          <div class="column" v-for="column in columns" :key="column.name">
            <slot :name="column.name" :item="row"></slot>
          </div>
        </div>
      </template>
      <template v-else
        ><div class="row" v-for="i in 2" :key="i">
          <div class="column" v-for="column in columns" :key="column.name">
            <div class="skeleton-loading-bg skeleton"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 40px;
  align-items: center;
  background-color: #dadada;
  display: grid;
  grid-template-columns: v-bind(gridTemplateColumns);
  color: #565555;
  border-radius: 12px 12px 0px 0px;
}

.column {
  padding: 4px 8px;
  display: flex;
  align-items: center;
}

.body {
  border-left: 1px solid #dadada;
  border-right: 1px solid #dadada;
}

.row {
  grid-template-columns: v-bind(gridTemplateColumns);
  display: grid;
  border-bottom: 1px solid #dadada;
  padding: 6px 0px;
}

.skeleton {
  height: 20px;
  border-radius: 4px;
  width: 100%;
}
</style>
