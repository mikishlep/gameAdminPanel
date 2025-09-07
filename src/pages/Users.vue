<script setup lang="ts">
import { ref } from "vue";
import { mdiAccountGroup, mdiMagnify } from "@mdi/js";
import { getUsers, type UsersFormData, type User, type UsersResponse } from "@/api/users.ts";
import { getPromocodesByUser, usePromocode, type Promocode, type UsePromocodeData } from "@/api/promocodes.ts";

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

// Promocode usage functionality
const promocodeToken = ref('');
const usingPromocode = ref(false);
const promocodeError = ref('');
const promocodeSuccess = ref('');

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
  { title: 'Действия', value: 'action', sortable: false, align: 'end' },
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
  // Reset promocode form
  promocodeToken.value = '';
  promocodeError.value = '';
  promocodeSuccess.value = '';
  try {
    const promos = await getPromocodesByUser(user.idUser, 18);
    userPromos.value = promos;
  } catch (e) {
    console.error(e);
  } finally {
    loadingPromos.value = false;
  }
}

async function handleUsePromocode(promo: Promocode) {
  usingPromocode.value = true;
  promocodeError.value = '';
  promocodeSuccess.value = '';

  try {
    const useData: UsePromocodeData = {
      token: promo.tokenHash,
      user_id: selectedUser.value?.idUser,
      user_admin_id: 18
    };

    const result = await usePromocode(useData);
    promocodeSuccess.value = `Промокод успешно использован: ${result.name} (${result.description})`;
    
    // Refresh promocodes list
    const promos = await getPromocodesByUser(selectedUser.value?.idUser, 18);
    userPromos.value = promos;
  } catch (e) {
    console.error(e);
    promocodeError.value = 'Ошибка при использовании промокода. Проверьте токен и попробуйте снова.';
  } finally {
    usingPromocode.value = false;
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

    <v-dialog v-model="promoModal" max-width="1200px">
      <v-card>
        <v-card-title>
          Промокоды пользователя: {{ selectedUser?.user }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-if="loadingPromos">Загрузка промокодов...</div>
          <div v-else>
            <v-data-table
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
              <template v-slot:item.action="{ item }">
                <div class="action-cell">
                  <v-btn 
                    small 
                    text 
                    color="primary" 
                    @click="handleUsePromocode(item)"
                    :loading="usingPromocode"
                    :disabled="usingPromocode"
                  >
                    Применить
                  </v-btn>
                </div>
              </template>
            </v-data-table>
            
            <div v-if="promocodeError" class="text-error mt-3">
              {{ promocodeError }}
            </div>
            <div v-if="promocodeSuccess" class="text-success mt-3">
              {{ promocodeSuccess }}
            </div>
          </div>
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