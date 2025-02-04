<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api.js'

const router = useRouter()
const id = ref('')
const password = ref('')
const user = ref({})

const handleLogin = async () => {
  try {
    const response = await apiClient.post('/api/member/login', {
        loginId: id.value,
        password: password.value
    })

    if (response.code === 200) {
        user.value = response.data.data
        sessionStorage.setItem('id', id.value)
        sessionStorage.setItem('category_topic', user.category_topic)

        router.push({ name: 'Home' })
    }
  } catch (error) {
    if (error.response) {
      alert('아이디 또는 비밀번호가 잘못되었습니다.')
    } else {
      alert('로그인 중 오류가 발생했습니다.')
    }
  }
}

const goToSignup = () => {
    router.push({ name: 'SignupPage' })
}
</script>

<template>
    <div class="login-container">
        <h2>KoSchool 로그인</h2>
        <div class="form-group">
            <input v-model="id" type="text" placeholder="아이디">
            <input v-model="password" type="password" placeholder="비밀번호">
        <div class="button-group">
            <button style="cursor: pointer;" @click="handleLogin">확인</button>
            <button style="cursor: pointer;" @click="goToSignup">회원가입</button>
        </div>
        </div>
    </div>
</template>
  
<style scoped>
.login-container {
max-width: 400px;
margin: 0 auto;
padding: 20px;
}

.form-group {
display: flex;
flex-direction: column;
gap: 10px;
}

input {
padding: 8px;
}

.button-group {
display: flex;
gap: 10px;
}
</style>