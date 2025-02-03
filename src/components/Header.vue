<script setup>
  import { ref, onMounted } from 'vue'

  const userId = ref('')

  // 컴포넌트가 마운트될 때 localStorage에서 id 가져오기
  onMounted(() => {
    userId.value = sessionStorage.getItem('id')
  })

  const handleLogout = () => {
    sessionStorage.clear()  // 모든 item 삭제
    
    // 페이지 새로고침
    window.location.reload()
  }
</script>

<template>
    <header class="header">
      <!-- 로고 및 홈페이지명 -->
      <div class="logo-container">
        <img src="/images/icon_koschool.gif" alt="홈페이지 로고" class="logo" />
        <span class="site-name">KoSchool</span>
      </div>
  
      <!-- 네비게이션 메뉴 -->
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">HOME</router-link>
        <router-link to="/AitPageM" class="nav-item">AI TUTOR</router-link>
        <router-link to="/QuizPageM" class="nav-item">QUIZ</router-link>
        <router-link to="/CommunityM" class="nav-item">COMMUNITY</router-link>
      </nav>
  
      <!-- 사용자 정보 및 로그아웃 버튼 -->
      <div class="user-info">
        <button class="logout-btn" @click="handleLogout">로그아웃</button>
        <span class="user-name">{{ userId }}님</span>
      </div>
    </header>
  </template>
  
  <style scoped>
  /* 헤더 스타일 */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: white;
    color: black;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  /* 로고 및 홈페이지명 */
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 40px;
    margin-right: 10px;
  }
  
  .site-name {
    font-size: 20px;
    font-weight: bold;
  }
  
  /* 네비게이션 메뉴 */
  .nav-menu {
    display: flex;
    gap: 40px; /* 각 메뉴 간격 */
  }
  
  .nav-item {
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }
  
  .nav-item:hover {
    color: #007bff;
  }
  
  /* 사용자 정보 및 로그아웃 버튼 */
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .logout-btn {
    background-color: #f06969;
    color: white;
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .logout-btn:hover {
    background-color: #cc0000;
  }
  
  .user-name {
    font-size: 16px;
  }
  </style>