<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import apiClient from "@/api.js";
import { v4 as uuidv4 } from 'uuid';

// 세션 ID를 sessionStorage에서 가져오거나 생성
const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
sessionStorage.setItem('sessionId', sessionId);

const chatHistory = ref([]);
const currentChat = reactive({
  sessionId: sessionStorage.getItem('sessionId'),
  messages: []
});

const userInput = ref('');
const isSending = ref(false);

// 페이지 로드 시 유저별별 대화 기록 불러오기
onMounted(async () => {
  try {
    const userId = sessionStorage.getItem('id'); // 사용자 ID 가져오기
    if (!userId) {
      console.error('사용자 ID가 없습니다.');
      return;
    }

    // 사용자 ID에 대한 모든 질문 데이터를 불러오기
    const response = await apiClient.get(`/end-point/${userId}`);
    if (response.data && response.data.length > 0) {
      chatHistory.value = response.data;
    }
  } catch (error) {
    console.error('대화 기록 불러오기 실패:', error);
  }
});

const sendMessage = async () => {
  if (!userInput.value.trim() || isSending.value) return;

  isSending.value = true;
  currentChat.messages.push({
    id: Date.now(),
    role: 'user',
    content: userInput.value,
    sessionId: sessionId
  });

  try {
    const response = await apiClient.post('/end-point', {
      userId: sessionStorage.getItem('id'), // 유저 ID
      sessionId: sessionId,
      message: userInput.value
    });

    currentChat.messages.push({
      id: Date.now(),
      role: 'assistant',
      content: response.data.message  ///////////////////////////////////// key에 따라 수정정
    });
  } catch (error) {
    currentChat.messages.push({
      id: Date.now(),
      role: 'assistant',
      content: '메시지 전송 실패'
    });
  } finally {
    if (currentChat.messages.length >= 2) {
      chatHistory.value.unshift({
        id: Date.now(),
        title: userInput.value.substring(0, 30) + '...',
        messages: [...currentChat.messages]
      });
    }

    userInput.value = '';
    isSending.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const loadChat = async (chat) => {
  if (currentChat.sessionId !== chat.sessionId) {
    try {
      const response = await apiClient.get(`/api/chats/${chat.sessionId}`);
      currentChat.sessionId = chat.sessionId;
      currentChat.messages = response.data.messages;
      await nextTick();
      scrollToBottom();
    } catch (error) {
      console.error('세션 데이터 불러오기 실패:', error);
    }
  } else {
    // 같은 세션이면 해당 질문의 위치로 스크롤 이동
    const messageIndex = currentChat.messages.findIndex(
      (message) => message.id === chat.messages[0].id
    );
    if (messageIndex !== -1) {
      await nextTick();
      scrollToMessage(messageIndex);
    }
  }
};

const scrollToBottom = () => {
  const container = document.querySelector('.chat-messages');
  container.scrollTop = container.scrollHeight;
};

const scrollToMessage = (index) => {
  const container = document.querySelector('.chat-messages');
  const messageElements = container.querySelectorAll('.message');
  if (messageElements[index]) {
    const messageElement = messageElements[index];
    const offset = container.clientHeight / 2 - messageElement.clientHeight / 2;
    container.scrollTop = messageElement.offsetTop - offset;
  }
};
</script>

<template>
  <div class="chat-container">
    <!-- 사이드바 -->
    <div class="chat-sidebar">
      <h3>대화 기록</h3>
      <div v-for="(chat, index) in chatHistory" 
           :key="index">
        <div @click="loadChat(chat)" class="chat-history-item">
          {{ chat.title || chat.messages[0].content.substring(0, 30) + '...' }}
        </div>
        <hr v-if="index < chatHistory.length - 1 && chatHistory[index].sessionId !== chatHistory[index + 1].sessionId" />
      </div>
    </div>
    

    <!-- 메인 채팅 영역 -->
    <div class="chat-main">
      <!-- 메시지 표시 영역 -->
      <div class="chat-messages" ref="messageContainer">
        <div v-for="(message) in currentChat.messages" 
             :key="message.id" 
             :class="['message', message.role]">
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>

      <!-- 입력 영역 -->
      <div class="chat-input">
        <textarea 
          v-model="userInput"
          @keyup.enter.exact="!isSending && sendMessage()"
          placeholder="메시지를 입력하세요..."
          :disabled="isSending"
        ></textarea>
        <button @click="sendMessage" :disabled="isSending">전송</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chat-container {
  display: flex;
  height: 100vh;
  }

  .chat-sidebar {
  width: 250px;
  border-right: 1px solid #ddd;
  padding: 1rem;
  overflow-y: auto;
  }

  .chat-history-item {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  }

  .chat-history-item:hover {
  background-color: #f5f5f5;
  }

  .chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  }

  .chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  }

  .message {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  }

  .message.user {
  background-color: #e3f2fd;
  margin-left: 20%;
  }

  .message.assistant {
  background-color: #f5f5f5;
  margin-right: 20%;
  }

  .chat-input {
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  }

  .chat-input textarea {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  height: 60px;
  }

  .chat-input button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }

  .chat-input button:hover {
  background-color: #0056b3;
  }
</style>