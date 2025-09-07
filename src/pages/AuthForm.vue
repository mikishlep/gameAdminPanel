<script setup lang="ts">
import { ref, reactive } from "vue";
import { register, type RegisterFormData} from "@/api/auth.ts";
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore();

const formData = reactive<RegisterFormData>({
  userName: "",
  passUser: "",
  email: "",
  firstName: "",
  lastName: "",
});

async function handleSubmit() {
  try {
    const res = await register(formData);

    if (res.userData && res.tokenUser) {
      console.log("Сохраняем токен и userId:", res.tokenUser.access_token, res.userData.idUser);
      userStore.login(
          res.userData.user,
          res.userData.firstName ?? "",
          res.userData.lastName ?? "",
          res.tokenUser.access_token,
          String(res.userData.idUser)
      );

      console.log("Регистрация успешна!");
    } else {
      console.log("Ошибка: неожиданный ответ от сервера", res);
    }
  } catch (e) {
    console.error("Ошибка запроса: ", e);
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="400">
      <v-card-title class="text-h6">Вход в админку</v-card-title>
      <v-card-text>
        <v-text-field v-model="formData.userName" label="Имя пользователя" outlined dense />
        <v-text-field v-model="formData.passUser" label="Пароль" type="password" outlined dense />
        <v-text-field v-model="formData.firstName" label="Имя" outlined dense />
        <v-text-field v-model="formData.lastName" label="Фамилия" outlined dense />
        <v-text-field v-model="formData.email" label="Почта" outlined dense />
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