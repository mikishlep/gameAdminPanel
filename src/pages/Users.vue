<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { mdiAccountGroup, mdiMagnify } from "@mdi/js";
import { getUsers, type UsersFormData, type User, type UsersResponse } from "@/api/users.ts";

const search = ref('');
const users = ref<User[]>([]);
const loading = ref(false);

const page = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

// заголовки таблицы должны совпадать с ключами данных
const headers = ref([
  { title: 'ID', key: 'idUser' },
  { title: 'Юзернейм', key: 'user' },
  { title: 'Имя', key: 'firstName' },
  { title: 'Фамилия', key: 'lastName' },
  { title: 'Email', key: 'email' },
]);

async function fetchUsers() {
  loading.value = true;
  try {
    const formData: UsersFormData = {
      id_user: Number(localStorage.getItem("userId")),
      offset: (page.value - 1) * itemsPerPage.value,
      limit: itemsPerPage.value,
    };

    const res: UsersResponse = await getUsers(formData);
    users.value = res.users;
    totalItems.value = res.total;
  } catch (e) {
    console.error("Ошибка при получении пользователей:", e);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);

watch([page, itemsPerPage], fetchUsers);
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon :icon="mdiAccountGroup"></v-icon> &nbsp; Пользователи
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
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :server-items-length="totalItems"
        item-value="idUser"
        class="elevation-1"
        :loading="loading"
    />
  </v-card>
</template>

<style scoped>

</style>