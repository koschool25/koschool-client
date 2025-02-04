<script setup>
import { ref, reactive, nextTick } from 'vue';
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

// 하드코딩된 AI 응답 배열
const hardcodedResponses = [
  'S&P 500 ETF는 미국의 주요 500대 기업에 분산 투자하는 것으로, 주식 시장의 전반적인 성과에 투자하는 방법 중 하나입니다. ETF는 \"상장지수펀드\"라고도 하며, 특정 지수의 변동을 추종하는 펀드입니다. \n\nS&P 500 ETF에 투자하면 다음과 같은 장점이 있습니다:\n1. **분산 투자**: 다양한 기업에 분산 투자하므로 개별 기업의 위험이 줄어듭니다.\n2. **시장 성과 추종**: 경제 전반의 성장에 따라 성과를 기대할 수 있습니다.\n3. **유동성**: 주식처럼 거래되어 언제든 사고팔 수 있습니다.\n\n하지만 시장 전반의 하락 시에도 영향을 받을 수 있으므로, 자신의 투자 목표와 위험 수용 능력을 고려하는 것이 중요합니다. 투자에 대한 생각이 있으신가요? \n\n더 많은 ETF 정보는 ETF CHECK(https://www.etfcheck.co.kr/)를 확인하세요.',
  '유상증자란 회사가 추가로 주식을 발행하여 자본금을 늘리는 것을 말합니다. 이는 회사가 외부로부터 새로운 자금을 조달하기 위함인데, 주로 사업 확장이나 부채 상환 등에 사용합니다. 새로운 주식을 발행하면 기존 주주들의 지분이 희석될 수 있지만, 회사가 자금을 잘 활용하면 장기적으로는 기업의 가치를 증가시키기도 합니다.\n\n혹시 \"주주\"라는 용어를 아시나요?',
  'AI TUTOR 사용 한도를 초과하였습니다.',
  'AI TUTOR 사용 한도를 초과하였습니다.',
  'AI TUTOR 사용 한도를 초과하였습니다.',
  'AI TUTOR 사용 한도를 초과하였습니다.',
  'AI TUTOR 사용 한도를 초과하였습니다.',
  'AI TUTOR 사용 한도를 초과하였습니다.'
];
let responseIndex = 0;

const sendMessage = async () => {
  if (!userInput.value.trim() || isSending.value) return;

  isSending.value = true;
  currentChat.messages.push({
    id: Date.now(),
    role: 'user',
    content: userInput.value,
    sessionId: sessionId
  });

  // 하드코딩된 AI 응답과 로딩 시간 추가
  setTimeout(() => {
    const responseContent = hardcodedResponses[responseIndex] || '기본 AI 응답입니다.';
    currentChat.messages.push({
      id: Date.now(),
      role: 'assistant',
      content: responseContent
    });

    // 다음 응답으로 인덱스 증가
    responseIndex = (responseIndex + 1) % hardcodedResponses.length;

    if (currentChat.messages.length >= 2) {
      chatHistory.value.unshift({
        id: Date.now(),
        title: userInput.value.substring(0, 30) + '...',
        messages: [...currentChat.messages]
      });
    }

    userInput.value = '';
    isSending.value = false;
    nextTick().then(scrollToBottom);
  }, 3000); // 3초의 로딩 시간
  isSending.value = false;
};

const loadChat = async (chat) => {
  if (currentChat.sessionId !== chat.sessionId) {
    try {
      const response = await apiClient.get(`/end-point/${chat.sessionId}`); // 업데이트 예정
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
  height: 80vh;
  width: 80%;
  justify-content: center;
  margin-left: 10%;
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
  font-weight: bold;
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