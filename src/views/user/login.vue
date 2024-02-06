<template>
  <div wh-full f-c-c class="bg-content">
    <div class="bg-white rd-12 relative w768 max-w-full min-h-480 card-shadow dark:bg-dark" :class="{'right-panel-active': active === 'signIn'}">
      <div class="form-container  sign-in-container">
        <n-form ref="loginFormRef" size="small" :show-label="false" :model="loginForm" :rules="loginRules" class="flex-col-c bg-white h-full rounded-10">
          <h1 m-0>登录</h1>
          <n-space my-20>
            <n-button circle>
              <template #icon>
                <Icon icon="bi:tencent-qq" />
              </template>
            </n-button>
            <n-button circle>
              <template #icon>
                <Icon icon="tabler:brand-wechat" />
              </template>
            </n-button>
            <n-button circle>
              <template #icon>
                <Icon icon="mdi:github" />
              </template>
            </n-button>
          </n-space>
          <span mb-10 font-size-12>或者使用你的账号</span>
          <n-form-item path="name" class="w-[80%]">
            <n-input v-model:value="loginForm.name" placeholder="请输入账户名称" />
          </n-form-item>
          <n-form-item path="password" class="w-[80%]">
            <n-input v-model:value="loginForm.password" type="password" show-password-on="mousedown" placeholder="请输入账户密码" :maxlength="12" />
          </n-form-item>
          <n-form-item path="captchaText" class="w-[80%]">
            <n-input v-model:value="loginForm.captchaText" placeholder="请输入验证码" />
            <div @click="getCaptchaCode" v-html="captchaSrc" h-28 w-100 cursor-pointer />
          </n-form-item>
          <div flex mb-10 min-w-308><span font-size-12>忘记密码？</span></div>
          <n-button class="w-[40%] font-bold" round type="primary" :loading="loginLoading" @click="submitLogin" @keyup.enter="submitLogin">登录</n-button>
        </n-form>
      </div>
      <div class="form-container sign-up-container">
        <n-form ref="registFormRef" size="small" :show-label="false" :model="registForm" :rules="registFormRules" class="flex-col-c bg-white h-full rounded-10">
          <h1 m-0>注册</h1>
          <n-form-item path="name" class="w-[80%]">
            <n-input v-model:value="registForm.name" placeholder="请输入账户名称" />
          </n-form-item>
          <n-form-item path="pwd" class="w-[80%]">
            <n-input v-model:value="registForm.pwd" type="password" show-password-on="click" placeholder="请输入账户密码" :maxlength="12" />
          </n-form-item>
          <n-form-item path="email" class="w-[80%]">
            <n-input v-model:value="registForm.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item path="phone" class="w-[80%]">
            <n-input v-model:value="registForm.phone" placeholder="请输入手机号" />
          </n-form-item>
          <n-button class="w-[40%] font-bold" round type="primary" :loading="registLoading" @keyup.enter="submitRegist" @click="submitRegist">注册</n-button>
        </n-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>欢迎回来！<n-image width="48" height="48" preview-disabled src='/logo.webp' class="b-rd-[50%]"/></h1>
            <p>要与我们保持联系，请使用您的个人信息登录</p>
            <n-button ghost round color="#fff" @click="active ='signUp'">去登录</n-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>你好，朋友！<n-image width="48" height="48" preview-disabled src='/logo.webp' class="b-rd-[50%]"/></h1>
            <p>非常感谢您选择我们！我们将竭诚为您提供最优质、最全面的服务。</p>
            <n-button ghost round color="#fff" @click="active ='signIn'">去注册</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Login">
import { encrypt } from '@/utils/aes'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user'
import { getCaptcha, login } from '@/api/user/login'
import type { FormInst, FormRules } from 'naive-ui'
import { checkPassword, checkEmail, checkPhone } from '@/utils/calibrationRules';


// 页面切换
const active = ref('signUp')

// 登录
const loginForm = reactive({
  name: 'admin',
  password: 'widgets@123',
  captchaText: 'eybk',
  captchaUid: ''
})
const loginFormRef = ref<FormInst | null>(null)
const loginLoading = ref(false)
const message = useMessage()
const loginRules: FormRules = {
  name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  captchaText: [{required: true, message: '请输入验证码', trigger: 'blur'}],
}
const route = useRoute()
const router = useRouter()

const submitLogin = () => {
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      loginLoading.value = true
      const params = {
        ...loginForm,
        password: encrypt(loginForm.password)
      }
      login(params).then(async (response) => {
        loginLoading.value = false
        message.success('登录成功,欢迎回来')
        const userStore = useUserStore()
        userStore.setToken(response.data)
        const { redirect } = route.query
        router.push(redirect as string || '/')
      }).catch(() => {
        loginLoading.value = false
        getCaptchaCode()
      })
    }
  })
}

// 获取验证码
const captchaSrc = ref('')
const getCaptchaCode = () => {
  getCaptcha().then(res => {
    captchaSrc.value = res.data.captcha
    loginForm.captchaUid = res.data.uid
  })
}
getCaptchaCode()

// 注册
const registForm = reactive({
  name: '',
  pwd: '',
  email: '',
  phone: ''
})
const registFormRules: FormRules = {
  name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {validator: checkPassword, message: '密码格式不正确', trigger: 'input' }
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {validator: checkEmail, message: '请输入正确的邮箱', trigger: 'input' }
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {validator: checkPhone, message: '请输入正确的手机号', trigger: 'input' }
  ],
}
const registFormRef = ref<FormInst | null>(null)
const registLoading = ref(false)

const submitRegist = () => {
  registFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log(registForm, '注册')
    }
  })
}
</script>

<style scoped>
.bg-content {
  background-image: url('@/assets/svg/bg.svg');
}
.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  animation: toggleRight 0.6s;
  border-radius: 0 10px 10px 0;
  z-index: 100;
}

.right-panel-active .overlay-container {
  animation: toggleLeft 0.6s;
  border-radius: 10px 0 0 10px;
  transform: translateX(-100%);
}

@keyframes toggleRight {
  0%,
  49.99% {
    border-radius: 10px 0 0 10px;
  }
  50%,
  100% {
    border-radius: 0 10px 10px 0;
  }
}
@keyframes toggleLeft {
  0%,
  49.99% {
    border-radius: 0 10px 10px 0;
  }
  50%,
  100% {
    border-radius: 10px 0 0 10px;
  }
}

.overlay {
  background: var(--primary-color);
  background: -webkit-linear-gradient(to right, var(--primary-color-pressed), var(--primary-color));
  background: linear-gradient(to right, var(--primary-color-pressed), var(--primary-color));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 40px;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>