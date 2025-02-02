<template>
    <div class="correct-container">
      <div class="result-header">
        <span class="emoji">✨</span>
        <h2>정답입니다!</h2>
      </div>
      
      <div class="answer-box">
        <p class="answer">{{ currentQuestion.answer }}</p>
      </div>
      
      <div class="explanation-box">
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
  .correct-container {
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
    background-color: #e8f5e9;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
  }
  
  .answer {
    font-size: 1.2rem;
    font-weight: bold;
    color: #2e7d32;
  }
  
  .explanation-box {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    text-align: left;
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