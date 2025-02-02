<template>
    <div class="incorrect-container">
      <div class="result-header">
        <span class="emoji">😢</span>
        <h2>틀렸습니다</h2>
      </div>
      
      <div class="answer-box">
        <h3>정답</h3>
        <p class="answer">{{ currentQuestion.answer }}</p>
      </div>
      
      <div class="explanation-box">
        <h3>설명</h3>
        <p>{{ currentQuestion.explanation }}</p>
      </div>
      
      <button class="next-button" @click="$emit('next-question')">
        다음 문제 →
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['currentQuestion'])
  defineEmits(['next-question'])
  </script>
  
  <style scoped>
  .incorrect-container {
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
  
  .answer-box {
    background-color: #ffebee;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
  }
  
  .answer {
    font-size: 1.2rem;
    font-weight: bold;
    color: #c62828;
  }
  
  .explanation-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    text-align: left;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .next-button {
    padding: 12px 24px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .next-button:hover {
    background-color: #45a049;
    transform: translateX(5px);
  }
  </style>