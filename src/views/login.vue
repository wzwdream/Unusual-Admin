<template>
  <div class="base">
    <div class="loginForm">
      <div class="loginForm_title" ref="title"><span>登录</span></div>
      <n-space vertical>
        <n-form ref="formRef" inline :label-width="150" :model="formValue">
          <n-form-item label="账户" path="user.name" style="width: 80%">
            <n-input v-model:value="formValue.userName" placeholder="请输入账户名称" />
          </n-form-item>
          <n-form-item label="密码" path="user.pwd" style="width: 80%">
            <n-input v-model:value="Unencrypted" type="password" show-password-on="mousedown" placeholder="请输入账户密码" :maxlength="12" />
          </n-form-item>
          <n-form-item label="验证码" path="user.captchaText" style="width: 80%">
            <n-input v-model:value="formValue.captchaText" placeholder="请输入验证码" />
            <div @click="getCaptchaCode" v-html="captchaSrc" h-34 w-100 cursor-pointer />
          </n-form-item>
        </n-form>
        <div style="width: 100%; display: flex; justify-content: center">
          <n-button class="loginButton" type="primary" v-debounce:click="submitLogin" @keyup.enter="submitLogin">确认</n-button>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { encrypt } from '@/utils/aes'
import { useMessage } from 'naive-ui'
import router from '@/router'
import { useUserStore } from '@/store/user'
import { getCaptcha, login } from '@/api/user/login'

let Unencrypted = ref('widgets@123')
let formValue = reactive({
  userName: 'admin',
  userPassword: '',
  captchaText: ''
})
const title = ref('title')
const message = useMessage()

const submitLogin = () => {
  formValue.userPassword = encrypt(Unencrypted.value)
  login(formValue).then(async (response) => {
    message.success('登录成功,欢迎回来')
    const userStore = useUserStore()
    userStore.setToken(response.data)
    router.push('/')
  }).catch(() => {
    getCaptchaCode()
  })
}

// 获取验证码
const captchaSrc = ref('')
const getCaptchaCode = () => {
  getCaptcha().then(res => {
    captchaSrc.value = res.data
  })
}
getCaptchaCode()
</script>

<style scoped>
.base {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/login_bg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.loginForm_title {
  width: 80%;
  text-align: left;
  margin: auto;
  font-size: 26px;
  font-weight: 600;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333333;
}

.loginForm {
  width: 100rem;
  height: 120rem;
  background-color: #fff;
  position: relative;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  animation: shadow-drop-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  border-radius: 12px;
  justify-content: center;
}

@keyframes shadow-drop-center {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.35);
  }
}

.n-form.n-form--inline {
  flex-wrap: wrap;
  justify-content: center;
}

.n-form.n-form--inline .n-form-item {
  margin-right: 0;
}

.n-form.n-form--inline .n-form-item:last-child {
  margin-right: 0;
}

.loginButton {
  width: 50%;
  /* //color: #ffffff;
    //background-color: #fe538d; */
  animation: shadow-drop-bottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  height: 35px;
  border-radius: 12px;
}

@keyframes shadow-drop-bottom {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    -webkit-box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
    box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
  }
}
</style>
@/router/router1@/router/router
@/api/user/user
