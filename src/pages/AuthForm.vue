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