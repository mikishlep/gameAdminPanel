<script setup lang="ts">
import { ref } from "vue";
import { mdiAccountGroup, mdiMagnify, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { getUsers, type UsersFormData, type User, type UsersResponse } from "@/api/users.ts";
import { getPromocodesByUser, type Promocode } from "@/api/promocodes.ts";

const search = ref('');
const users = ref<User[]>([]);
const loading = ref(false);

const page = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const expanded = ref<number[]>([]);
const promosMap = ref<Record<number, Promocode[]>>({});
const loadingPromos = ref<Record<number, boolean>>({});

const headers = ref([
  { title: 'ID', key: 'idUser' },
  { title: 'Юзернейм', key: 'user' },
  { title: 'Имя', key: 'firstName' },
  { title: 'Фамилия', key: 'lastName' },
  { title: 'Email', key: 'email' },
]);

const promoHeaders = [
  { text: 'ID', value: 'id' },
  { text: 'Название', value: 'name' },
  { text: 'Описание', value: 'description' },
  { text: 'Кол-во', value: 'promoCount' },
  { text: 'Статус', value: 'status' },
  { text: 'Токен', value: 'tokenHash' },
  { text: 'Создано', value: 'createdAt' },
];

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
    console.error(e);
  } finally {
    loading.value = false;
  }
}

async function togglePromos(user: User) {
  if (expanded.value.includes(user.idUser)) {
    expanded.value = expanded.value.filter(id => id !== user.idUser);
    return;
  }
  expanded.value.push(user.idUser);

  if (!promosMap.value[user.idUser]) {
    loadingPromos.value[user.idUser] = true;
    try {
      const promos = await getPromocodesByUser(user.idUser, 18);
      promosMap.value[user.idUser] = promos;
    } catch (e) {
      console.error(e);
    } finally {
      loadingPromos.value[user.idUser] = false;
    }
  }
}

fetchUsers();
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
        show-expand
        :expanded.sync="expanded"
    >
      <!-- Кнопка раскрытия -->
      <template v-slot:item.data-table-expand="{ item }">
        <v-btn icon @click.stop="togglePromos(item)">
          <v-icon :icon="expanded.includes(item.idUser) ? mdiChevronUp : mdiChevronDown" />
        </v-btn>
      </template>

      <!-- Раскрытая таблица промокодов -->
      <template v-slot:expanded-item="{ item }">
        <v-card flat class="pa-2">
          <div v-if="loadingPromos[item.idUser]">Загрузка промокодов...</div>
          <v-data-table
              v-else
              :headers="promoHeaders"
              :items="promosMap[item.idUser]"
              dense
              hide-default-footer
          />
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>

</style>