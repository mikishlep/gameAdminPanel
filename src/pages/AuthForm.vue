<script setup lang="ts">
import { register, type RegisterFormData} from "@/api/auth.ts";

async function handleSubmit(formData: RegisterFormData): Promise<void> {
  try {
    const res = await register(formData);

    if (res.success) {
      console.log("Регистрация успешна!");
    } else {
      console.log("Ошибка регистрации:", res.message);
    }
  } catch (e) {
    console.error("Ошибка запроса: ", e);
  }
}

const formData: RegisterFormData = {
  userName: "mikishlepLegenda",
  passUser: "Boiler34!",
  email: "ceylongleb@gmail.com",
  firstName: "Глеб",
  lastName: "Цейлонский",
};

handleSubmit(formData);
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="400">
      <v-card-title class="text-h6">Вход в админку</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="formData.userName"
            label="Имя пользователя"
            prepend-inner-icon="mdi-account"
            outlined
            dense
        />
        <v-text-field
            v-model="formData.password"
            label="Пароль"
            prepend-inner-icon="mdi-lock"
            type="password"
            outlined
            dense
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleSubmit">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>