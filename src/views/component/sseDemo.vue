<template>
  <div class="w-full h-full flex flex-col p-5 box-border overflow-hidden">
    <div class="flex justify-between items-center mb-5">
      <h2 class="m-0 text-[20px] font-semibold">SSE 实时消息推送演示</h2>
      <div class="flex items-center">
        <span>连接状态：</span>
        <n-tag
          :type="connectionStatus === 'connecting' ? 'warning' : connectionStatus === 'connected' ? 'success' : 'error'"
        >
          {{ connectionStatus === 'connecting' ? '连接中' : connectionStatus === 'connected' ? '已连接' : '已断开' }}
        </n-tag>
        <n-button
          type="primary"
          size="small"
          :disabled="connectionStatus === 'connecting'"
          @click="toggleConnection"
          class="ml-2.5"
        >
          {{ connectionStatus === 'connected' ? '断开连接' : '建立连接' }}
        </n-button>
      </div>
    </div>

    <div class="flex flex-1 gap-5 overflow-hidden">
      <!-- 左侧：发送消息区域和系统消息区域 -->
      <div class="flex-1 flex flex-col gap-5 min-w-[300px] overflow-hidden">
        <!-- 发送消息区域 -->
        <div class="flex flex-col gap-4 p-5 rounded-lg border border-gray-200 bg-gray-50 flex-shrink-0">
          <h3 class="m-0 text-[16px] font-semibold text-gray-800">发送消息</h3>
          <div class="flex flex-col gap-2.5">
            <n-select
              v-model:value="selectedEvent"
              :options="availableEvents.map(event => ({ label: event || '默认事件', value: event }))"
              placeholder="选择事件类型"
              size="large"
              class="w-full mb-2.5"
            />
            <n-input
              v-model:value="inputMessage"
              type="textarea"
              placeholder="请输入消息内容"
              :rows="6"
              :disabled="connectionStatus !== 'connected'"
              class="w-full mb-2.5"
            />
          </div>
          <n-button
            type="primary"
            size="large"
            :disabled="!inputMessage.trim() || connectionStatus !== 'connected'"
            @click="sendMessage"
            block
          >
            发送消息
          </n-button>
        </div>
        
        <!-- 系统消息区域 -->
        <div class="flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex-1">
          <h3 class="m-0 p-3 text-[16px] font-semibold text-gray-800 bg-gray-100 border-b border-gray-200">系统消息</h3>
          <div class="flex-1 overflow-y-auto p-3 box-border message-scroll-container" style="min-height: 100px;">
            <n-list bordered>
              <n-list-item v-if="messages.filter(m => m.sender === '系统').length === 0" class="flex justify-center items-center py-[100px]">
                <n-empty description="暂无系统消息" />
              </n-list-item>
              <n-list-item v-for="(message, index) in messages.filter(m => m.sender === '系统')" :key="index" class="mb-2.5 rounded transition-colors hover:bg-gray-100 bg-yellow-50">
                <template #prefix>
                  <n-avatar :size="32" :src="getAvatarUrl(message)" />
                </template>
                <template #suffix>
                  <span class="text-[12px] text-gray-500">{{ message.timestamp }}</span>
                </template>
                <div class="flex-1">
                  <div class="font-semibold mb-1 text-[14px]">{{ message.sender }}</div>
                  <div class="word-break-all text-[14px] leading-[1.5] text-gray-600">{{ message.content }}</div>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </div>
      </div>

      <!-- 右侧：消息列表区域 -->
      <div class="flex-2 flex flex-col gap-5 min-w-[400px] overflow-hidden">
        <!-- 我的消息列表 -->
        <div class="flex flex-col rounded-lg border border-gray-200 overflow-hidden box-border flex-1">
          <h3 class="m-0 p-3 text-[16px] font-semibold text-gray-800 bg-gray-50 border-b border-gray-200">我的消息</h3>
          <div class="flex-1 overflow-y-auto p-3 box-border">
            <n-list bordered>
              <n-list-item v-if="messages.filter(m => m.sender === '我').length === 0" class="flex justify-center items-center py-[100px]">
                <n-empty description="暂无消息" />
              </n-list-item>
              <n-list-item v-for="(message, index) in messages.filter(m => m.sender === '我')" :key="index" class="mb-2.5 rounded transition-colors hover:bg-gray-100 bg-blue-50">
                <template #prefix>
                  <n-avatar :size="32" :src="getAvatarUrl(message)" />
                </template>
                <template #suffix>
                  <span class="text-[12px] text-gray-500">{{ message.timestamp }}</span>
                </template>
                <div class="flex-1">
                  <div class="font-semibold mb-1 text-[14px]">{{ message.sender }}</div>
                  <div class="mb-1" v-if="message.event">
                    <n-tag size="small" type="info">{{ message.event }}</n-tag>
                  </div>
                  <div class="word-break-all text-[14px] leading-[1.5] text-gray-600">{{ message.content }}</div>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </div>

        <!-- 服务器消息列表 -->
        <div class="flex flex-col rounded-lg border border-gray-200 overflow-hidden box-border flex-1">
          <h3 class="m-0 p-3 text-[16px] font-semibold text-gray-800 bg-gray-50 border-b border-gray-200">服务器消息</h3>
          <div class="flex-1 overflow-y-auto p-3 box-border">
            <n-list bordered>
              <n-list-item v-if="messages.filter(m => m.sender === '服务器').length === 0" class="flex justify-center items-center py-[100px]">
                <n-empty description="暂无消息，建立连接后开始接收消息" />
              </n-list-item>
              <n-list-item v-for="(message, index) in messages.filter(m => m.sender === '服务器')" :key="index" class="mb-2.5 rounded transition-colors hover:bg-gray-100 bg-gray-50">
                <template #prefix>
                  <n-avatar :size="32" :src="getAvatarUrl(message)" />
                </template>
                <template #suffix>
                  <span class="text-[12px] text-gray-500">{{ message.timestamp }}</span>
                </template>
                <div class="flex-1">
                  <div class="font-semibold mb-1 text-[14px]">{{ message.sender }}</div>
                  <div class="mb-1" v-if="message.event">
                    <n-tag size="small" type="success">{{ message.event }}</n-tag>
                  </div>
                  <div class="word-break-all text-[14px] leading-[1.5] text-gray-600">{{ message.content }}</div>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SseDemo">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import http from '@/utils/request'
import { notification } from '@/utils/help'

// 连接状态：connecting, connected, disconnected
const connectionStatus = ref<'connecting' | 'connected' | 'disconnected'>('disconnected')
const messages = ref<Array<{ sender: string; content: string; timestamp: string; event?: string }>>([])
const inputMessage = ref('')
const selectedEvent = ref('')
const availableEvents = ref<string[]>(['', 'chat', 'notification', 'update', 'alert'])
let eventSource: EventSource | null = null

// 获取随机头像URL
const getAvatarUrl = (message: any) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender)}&background=${randomColor.replace('#', '')}&color=fff&size=32`
}

// 建立SSE连接
const connectSse = () => {
  if (eventSource) {
    eventSource.close()
  }

  connectionStatus.value = 'connecting'

  try {
    // 创建EventSource连接
    eventSource = new EventSource(`${import.meta.env.VITE_BASE_API}/sse/connect`)

    // 连接打开事件
    eventSource.onopen = () => {
      connectionStatus.value = 'connected'
      addSystemMessage('SSE连接已建立')
    }

    // 接收消息事件
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        addMessage('服务器', data.data, new Date().toLocaleString(), data.event)
      } catch (error) {
        console.error('解析SSE消息失败:', error)
        addSystemMessage('接收到无效的消息格式')
      }
    }
    
    // 监听自定义事件
    availableEvents.value.forEach(eventType => {
      if (eventType && eventSource) {
        eventSource.addEventListener(eventType, (event) => {
          try {
            const data = JSON.parse(event.data)
            addMessage('服务器', data.data, new Date().toLocaleString(), eventType)
          } catch (error) {
            console.error(`解析${eventType}事件消息失败:`, error)
            addSystemMessage(`接收到无效的${eventType}事件消息格式`)
          }
        })
      }
    })

    // 连接错误事件
    eventSource.onerror = (error) => {
      console.error('SSE连接错误:', error)
      connectionStatus.value = 'disconnected'
      addSystemMessage('SSE连接发生错误，已断开')
      notification.error({ title: 'SSE连接错误', content: 'SSE连接发生错误，已断开', duration: 3000 })
      eventSource?.close()
    }
  } catch (error) {
    console.error('创建SSE连接失败:', error)
    connectionStatus.value = 'disconnected'
    addSystemMessage('建立SSE连接失败')
    notification.error({ title: 'SSE连接失败', content: '建立SSE连接失败', duration: 3000 })
  }
}

// 断开SSE连接
const disconnectSse = () => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
  connectionStatus.value = 'disconnected'
  addSystemMessage('SSE连接已断开')
}

// 切换连接状态
const toggleConnection = () => {
  if (connectionStatus.value === 'connected') {
    disconnectSse()
  } else {
    connectSse()
  }
}

// 添加系统消息
const addSystemMessage = (content: string) => {
  messages.value.push({
    sender: '系统',
    content,
    timestamp: new Date().toLocaleString()
  })
  scrollToBottom()
}

// 添加普通消息
const addMessage = (sender: string, content: string, timestamp: string, event?: string) => {
  messages.value.push({
    sender,
    content,
    timestamp,
    event
  })
  scrollToBottom()
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const message = inputMessage.value.trim()
  const event = selectedEvent.value
  inputMessage.value = ''
  
  // 先添加到本地消息列表
  addMessage('我', message, new Date().toLocaleString(), event)

  try {
    await http.post('/sse/send', { content: message, event })
  } catch (error) {
    console.error('发送消息失败:', error)
    notification.error({ title: '发送失败', content: '消息发送失败，请重试', duration: 3000 })
    // 移除刚才添加的本地消息
    messages.value.pop()
  }
}

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    // 获取所有消息列表元素，确保每个列表都滚动到底部
    const messageLists = document.querySelectorAll('.message-scroll-container') as NodeListOf<HTMLElement>
    messageLists.forEach(list => {
      list.scrollTop = list.scrollHeight
    })
  }, 100)
}

// 组件挂载时尝试建立连接
onMounted(() => {
  connectSse()
})

// 组件卸载前断开连接
onBeforeUnmount(() => {
  disconnectSse()
})
</script>


