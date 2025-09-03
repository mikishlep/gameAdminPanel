<script setup lang="ts">
import { auth } from "@/api";
import { register, type RegisterFormData} from "@/api/auth.ts";

async function handleSubmit(formData: RegisterFormData) {
  try {
    const response = await register(formData);

    if (response.success) {
      console.log("Регистрация успешна!");
    } else {
      console.log("Ошибка регистрации:", response.message);
    }
  } catch (error) {
    console.error("Ошибка запроса: ", error);
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
  <div class="wrapper">
    <div class="registration-panel">

    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}

.registration-panel {
  width: 300px;
  height: 200px;
  background-color: red;
}
</style>