<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import apiClient from "@/api.js";

const router = useRouter(); // 페이지 이동용 push(), replace(), back()

// 산업군 목록
const industries = ref(["에너지", "소재", "산업재", "자유소비재", "필수소비재", "헬스케어", "금융", "정보기술", "커뮤니케이션", "유틸리티", "부동산"]);

// 선택된 산업군 (기본값: "반도체")
const selectedIndustry = ref("에너지");

// 핫토픽 데이터
const topics = ref([]);
const allTopics = ref([]);
const loading = ref(false);
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// 산업군별 배경 이미지 경로
const industryBackgrounds = {
  "에너지": "/images/bg_energy.jpg",
  "소재": "/images/bg_material.jpg",
  "산업재": "/images/bg_industry.jpg",
  "자유소비재": "/images/bg_iconsume.jpg",
  "필수소비재": "/images/bg_pconsume.jpg",
  "헬스케어": "/images/bg_health.jpg",
  "금융": "/images/bg_finan.jpg",
  "정보기술": "/images/bg_it.jpg",
  "커뮤니케이션": "/images/bg_comm.jpg",
  "유틸리티": "/images/bg_util.jpg",
  "부동산": "/images/bg_property.jpg",
};

// 현재 선택된 산업군에 따른 배경 스타일
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${industryBackgrounds[selectedIndustry.value]})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

// 서버에서 핫토픽 데이터 가져오기
const fetchTopics = async () => {
  loading.value = true;
  try {
    
    const response = await apiClient.post("/some_endpoint", {
      industry: selectedIndustry.value,
      date: today,
    });
    allTopics.value = response.data;
    topics.value = response.data.slice(0, 3);
  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
    topics.value = [{newsletter_id: 404, title: "예시 제목입니다", content: "예시 내용입니다"}];
  } finally {
    loading.value = false;
  }
};

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 각 쿼리 어떻게 넘길 건지 의논
const goToMorePage = () => {
  router.push({
    path: "/MoreTopics",
    query: { industry: selectedIndustry.value },
  });
};

const goToDetailPage = (topicId) => {
  router.push({
    name: "DetailTopics",
    params: { topicId: topicId }, 
  });
};

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 초기 데이터 로드
onMounted(fetchTopics);
</script>

<template>
  <!-- 데일리 뉴스룸 -->
  <div class="hot-topic-container" :style="backgroundStyle">
    <!-- 제목 -->
    <h2 class="title">
      AI가 요약해주는
      <select v-model="selectedIndustry" @change="fetchTopics" class="industry-select">
        <option v-for="industry in industries" :key="industry" :value="industry">
          {{ industry }}
        </option>
      </select>
      오늘<span style="color: orange">"{{today}}"</span>의 핫토픽!
    </h2>

    <!-- 핫토픽 목록 -->
    <ul v-if="!loading" class="topic-list">
      <li v-for="(topic, index) in topics" :key="index" @click="goToDetailPage(topic.newsletter_id)" style="cursor: pointer;">
        {{ index + 1 }}. {{ topic.title }}
      </li>
    </ul>
    <p v-else class="loading-text">로딩 중...</p>

    <!-- 더 보기 -->
    <button class="refresh-button" @click="goToMorePage">더 보기...</button>
  </div>


  <div class="home">  
    <div class="box-container">
      <router-link to="/AitPageM" class="box">
        <div class="content">
          <span class="title">AI TUTOR</span>
        </div>
        <hr class="divider" />
        <div class="content">
          <img src="/images/ait.avif" alt="Stock Knowledge Icon" class="icon" />
          <span class="subtitle">주식 상식 알아보기</span>
        </div>
        <hr class="divider" />
    </router-link>
      <router-link to="/QuizPageM" class="box">
          <div class="content">
            <span class="title">QUIZ</span>
          </div>
          <hr class="divider" />
          <div class="content">
            <img src="/images/quiz.jpg" alt="Stock Knowledge Icon" class="icon" />
            <span class="subtitle">주식 퀴즈 풀어보기</span>
          </div>
          <hr class="divider" />
      </router-link>
    </div>
  </div>

    <router-link to="/CommunityM" class="community-title">커뮤니티</router-link>
  
</template>


<style scoped>

.hot-topic-container {
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease-in-out;
  color: white;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 이미지가 흐리게 보이도록 */
  background-blend-mode: darken;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.industry-select {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
  color: rgb(255, 255, 255);
}

.refresh-button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background: #ffffff;
  color: #333;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.refresh-button:hover {
  background: #b8b1b1;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .hot-topic-container {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.2rem;
  }
  .industry-select {
    font-size: 1rem;
  }
  .refresh-button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}







.home {
  text-align: center;
  margin-top: 50px;
}

.box-container {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 30px 0;
}

.box {
  background: #dbdfdb;
  color: black;
  padding: 20px;
  width: 20vw;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s;
}

.box:hover {
  background: #72d177;
}

.icon {
  width: 100%;
  height: 22vh;
  margin-bottom: 8px;
}


.community-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
}
</style>