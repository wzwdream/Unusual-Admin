<template>
    <div class="base">
        <div class="loginForm">
            <div class="loginForm_title"><span>LOGIN</span></div>
            <n-space vertical>
                <n-form
                        ref="formRef"
                        inline
                        :label-width="150"
                        :model="formValue"

                >
                    <n-form-item label="" path="user.name" style="width: 80%">
                        <n-input v-model:value="formValue.userName" placeholder="Input userName"/>
                    </n-form-item>
                    <n-form-item label="" path="user.age" style="width: 80%">
                        <n-input v-model:value="formValue.userPassword" placeholder="Input userPassword"/>
                    </n-form-item>
                </n-form>
                <n-button class="loginButton" type="primary" @click="passwordEncrypt">Login</n-button>
                <n-button class="loginButton" type="primary" @click="passwordDeciphering">解密</n-button>
            </n-space>

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {NConfigProvider, NInput, NDatePicker, NSpace} from 'naive-ui'
import {encrypt} from '@/utils/encrypt'
import {decrypt} from '@/utils/decrypt';

export default defineComponent({
    components: {
        NInput
    },
    setup() {
        let formValue = reactive({
            userName: '',
            userPassword: '',
            ciphertext: ''
        })

        function login() {
            console.log('login')
        }

        function passwordEncrypt() {
            formValue.ciphertext = encrypt(formValue.userPassword)
            console.log(formValue.ciphertext, '密文')
        }

        function passwordDeciphering() {
            let decrypts = decrypt(formValue.ciphertext)
            console.log(decrypts,'decrypts')
        }

        return {
            login,
            formValue,
            passwordEncrypt,
            passwordDeciphering
        }

    }
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
    //outline: 1px #fe538d !important;
}

.loginButton {
    width: 50%;
    //color: #ffffff;
    //background-color: #fe538d;
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
    //border: 1px solid #fe538d !important;
    //color: #fe538d;
}
</style>
