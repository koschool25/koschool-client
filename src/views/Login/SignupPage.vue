<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api.js'

const router = useRouter()
const id = ref('')
const password = ref('')
const passwordConfirm = ref('')
const category_topic = ref('')


const handleSignup = async () => {
if (password.value !== passwordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
}

try {
    const response = await apiClient.post('/api/member/join', {
      loginId: id.value,
      password: password.value,
      categoryTopic: category_topic.value
    })

    
    if (response.status === 201) {
    // sessionStorage에 정보 저장
        sessionStorage.setItem('id', id.value)
        sessionStorage.setItem('category_topic', category_topic.value)
        
        router.push({ name: 'Home' })
    } 
}catch (error) {
    if (error.response) {
      alert('회원가입 실패: ' + (error.response.data?.message || '알 수 없는 오류가 발생했습니다.'))
    } else {
      alert('회원가입 중 오류가 발생했습니다.')
    }
  }
}
</script>

<template>
    <div class="signup-container">
    <h2>KoSchool 회원가입</h2>
        <div class="form-group">
            <input v-model="id" type="text" placeholder="아이디">
            <input v-model="password" type="password" placeholder="비밀번호">
            <input v-model="passwordConfirm" type="password" placeholder="비밀번호 확인">
            <select v-model="category_topic" class="sector-select">
                <option value="" disabled selected>관심섹터를 선택하세요</option>
                <option value="에너지">에너지</option>
                <option value="소재">소재</option>
                <option value="산업재">산업재</option>
                <option value="자유소비재">자유소비재</option>
                <option value="필수소비재">필수소비재</option>
                <option value="헬스케어">헬스케어</option>
                <option value="금융">금융</option>
                <option value="정보기술">정보기술</option>
                <option value="커뮤니케이션">커뮤니케이션</option>
                <option value="유틸리티">유틸리티</option>
                <option value="부동산">부동산</option>
            </select>
            <button style="cursor: pointer;" @click="handleSignup">확인</button>
        </div>
    </div>
</template>
  
<style scoped>
.signup-container {
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

.sector-select {
  padding: 8px;
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.sector-select:focus {
  outline: none;
  border-color: #007bff;
}

/* 옵션 스타일링 */
.sector-select option {
  padding: 8px;
}

/* 첫 번째 disabled 옵션 스타일링 */
.sector-select option[disabled] {
  color: #999;
}

</style>