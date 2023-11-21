<template>
  <n-form ref="modalFormRef" label-placement="left" label-align="right" :label-width="80" :model="modalForm" :rules="formRules">
    <n-form-item label="旧密码" path="userPassword">
      <n-input v-model:value="modalForm.userPassword" clearable />
    </n-form-item>
    <n-form-item label="新密码" path="newPwd">
      <n-input v-model:value="modalForm.newPwd" clearable />
    </n-form-item>
    <n-form-item label="确认密码" path="pwd">
      <n-input v-model:value="modalForm.pwd" clearable />
    </n-form-item>
    <n-button type="primary" @click="save">保存</n-button>
  </n-form>
</template>

<script setup lang="ts" name="ResetPwd">
import { checkPassword } from '@/utils/calibrationRules';
import type { FormInst, FormItemRule } from 'naive-ui/es/form/src/interface'

const modalFormRef = ref<FormInst | null>(null)
const modalForm = reactive({
  userPassword: '',
  newPwd: '',
  pwd: ''
})
const formRules = {
  userPassword: [
    {required: true, message: '请输入旧密码', trigger: 'blur'}
  ],
  newPwd: [
    {required: true, validator: (rule: FormItemRule, value: string) => {
      if (!value) return new Error('请输入新密码')
      if (!checkPassword(rule, value)) return new Error('密码格式不正确')
      return true
    }, trigger: ['input', 'blur'] }
  ],
  pwd: [
    {required: true, validator: (rule: FormItemRule, value: string) => {
      if(!value)  return new Error('请输入确认密码')
      if (value!== modalForm.newPwd) return new Error('新密码跟确认密码不一致')
      if (!checkPassword(rule, value)) return new Error('密码格式不正确')
      return true
    }, trigger: ['input', 'blur'] },
  ]
}
const save = () => {
  modalFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log(modalForm, '保存')
    }
  })
}
</script>