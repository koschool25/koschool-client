<template>
    <div class="question-container">
      <h2 class="question-text">{{ currentQuestion.question }}</h2>
      <div class="options-grid">
        <button 
          v-for="(option, index) in shuffledOptions" 
          :key="index"
          class="option-button"
          @click="selectAnswer(option)"
        >
          {{ index + 1 }}. {{ option }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps(['currentQuestion'])
  const emit = defineEmits(['answer-selected'])
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  
  const shuffledOptions = computed(() => {
    if (!props.currentQuestion) return []
    return shuffleArray([
      props.currentQuestion.answer,
      props.currentQuestion.wrongAnswer1,
      props.currentQuestion.wrongAnswer2,
      props.currentQuestion.wrongAnswer3
    ])

  })
  
  const selectAnswer = (selectedAnswer) => {
    emit('answer-selected', selectedAnswer === props.currentQuestion.answer)
  }
  </script>
  
  <style scoped>
  .question-container {
    padding: 20px;
  }
  
  .question-text {
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #333;
  }
  
  .options-grid {
    display: grid;
    gap: 15px;
  }
  
  .option-button {
    padding: 15px 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    background-color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .option-button:hover {
    background-color: #f8f9fa;
    border-color: #666;
    transform: translateY(-2px);
  }
  </style>