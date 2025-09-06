<script setup lang="ts">
import { ref } from 'vue';
import { mdiAccountGroup, mdiMagnify } from "@mdi/js";

interface User {
  id: number;
  name: string;
  email: string;
}

const search = ref('');
const users = ref<User[]>([
  { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
  { id: 2, name: 'Пётр Петров', email: 'petr@example.com' },
  { id: 3, name: 'Сергей Сергеев', email: 'sergey@example.com' },
]);

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Имя', key: 'name' },
  { title: 'Email', key: 'email' },
]);
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon :icon="mdiAccountGroup"></v-icon> &nbsp;
      Пользователи

      <v-spacer></v-spacer>

      <v-text-field
          v-model="search"
          density="compact"
          label="Поиск"
          :prepend-inner-icon="mdiMagnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          style="max-width: 300px;"
      />
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        item-value="id"
        class="elevation-1"
    />
  </v-card>
</template>

<style scoped>

</style>