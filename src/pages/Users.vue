<script setup lang="ts">
import { ref } from "vue";
import { mdiAccountGroup, mdiMagnify } from "@mdi/js";
import { getUsers, type UsersFormData, type User, type UsersResponse } from "@/api/users.ts";
import { getPromocodesByUser, type Promocode } from "@/api/promocodes.ts";

const search = ref('');
const users = ref<User[]>([]);
const loading = ref(false);

const page = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const promoModal = ref(false);
const selectedUser = ref<User | null>(null);
const userPromos = ref<Promocode[]>([]);
const loadingPromos = ref(false);

const headers = ref([
  { title: 'ID', value: 'idUser' },
  { title: 'Юзернейм', value: 'user' },
  { title: 'Имя', value: 'firstName' },
  { title: 'Фамилия', value: 'lastName' },
  { title: 'Email', value: 'email' },
  { title: 'Действия', value: 'action', sortable: false, align: 'end' },
]);

const promoHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Название', value: 'name' },
  { title: 'Значение', value: 'description' },
  { title: 'Тип', value: 'promoCount' },
  { title: 'Статус', value: 'status' },
  { title: 'Токен', value: 'tokenHash' },
  { title: 'Создано', value: 'createdAt' },
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

async function openPromosModal(user: User) {
  selectedUser.value = user;
  promoModal.value = true;
  loadingPromos.value = true;
  try {
    const promos = await getPromocodesByUser(user.idUser, 18);
    userPromos.value = promos;
  } catch (e) {
    console.error(e);
  } finally {
    loadingPromos.value = false;
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
    >
      <template v-slot:item.action="{ item }">
        <div class="action-cell">
          <v-btn small text color="primary" @click="openPromosModal(item)">
            Промокоды
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="promoModal" max-width="800px">
      <v-card>
        <v-card-title>
          Промокоды пользователя: {{ selectedUser?.user }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-if="loadingPromos">Загрузка промокодов...</div>
          <v-data-table
              v-else
              :headers="promoHeaders"
              :items="userPromos"
              dense
              hide-default-footer
          >
            <template v-slot:item.promoCount="{ item }">
              <span>
                {{ item.promoCount === 1 ? 'Рублей' : item.promoCount === 0 ? 'Процентов' : item.promoCount }}
              </span>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="promoModal = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.action-cell {
  display: flex;
  justify-content: flex-end;
}
</style>