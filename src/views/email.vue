<script lang="ts" setup>
import {FormInst, FormRules, FormItemRule, useMessage} from 'naive-ui'
import {getTestDataArray, sendEmail} from '@/api/user/mail';

// import GraphemeSplitter from 'grapheme-splitter'
interface ModelType {
  email: string | null
  subject: string | null
  text: string | null
}

const formRef = ref<FormInst | null>(null)
// const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
// const splitter = new GraphemeSplitter()
const emailData = ref<ModelType>({
  email: '1758417159@qq.com',
  subject: '测试',
  text: '测试',
})
// function countGraphemes(value: string) {
//     splitter.countGraphemes(value)
// }
const rules: FormRules = {
  email: [
    {
      required: true,
      trigger: ['input', 'blur'],
      validator(rule: FormItemRule, value: string) {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(value)
      },
    },
  ],
  subject: [
    {
      required: true,
      trigger: ['input', 'blur'],
      message: '请输入密码',
    },
  ],
  text: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
  ],
}
getTestDataArray().then(res => {
  console.table(res.data)
})

function sendEmailHandle() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      sendEmail({...emailData.value}).then(res => {
        if (res.code === 200){
          message.success('success')
        }
      })
    } else {
      console.error('Verification failure')
    }
  })

}
</script>

<template>
  <div class="">
    <div class='w-1/3 m-auto p-10 '>
      <n-form ref="formRef" :model="emailData" :rules="rules">
        <n-form-item path="email" label="收件人">
          <n-input v-model:value="emailData.email" maxlength="30" clearable show-count/>
        </n-form-item>
        <n-form-item path="subject" label="主题">
          <n-input v-model:value="emailData.subject" maxlength="30" clearable show-count/>
        </n-form-item>
        <n-form-item path="text" label="内容">
          <n-input
              v-model:value="emailData.text"
              type="textarea"
              placeholder="请输入"
              maxlength="1000"
              clearable
              show-count
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div class="flex justify-end">
              <n-button :disabled="emailData.email === null" round type="primary" @keydown.enter.prevent
                        @click="sendEmailHandle()"> 发送
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </div>
  </div>
</template>

<style scoped></style>
