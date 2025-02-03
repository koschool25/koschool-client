<template>
  <div class="community-page">
    <h1>KoSchool 게시판</h1>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
        </div>
        <div class="post-details">
          <span class="post-author">작성자: {{ post.author }}</span>
          <span class="post-views">조회수: {{ post.views }}</span>
          <span class="post-likes">좋아요: {{ post.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 하드코딩된 게시물 데이터
const posts = ref([
{ id: 1, title: '삼성전자 주식 전망', author: '홍길동', views: 320, likes: 150 },
  { id: 2, title: '테슬라 주식 분석', author: '이몽룡', views: 295, likes: 120 },
  { id: 3, title: '주식 초보자를 위한 가이드', author: '성춘향', views: 450, likes: 200 },
  { id: 4, title: '2025년 주식 시장 예측', author: '임꺽정', views: 500, likes: 250 },
  { id: 5, title: '애플 주식의 미래', author: '박문수', views: 410, likes: 180 },
  { id: 6, title: '주식 투자 전략', author: '김철수', views: 380, likes: 170 },
  { id: 7, title: '비트코인과 주식 비교', author: '이영희', views: 360, likes: 160 },
  { id: 8, title: '주식 시장의 변동성 이해하기', author: '최지우', views: 340, likes: 140 },
  { id: 9, title: '배당주 투자 방법', author: '장보고', views: 330, likes: 130 },
  { id: 10, title: '주식 차트 분석 기초', author: '신사임당', views: 320, likes: 120 },
]);

const editPost = (id) => {
  alert(`게시물 ${id} 수정`);
  // 수정 로직 추가
};

const deletePost = (id) => {
  posts.value = posts.value.filter(post => post.id !== id);
};
</script>

<style scoped>
.community-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-item {
  padding: 15px;
  border: 1px solid #d1e7dd; /* 얇은 파란색 테두리 */
  border-radius: 8px;
  background-color: white; /* 흰색 배경 */
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-item:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 1.2em;
  color: #000000;
  margin: 0;
}

.post-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
}

.post-author,
.post-views,
.post-likes {
  margin-right: 10px;
}

.post-actions {
  display: flex;
  gap: 5px;
}

.post-actions button {
  padding: 5px 10px;
  font-size: 0.8em;
  color: white;
  background-color: #9ec5ee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-actions button:hover {
  background-color: #0056b3;
}
</style>