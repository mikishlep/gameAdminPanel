<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { login, type LoginFormData} from "@/api/auth.ts";
import { useUserStore } from "@/stores/user.ts";
import { RouteNames } from "@/router/index.ts";

const userStore = useUserStore();
const router = useRouter();

const formData = reactive<LoginFormData>({
  userName: "",
  passUser: "",
});

async function handleSubmit() {
  try {
    const res = await login(formData);

    if (res.userData && res.tokenUser) {
      console.log("Сохраняем токен и userId:", res.tokenUser.access_token, res.userData.idUser);
      userStore.login(
          res.userData.user,
          res.userData.firstName ?? "",
          res.userData.lastName ?? "",
          res.tokenUser.access_token,
          String(res.userData.idUser)
      );

      console.log("Вход успешен!");
      await router.push({ name: RouteNames.Dashboard });
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
        <v-text-field v-model="formData.userName" label="Логин" outlined dense />
        <v-text-field v-model="formData.passUser" label="Пароль" type="password" outlined dense />
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