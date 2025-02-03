<template>
    <div class="complete-container">
      <div class="result-header">
        <span class="emoji">🎊</span>
        <h2>퀴즈 완료!</h2>
      </div>
      
      <div class="score-box">
        <p>총 {{ totalQuestions }}문제 중</p>
        <p class="score">{{ correctAnswers }}문제 정답!</p>
      </div>
      
      <button class="home-button" @click="goHome">
        홈으로 돌아가기
      </button>
    
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const props = defineProps(['totalQuestions', 'correctAnswers', 'quizHistory'])
  
  const goHome = () => {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .complete-container {
    padding: 20px;
    text-align: center;
  }
  
  .result-header {
    margin-bottom: 30px;
  }
  
  .emoji {
    font-size: 48px;
    display: block;
    margin-bottom: 10px;
  }
  
  .score-box {
    background-color: #e3f2fd;
    padding: 30px;
    border-radius: 10px;
    margin: 20px 0;
  }
  
  .score {
    font-size: 2rem;
    font-weight: bold;
    color: #1976d2;
    margin-top: 10px;
  }
  
  .home-button {
    padding: 12px 24px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .retry-button {
    padding: 12px 24px;
    background-color: #e35350;
    margin-left: 10px;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

  .home-button:hover {
    background-color: #1976d2;
    transform: translateY(-2px);
  }
  </style>