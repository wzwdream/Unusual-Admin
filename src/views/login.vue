<template>
    <div class="base">
        <div class="loginForm">
            <div class="loginForm_title" ref="title"><span>登录</span></div>
            <n-space vertical>
                <n-form ref="formRef" inline :label-width="150" :model="formValue">
                    <n-form-item label="账户" path="user.name" style="width: 80%">
                        <n-input v-model:value="formValue.userName" placeholder="请输入账户名称" />
                    </n-form-item>
                    <n-form-item label="密码" path="user.age" style="width: 80%">
<!--                        <n-input v-model:value="formValue.userPassword" placeholder="请输入账户密码" />-->
                      <n-input
                          v-model:value="Unencrypted"
                          type="password"
                          show-password-on="mousedown"
                          placeholder="请输入账户密码"
                          :maxlength="12"
                      />
                    </n-form-item>
                </n-form>
              <div style="width: 100%;display: flex;justify-content: center">
                <n-button class="loginButton" type="primary" @click="login">确认</n-button>

              </div>
<!--                <n-button class="loginButton" type="primary" @click="passwordDeciphering">解密</n-button>-->
            </n-space>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { encrypt } from '@/utils/aes'
import { useMessage } from 'naive-ui'
import Request from '@/utils/request'
import router from '@/router';
let Unencrypted = ref('widgets@123')
let formValue = reactive({
    userName: 'admin',
    userPassword: ''
})
const title = ref('title')
const message = useMessage()
function login() {
  formValue.userPassword = encrypt(Unencrypted.value)
//   console.log(formValue,'fomrValue')
  Request.post('/api/login',formValue).then((response)=>{
    console.log(response,'response')
    if(response.code === 200){
      message.success('登录成功')
      router.push('/HelloWorld')
      localStorage.setItem('token',response.data)
    }else{
      message.error('登录失败，请检查账号名或者密码')
    }
  })
  // Request.post('/user')
}

onMounted(() => {
    console.log('title',title.value)
})

</script>

<style scoped>
.base {
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/login_bg2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.loginForm_title {
    width: 80%;
    text-align: left;
    margin: auto;
    font-size: 1.5rem;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  color: #333333;
}

.loginForm {
    width: 25rem;
    height: 30rem;
    background-color: #fff;
    position: relative;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);
    animation: shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    border-radius: .8rem;
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

.n-form-item .n-form-item-blank :focus-visible {
    /* //outline: 1px #fe538d !important; */
}

.loginButton {
    width: 50%;
    /* //color: #ffffff;
    //background-color: #fe538d; */
    animation: shadow-drop-bottom 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    border-radius: .3rem;
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

.n-button:not(.n-button--disabled):active {
    /* //border: 1px solid #fe538d !important;
    //color: #fe538d; */
}
</style>
