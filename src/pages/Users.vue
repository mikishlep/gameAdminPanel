<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mdiAccountGroup, mdiMagnify } from "@mdi/js";
import { getUsers, type UsersFormData } from "@/api/users.ts";

interface User {
  idUser: number;
  user: string;
  email: string;
  firstName: string;
  lastName: string;
}

const search = ref('');
const users = ref<User[]>([]);
const loading = ref(false);

const headers = ref([
    { title: 'ID', key: 'id' },
    { title: 'Юзернейм', key: 'username' },
    { title: 'Имя', key: 'firstName' },
    { title: 'Фамилия', key: 'lastName' },
    { title: 'Email', key: 'email' },
]);

onMounted(async () => {
  loading.value = true;

  try {
    const formData: UsersFormData = {
      id_user: localStorage.getItem("userId"),
      offset: 0,
      limit: 10,
    }

    const res = await getUsers(formData);

    if (res.success && Array.isArray((res as any).data)) {
      users.value = (res as any).data;
    } else {
      console.warn("Ошибка при получении пользователей:", res.message);
    }
  } catch (e) {
    console.log(`Ошибка при получении пользователей: ${e}`);
  } finally {
    loading.value = false;
  }
});
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