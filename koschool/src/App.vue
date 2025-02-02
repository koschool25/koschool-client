<script setup>
import { ref } from "vue";
import apiClient from "@/api.js";

const userInput = ref("");
const responseText = ref("");

const sendRequest = async () => {
  try {
    const response = await apiClient.post("/chatgpt", {
      prompt: userInput.value,
    });
    responseText.value = response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="app-container">
    <h1>ChatGPT 연동</h1>
    <input v-model="userInput" placeholder="질문을 입력하세요" />
    <button @click="sendRequest">질문하기</button>
    <p>응답: {{ responseText }}</p>

    <nav>
      <router-link to="/">홈 </router-link>
      <router-link to="/about">소개</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  text-align: center;
  padding: 20px;
}

input {
  margin: 10px;
  padding: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>