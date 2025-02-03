<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api.js'

const router = useRouter()
const questions = ref([])
const currentQuestionIndex = ref(0)
const currentQuestion = ref(null)
const correctAnswers = ref(0) // 맞춘 문제 수수
const quizHistory = ref([])// 틀린 문제 고유 id 배열

// 임시 데이터
const dummyQuestions = [
  {
    quiz_id: 1,
    level: 1,
    question: "주식시장에서 'KOSPI'는 무엇의 약자인가요?",
    answer: "Korea Composite Stock Price Index",
    explanation: "KOSPI는 한국종합주가지수(Korea Composite Stock Price Index)의 약자로, 한국 주식시장의 전체적인 동향을 보여주는 대표적인 지표입니다.",
    wrong_answer1: "Korean Stock Price Information",
    wrong_answer2: "Korea Stock Price Index",
    wrong_answer3: "Korean Securities Price Index"
  },
  {
    quiz_id: 2,
    level: 1,
    question: "주식투자에서 '배당'이란 무엇인가요?",
    answer: "기업이 주주에게 이익을 분배하는 것",
    explanation: "배당은 기업이 얻은 이익의 일부를 주주들에게 현금이나 주식의 형태로 나눠주는 것을 의미합니다.",
    wrong_answer1: "주식을 매도할 때 얻는 수익",
    wrong_answer2: "기업이 은행에서 대출받는 것",
    wrong_answer3: "주가가 상승하는 것"
  },
  {
    quiz_id: 3,
    level: 1,
    question: "PER(주가수익비율)이 의미하는 것은?",
    answer: "주가를 주당순이익으로 나눈 값",
    explanation: "PER은 주가를 주당순이익으로 나눈 값으로, 기업의 수익 대비 주가의 수준을 평가하는 대표적인 투자지표입니다.",
    wrong_answer1: "기업의 연간 수익률",
    wrong_answer2: "주식의 거래량",
    wrong_answer3: "기업의 부채비율"
  },
  {
    quiz_id: 4,
    level: 1,
    question: "블루칩 주식의 특징은?",
    answer: "대형 우량기업의 안정적인 주식",
    explanation: "블루칩은 시가총액이 크고 재무구조가 탄탄하며 오랜 기간 안정적인 실적을 보여준 기업의 주식을 의미합니다.",
    wrong_answer1: "변동성이 매우 큰 주식",
    wrong_answer2: "신생 기업의 주식",
    wrong_answer3: "거래량이 적은 주식"
  },
  {
    quiz_id: 5,
    level: 1,
    question: "시가총액이란?",
    answer: "발행주식 수 × 주가",
    explanation: "시가총액은 한 기업의 전체 주식 수에 현재 주가를 곱한 값으로, 기업의 전체 가치를 나타내는 지표입니다.",
    wrong_answer1: "하루 동안의 총 거래금액",
    wrong_answer2: "기업의 연간 매출액",
    wrong_answer3: "주당 순이익"
  },
  {
    quiz_id: 6,
    level: 1,
    question: "ROE는 무엇을 나타내는 지표인가요?",
    answer: "자기자본이익률",
    explanation: "ROE(Return On Equity)는 기업이 자기자본을 얼마나 효율적으로 이익으로 전환하는지를 보여주는 지표입니다.",
    wrong_answer1: "부채비율",
    wrong_answer2: "매출이익률",
    wrong_answer3: "자산회전율"
  },
  {
    quiz_id: 7,
    level: 1,
    question: "주식시장에서 '스톱로스(Stop Loss)'란?",
    answer: "손실을 제한하기 위해 미리 정한 가격에 매도하는 전략",
    explanation: "스톱로스는 투자 손실을 제한하기 위해 주가가 특정 수준 이하로 떨어지면 자동으로 매도하는 투자 전략입니다.",
    wrong_answer1: "이익을 확정하기 위해 매수하는 전략",
    wrong_answer2: "주가가 상승할 때 매도하는 전략",
    wrong_answer3: "배당금을 받기 위한 전략"
  },
  {
    quiz_id: 8,
    level: 1,
    question: "ETF는 무엇의 약자인가요?",
    answer: "상장지수펀드(Exchange Traded Fund)",
    explanation: "ETF는 특정 지수의 움직임을 추종하도록 설계된 펀드로, 주식처럼 거래소에서 자유롭게 거래할 수 있습니다.",
    wrong_answer1: "전자거래기금",
    wrong_answer2: "주식거래기금",
    wrong_answer3: "기업투자펀드"
  },
  {
    quiz_id: 9,
    level: 1,
    question: "주식시장에서 '거래량'이 의미하는 것은?",
    answer: "하루 동안 거래된 주식의 총 수량",
    explanation: "거래량은 특정 기간(보통 하루) 동안 해당 주식이 얼마나 활발하게 거래되었는지를 보여주는 지표입니다.",
    wrong_answer1: "주가의 등락폭",
    wrong_answer2: "시가총액의 변화량",
    wrong_answer3: "외국인 매매 수량"
  },
  {
    quiz_id: 10,
    level: 1,
    question: "주식시장에서 '공매도'란 무엇인가요?",
    answer: "주식을 빌려서 매도한 후 나중에 되갚는 거래",
    explanation: "공매도는 주식을 보유하지 않은 상태에서 주식을 빌려 매도한 후, 주가가 하락하면 싼 가격에 다시 매입하여 차익을 얻는 투자 전략입니다.",
    wrong_answer1: "주식을 장기 보유하는 전략",
    wrong_answer2: "주식을 매수한 후 즉시 매도하는 전략",
    wrong_answer3: "배당금을 받기 위한 전략"
  },
]


const props = defineProps({
  level: {
    type: String,
    required: true
  }
})

const fetchQuestions = async () => {
  try {
    const requestData = {
      level: parseInt(props.level)
    };

    // level이 3일 경우, 세션에서 뉴스_id를 추가
    if (parseInt(props.level) === 3) {
      const newsId = sessionStorage.getItem('newsLetter_id');
      if (newsId) {
        requestData.newsLetter_id = newsId;
      }
    }

    const response = await apiClient.post('end-point', requestData);
    questions.value = response.data;

  } catch (error) {
    console.error('Error fetching questions:', error)
    // 서버에서 데이터를 가져오지 못할 경우 더미 데이터 사용
    questions.value = dummyQuestions
  }finally {
    // 데이터 설정 후 첫 문제 설정 및 라우팅
    currentQuestion.value = questions.value[0]
    router.push({ 
      name: 'QuizQuestion',
      params: { level: props.level }
    })
  }
}

// 답변 처리
const handleAnswer = (isCorrect) => {
  if (isCorrect) {
    correctAnswers.value++
    router.push({ 
      name: 'QuizCorrect',  
      params: { level: props.level }
    })
  } else {
    quizHistory.value.push(currentQuestion.value.quiz_id)
    router.push({ 
      name: 'QuizIncorrect', 
      params: { level: props.level }
    })
  }
}
const goToNextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    currentQuestion.value = questions.value[currentQuestionIndex.value]
    router.push({ 
      name: 'QuizQuestion',
      params: { level: props.level }
    })
  } else {
    router.push({ 
      name: 'QuizComplete',
      params: { level: props.level }
    })
  }
}


// 퀴즈 종료
const quitQuiz = () => {
  router.push({ name: 'Home' })
}

onMounted(() => {
  if(correctAnswers.value === 0){
    fetchQuestions()
  }
})
</script>


<template>
    <div class="quiz-container">
      <!-- 상단 네비게이션 -->
      <div class="quiz-header">
        <button class="quit-button" @click="quitQuiz">그만 풀래요</button>
      </div>
  
      <!-- 메인 콘텐츠 영역 -->
      <div class="quiz-content">
        <router-view 
          :current-question="currentQuestion"
          :total-questions="questions.length"
          :correct-answers="correctAnswers"
          :quiz-history="quizHistory"
          @answer-selected="handleAnswer"
          @next-question="goToNextQuestion"
        ></router-view>
      </div>
  
      <!-- 진행 상황 표시 -->
      <div class="quiz-progress" v-if="currentQuestion">
        {{ currentQuestionIndex + 1 }} / {{ questions.length }}
      </div>
    </div>
  </template>
  
  <style scoped>
  .quiz-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
  }
  
  .quiz-header {
    margin-bottom: 20px;
  }
  
  .quit-button {
    padding: 10px 20px;
    background-color: white;
    border: 2px solid #ff6b6b;
    color: #ff6b6b;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .quit-button:hover {
    background-color: #ff6b6b;
    color: white;
  }
  
  .quiz-content {
    flex: 1;
    border: 2px solid #ff9f43;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    min-height: 400px;
  }
  
  .quiz-progress {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  </style>