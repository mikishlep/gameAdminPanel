<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mdiAccountGroup, mdiTrendingUp } from '@mdi/js';
import { getUsers } from '@/api/users.ts';

const stats = ref({
  totalUsers: 0
});

const loading = ref(true);

async function fetchStatistics() {
  loading.value = true;
  try {
    // Получаем общее количество пользователей
    const usersData = await getUsers({
      id_user: Number(localStorage.getItem("userId")),
      offset: 0,
      limit: 1000
    });
    
    stats.value.totalUsers = usersData.total;
    
  } catch (error) {
    console.error('Ошибка при загрузке статистики:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchStatistics();
});
</script>

<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Статистика</h1>

    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="4">
        <v-card class="stat-card" elevation="1">
          <v-card-text class="d-flex align-center">
            <div class="stat-icon-wrapper mr-4">
              <v-icon :icon="mdiAccountGroup" size="40" color="primary"></v-icon>
            </div>
            <div>
              <div class="text-h4 font-weight-bold">
                {{ loading ? '...' : stats.totalUsers }}
              </div>
              <div class="text-subtitle-1 text-medium-emphasis">
                Пользователей
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-4 pa-4" elevation="2">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        Аналитика
      </v-card-title>
      <v-card-text>
        <div class="text-center py-8">
          <v-icon :icon="mdiTrendingUp" size="64" color="grey-lighten-1"></v-icon>
          <div class="text-h6 mt-4 text-medium-emphasis">
            Здесь будут графики и детальная аналитика
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.stat-card {
  border-radius: 12px;
  height: 100%;
}

.stat-icon-wrapper {
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 64px;
}

.v-card-text {
  padding: 20px !important;
}

.text-h4 {
  line-height: 1.2;
}

.text-subtitle-1 {
  font-weight: 500;
  opacity: 0.8;
}
</style>