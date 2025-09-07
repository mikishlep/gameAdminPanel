<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { mdiGift, mdiMagnify } from "@mdi/js";
import { getPromocodesByUser, type Promocode } from "@/api/promocodes.ts";

const search = ref('');
const promocodes = ref<Promocode[]>([]);
const loading = ref(false);

const page = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

// заголовки таблицы
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Пользователь', key: 'userId' },
  { title: 'Название', key: 'name' },
  { title: 'Описание', key: 'description' },
  { title: 'Кол-во', key: 'promoCount' },
  { title: 'Статус', key: 'status' },
  { title: 'Токен', key: 'tokenHash' },
  { title: 'Создано', key: 'createdAt' },
]);

async function fetchPromocodes() {
  loading.value = true;
  try {
    const userId = Number(localStorage.getItem("userId"));
    const adminUserId = Number(localStorage.getItem("userId")); // или другой admin_id

    const allPromocodes = await getPromocodesByUser(userId, adminUserId);

    // пагинация на клиенте (если API не поддерживает)
    totalItems.value = allPromocodes.length;
    const start = (page.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    promocodes.value = allPromocodes.slice(start, end);

  } catch (e) {
    console.error("Ошибка при получении промокодов:", e);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPromocodes);
watch([page, itemsPerPage], fetchPromocodes);
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon :icon="mdiGift"></v-icon> &nbsp; Промокоды
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
        :items="promocodes"
        :search="search"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :server-items-length="totalItems"
        item-value="id"
        class="elevation-1"
        :loading="loading"
    />
  </v-card>
</template>

<style scoped>

</style>