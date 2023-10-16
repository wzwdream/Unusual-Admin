<script lang="ts" setup>
    import { FormInst, FormRules } from 'naive-ui'
    import {getTestDataArray} from '@/api/user/mail';
    // import GraphemeSplitter from 'grapheme-splitter'
    interface ModelType {
        addressee: string | null
        subject: string | null
        content: string | null
    }
    const formRef = ref<FormInst | null>(null)
    // const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    // const message = useMessage()
    // const splitter = new GraphemeSplitter()
    const emailData = ref<ModelType>({
        addressee: null,
        subject: null,
        content: null,
    })
    // function countGraphemes(value: string) {
    //     splitter.countGraphemes(value)
    // }
    const rules: FormRules = {
        addressee: [
            {
                required: true,
                trigger: ['input', 'blur'],
            },
        ],
        subject: [
            {
                required: true,
                message: '请输入密码',
            },
        ],
        content: [
            {
                required: true,
                message: '请再次输入密码',
                trigger: ['input', 'blur'],
            },
        ],
    }
    getTestDataArray().then(res=>{
      console.log(res)
    })
</script>

<template>
  <div class="">
    <div class='w-1/3 m-auto p-10 '>
      <n-form ref="formRef" :model="emailData" :rules="rules">
        <n-form-item path="age" label="收件人">
          <n-input v-model:value="emailData.addressee" @keydown.enter.prevent maxlength="30" clearable show-count />
        </n-form-item>
        <n-form-item path="password" label="主题">
          <n-input v-model:value="emailData.subject" @keydown.enter.prevent maxlength="30" clearable show-count />
        </n-form-item>
        <n-form-item label="内容">
          <n-input
              v-model:value="emailData.content"
              @keydown.enter.prevent
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
              <n-button :disabled="emailData.addressee === null" round type="primary"> 发送 </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </div >
  </div>
</template>

<style scoped></style>
