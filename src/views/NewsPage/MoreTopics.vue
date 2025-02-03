<script setup>

import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiClient from "@/api.js"; // axios 인스턴스

const route = useRoute();
const router = useRouter();

// URL에서 industry 값 가져오기
const industry = ref(route.query.industry);

// 핫토픽 데이터
const allTopics = ref([]);
const loading = ref(false);
const today = new Date().toISOString().split("T")[0];
const currentPage = ref(1);
const itemsPerPage = 7;

// 핫토픽 데이터 가져오기
const fetchTopics = async () => {
loading.value = true;
try {
    const response = await apiClient.post("/end-point", {
    industry: industry.value,
    });

    allTopics.value = response.data;
} catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
    allTopics.value = [ { newsletter_id: 101, category: "에너지(예시)",date: "2025-02-02", title: "오늘의 뉴스 1", content: "변호인단은 문 권한대행에 대해 “에스엔에스(SNS)에서 교류관계에 있는 정치인들은 이재명 대표를 포함해 대부분 민주당 인사들”이라면서 “심지어 그는 수많은 음모론과 가짜뉴스를 양산한 유튜버까지 팔로우한 것으로 드러났다”고 주장했다. 변호인단이 지목한 유튜버는 ‘김어준 저장소’다." },
                        { newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" }, 
                        { newsletter_id: 203, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 204, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 205, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 206, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 207, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 208, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 209, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 210, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 211, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 212, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 213, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 261, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 222, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 202, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" },{ newsletter_id: 245, category: "소재(예시)",date: "2025-01-31", title: "어제의 뉴스 2", content: "뉴스 내용 2" }];
} finally {
    loading.value = false;
}
};

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ데이터 구조 파악
// 오늘 뉴스레터 필터링
const dailyTopics = computed(() =>
  allTopics.value.filter((item) => item.date === today)
);

// 이전 뉴스레터 필터링 (오늘보다 이전 날짜)
const preTopics = computed(() => {
  return allTopics.value.filter((item) => item.date < today);
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 페이지네이션을 위한 데이터
const paginatedNewsletter = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return preTopics.value.slice(start, start + itemsPerPage);
});

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(preTopics.value.length / itemsPerPage);
});

// 페이지 변경 함수
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};


const goToDetailPage = (topicId) => {
    router.push({
        name: "DetailTopics",
        params: { topicId: topicId}, 
  });
};


// "뒤로 가기" 버튼 클릭 시 이전 페이지로 이동
const goBack = () => {
    router.back();
};

// 데이터 로드
onMounted(fetchTopics);
</script>

<template>
    <div class="container">
        <!-- 핫테마 제목 -->
        <div class="hot-topic">
            <span class="industry-box">{{ industry }}</span> 관련 전체 핫토픽
        </div>

        <hr />

        <!-- 데일리 랭킹 -->
        <div class="ranking">
            <h3>데일리 랭킹 "{{ today }}"</h3>
            <ul v-if="dailyTopics.length">
                <li v-for="(topic, index) in dailyTopics" :key="topic.newsletter_id" @click ='goToDetailPage(topic.newsletter_id)'>
                {{ index + 1 }}. {{ topic.title }}
                </li>
            </ul>
            <p v-else>오늘의 데이터가 없습니다.</p>
        </div>

        <hr />

        <!-- 이전 뉴스레터 -->
        <div class="newsletter">
            <h3>이전 뉴스레터</h3>
            <ul>
                <li v-for="(topic, index) in paginatedNewsletter" :key="index" @click ='goToDetailPage(topic.newsletter_id)'>
                {{ topic.date }} - {{ topic.title }}
                </li>
            </ul>

            <!-- 페이지네이션 -->
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">◀ 이전</button>
                <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">다음 ▶</button>
            </div>
        </div>
    </div>
    <button class="back-button" @click="goBack">뒤로 가기</button>
</template>

<style scoped>

.container {
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 10px;
}

.hot-topic {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.industry-box {
  background-color: #f6bb6e;
  color: black;
  padding: 5px 10px;
  border-radius: 20px;
}

h3 {
  margin: 10px 0;
  font-size: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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