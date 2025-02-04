<script setup>
////////////////////end-point 수정 1 남음

import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/api.js"; // axios 인스턴스

const route = useRoute();
const router = useRouter();
const topic = ref({});
const loading = ref(false);

const props = defineProps({
	topicId:{
    	type: String,
        default : ""
    }
})

const fetchNewsById = async (topicId) => {
  loading.value = true;
  try {
    const response = await apiClient.get("/api/newsletter/detail", { 
      params: {
        newsletterId: topicId,
      },
    });

    let existingData = sessionStorage.getItem('newsLetter_id');
    if (existingData) {
      const topicArray = existingData.split(','); // 쉼표로 구분된 문자열을 배열로 변환
      if (!topicArray.includes(topicId)) {
        topicArray.push(topicId);
        sessionStorage.setItem('newsLetter_id', topicArray.join(',')); // 배열을 쉼표로 구분된 문자열로 저장
      }
    } else {
      sessionStorage.setItem('newsLetter_id', topicId); // 첫 번째 항목은 그대로 저장
    }

    topic.value = response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
    let existingData = sessionStorage.getItem('newsLetter_id');
    if (existingData) {
      const topicArray = existingData.split(',');
      if (!topicArray.includes(topicId)) {
        topicArray.push(topicId);
        sessionStorage.setItem('newsLetter_id', topicArray.join(','));
      }
    } else {
      sessionStorage.setItem('newsLetter_id', topicId);
    }
    topic.value = {title: '제목 예시', category: '소재', stock: '삼성전자', summary: '요약 예시', likes: '42', link: "https://naver.com"};

  } finally {
    loading.value = false;
  }
};

// "뒤로 가기" 버튼 클릭 시 이전 페이지로 이동
const goBack = () => {
    router.back();
};

onMounted(() => {
  if (props.topicId) fetchNewsById(props.topicId);
});
</script>

<template>
    <div class="container">
      <div style="text-align: left; font-size: 30px; font-weight: bold; color: black; font-style: italic;">
        AI 요약 
      </div>
      <!-- 카테고리 박스 -->
      <div class="category-box">
        산업군: {{ topic.category }}
      </div>

      <!-- 제목 -->
      <h1 class="title">{{ topic.title }}</h1>
      <hr class="divider" />

      <!-- AI 요약 -->
      <div class="content-box">
        <pre style="font-size: 18px;">{{ topic.summary }}</pre>
        <pre v-if ="loading" style="font-size: 18px;">로딩 중...</pre>
      </div>


      <!-- 좋아요 -->
      <div class="like-section">
        <span>❤️ {{ topic.likes }}</span>
        <span style="padding-left: 30px; font-weight: bold">관련 종목: {{ topic.stock }}</span>
      </div>
      <div style="text-align: right; margin-top: 50px;">
        <a class="link-button" :href="topic.link" target="_blank" rel="noopener noreferrer">원문 보기</a>
        <br>
        <button class="back-button" @click="goBack">뒤로 가기</button>
      </div>
    </div>
</template>

<style scoped>
.more-topics-container {
width: 70%;
margin: 20px auto;
padding: 20px;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
text-align: center;
transition: all 0.3s ease-in-out;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* 카테고리 박스 */
.category-box {
  background-color: #ec9d3d; /* 주황색 */
  color: black;
  font-weight: bold;
  padding: 8px 16px;
  display: inline-block;
  border-radius: 8px;
}

/* 제목 */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

/* 구분선 */
.divider {
  margin: 12px 0;
  border: none;
  height: 2px;
  background-color: #ddd;
}

/* AI 요약 박스 */
.content-box {
  background-color: #ffe5b4; /* 연한 주황색 */
  border: 1px solid #ffcc80;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

/* 좋아요 섹션 */
.like-section {
  margin-top: 12px;
  color: #666;
  font-size: 16px;
  text-align: left;
}

.title {
font-size: 1.5rem;
font-weight: bold;
margin-bottom: 15px;
}

.topic-list {
list-style: none;
padding: 0;
font-size: 1.2rem;
}

.topic-list li {
margin: 5px 0;
}

.loading-text {
font-size: 1.2rem;
font-weight: bold;
color: red;
}

.topic-header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.topic-summary h3 {
  font-size: 1.2rem;
  font-weight: bold;
}

.topic-footer p {
  font-size: 1rem;
  color: #ff6f61;
}

hr {
  margin: 20px 0;
  border: 1px solid #ddd;
}

.back-button {
margin-top: 15px;
padding: 10px 20px;
font-size: 1rem;
font-weight: bold;
background: #75a8db;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
}

.link-button {
margin-top: 15px;
padding: 10px 20px;
font-size: 1rem;
font-weight: bold;
background: #e69942;
color: black;
border: none;
border-radius: 5px;
cursor: pointer;
text-decoration: none;
}


.back-button:hover {
background: #0056b3;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
.more-topics-container {
    width: 90%;
}
}
</style>