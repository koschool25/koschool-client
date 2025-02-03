import { createRouter, createWebHistory } from "vue-router";
import AppView from "@/views/AppView.vue"; // 홈 페이지 컴포넌트


import CommunityM from "@/views/Community/CommunityM.vue"; // 커뮤니티 홈페이지

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 컴포넌트
import LoginPage from '@/views/Login/LoginPage.vue'
import SignupPage from '@/views/Login/SignupPage.vue'
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ뉴스레터컴포넌트
import MoreTopics from "@/views/NewsPage/MoreTopics.vue"; // 당일 + 이전 뉴스 대량 표출
import DetailTopics from "@/views/NewsPage/DetailTopics.vue"; // 요약 뉴스 표출


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡAI 튜터 컴포넌트
import AitPageM from "@/views/AitPage/AitPageM.vue"; // AI 튜터 홈페이지


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡQUIZ 컴포넌트
import QuizPageM from "@/views/QuizPage/QuizPageM.vue"; // 퀴즈 홈페이지
import QuizForm from '@/views/QuizPage/QuizForm.vue'    // 퀴즈 풀이 페이지
import QuizQuestion from '@/components/quiz/QuizQuestion.vue'
import QuizCorrect from '@/components/quiz/QuizCorrect.vue'
import QuizIncorrect from '@/components/quiz/QuizIncorrect.vue'
import QuizComplete from '@/components/quiz/QuizComplete.vue'


const routes = [
  { path: "/", name: 'Home', component: AppView, meta: { requiresAuth: true } },
  { path: "/LoginPage", name: 'LoginPage', component: LoginPage},
  { path: "/SignupPage", name: 'SignupPage', component: SignupPage},
  { path: "/AitPageM", component: AitPageM, meta: { requiresAuth: true } },
  
  
  { path: "/QuizPageM", component: QuizPageM, meta: { requiresAuth: true } },
  { path: '/QuizForm/:level', name: 'QuizForm',component: QuizForm, props: true, meta: { requiresAuth: true },
  children: [
    {
      path: 'QuizQuestion',
      name: 'QuizQuestion',
      component: QuizQuestion
    },
    {
      path: 'QuizCorrect',
      name: 'QuizCorrect',
      component: QuizCorrect
    },
    {
      path: 'QuizIncorrect',
      name: 'QuizIncorrect',
      component: QuizIncorrect
    },
    {
      path: 'QuizComplete',
      name: 'QuizComplete',
      component: QuizComplete
    }
    ]},

  { path: "/CommunityM", component: CommunityM, meta: { requiresAuth: true } },



  { path: "/MoreTopics", component: MoreTopics, meta: { requiresAuth: true } },
  { path: "/DetailTopics/:topicId", name: 'DetailTopics', component: DetailTopics, props: true, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(), // URL에 해시(#) 없이 깔끔한 주소 사용
  routes,
});

// 라우터 가드 설정
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('id') // localStorage에서 id 확인
  
  // 인증이 필요한 페이지인데 로그인이 안 되어 있으면
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'LoginPage' }) // 로그인 페이지로 리다이렉트
  }
  // 이미 로그인된 상태에서 로그인/회원가입 페이지 접근 시
  else if (isLoggedIn && (to.name === 'LoginPage' || to.name === 'SignupPage')) {
    next({ name: 'Home' }) // 홈으로 리다이렉트
  }
  else {
    next() // 그 외의 경우는 정상적으로 진행
  }
});

export default router;