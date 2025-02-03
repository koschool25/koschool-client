<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const userId = computed(() => sessionStorage.getItem('id'))

  const selectDifficulty = async (level) => {
    try {
      router.push({
        name: 'QuizForm',
        params: { level: level }
      })
    } catch (error) {
      console.error('Error navigating to quiz:', error)
    }
  }
  
  const goToHome = () => {
    router.push({ name: 'Home' })
  }
</script>

<template>
  <div class="quiz-container">
    <!-- 인사말 섹션 -->
    <div class="greeting">
      <span><span class="user-name">{{ userId }}</span>님, 오늘도 화이팅! 📚</span>
    </div>

    <!-- 난이도 선택 박스 -->
    <div class="difficulty-box">
      <h2>난이도 선택</h2>
      
      <div class="difficulty-options">
        <div class="difficulty-option beginner" @click="selectDifficulty(1)">
            <span class="emoji">👶🍼</span>
          <span>하수</span>
        </div>

        <div class="difficulty-option intermediate" @click="selectDifficulty(2)">
          <span class="emoji">👦✏️</span>
          <span>중수</span>
        </div>

        <div class="difficulty-option advanced" @click="selectDifficulty(3)">
          <span class="emoji">🧑‍💼🏆</span>
          <span>고수</span>
        </div>
      </div>
    </div>

    <!-- 홈으로 돌아가기 버튼 -->
    <button class="home-button" @click="goToHome">Home으로 돌아가기</button>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.greeting {
  font-size: 24px;
  margin-bottom: 30px;
}

.difficulty-box {
  background-color: #fff9c4;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.difficulty-box h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
}

.difficulty-options {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
}

.difficulty-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 25px 40px;
  border-radius: 12px;
  transition: all 0.3s ease;
  width: 150px;
  border: 3px solid;
}

.user-name {
  font-weight: bold;
  border-radius: 10px;
  margin: 0 10px;
  box-shadow: 0 2px 4px 1ch(0,0,0,0.1);
}

/* 하수 스타일 */
.beginner {
  border-color: #4CAF50;
  background-color: #E8F5E9;
}

.beginner:hover {
  background-color: #C8E6C9;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
}

/* 중수 스타일 */
.intermediate {
  border-color: #2196F3;
  background-color: #E3F2FD;
}

.intermediate:hover {
  background-color: #BBDEFB;
  box-shadow: 0 0 15px rgba(33, 150, 243, 0.3);
}

/* 고수 스타일 */
.advanced {
  border-color: #F44336;
  background-color: #FFEBEE;
}

.advanced:hover {
  background-color: #FFCDD2;
  box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
}

.emoji {
  font-size: 40px;
  margin-bottom: 15px;
}

.difficulty-option span:not(.emoji) {
  font-size: 18px;
  font-weight: bold;
}

.home-button {
  margin-top: 30px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-weight: bold;
}

.home-button:hover {
  background-color: #e78e3b;
  color:white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
</style>