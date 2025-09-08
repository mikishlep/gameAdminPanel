<script setup lang="ts">
import { ref } from 'vue';
import { mdiViewDashboard, mdiAccountGroup } from '@mdi/js';

const drawer = ref(true);
</script>

<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold">Главпанель</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item to="/" title="Статистика" :prepend-icon="mdiViewDashboard" />
        <v-list-item to="/users" title="Пользователи" :prepend-icon="mdiAccountGroup" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>

</style>