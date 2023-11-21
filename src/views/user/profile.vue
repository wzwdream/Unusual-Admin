<template>
  <div>
    <n-grid cols="5" item-responsive :y-gap="8" :x-gap="10">
      <n-gi span="0:5 768:2">
        <n-card :segmented="{ content: true }">
          <template #header>
            <n-space align="center">
              <n-avatar round :size="64" src="/logo.webp" class="bg-[#fff]" />
              <span>{{ userInfo.name }}</span>
            </n-space>
          </template>
          <div>
            <span>登录账号：</span>
            <span>{{ userInfo.userName }}</span>
          </div>
          <n-divider />
          <div>
            <span>邮箱：</span>
            <span>{{ userInfo.email }}</span>
          </div>
          <n-divider />
          <div>
            <span>手机号：</span>
            <span>{{ userInfo.phone }}</span>
          </div>
          <n-divider />
          <div>
            <span>性别：</span>
            <span>{{ getDictLabel('sex', String(userInfo.sex)) }}</span>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="0:5 768:3">
        <n-card title="基本资料" :segmented="{ content: true }">
          <n-tabs ref="tabsInstRef" type="line" animated v-model:value="activeTab">
            <n-tab-pane name="user" tab="用户设置">
              <n-form ref="modalFormRef" label-placement="left" label-align="right" :label-width="80" :model="modalForm" :rules="formRules">
                <n-form-item label="用户昵称" path="name">
                  <n-input v-model:value="modalForm.name" clearable />
                </n-form-item>
                <n-form-item label="电话" path="phone">
                  <n-input v-model:value="modalForm.phone" clearable />
                </n-form-item>
                <n-form-item label="邮箱" path="email">
                  <n-input v-model:value="modalForm.email" clearable />
                </n-form-item>
                <n-button type="primary" @click="save">保存</n-button>
              </n-form>
            </n-tab-pane>
            <n-tab-pane name="pwd" tab="修改密码">
              <ResetPwd />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts" name="Profile">
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'
import { checkEmail, checkPhone } from '@/utils/calibrationRules'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui/es/form/src/interface'
import { storeToRefs } from 'pinia'
import ResetPwd from './resetPwd.vue'
import type { TabsInst } from 'naive-ui/es/tabs/src/interface'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { getDictLabel } = useDict(['sex'])

// 设置tabs选中
const tabsInstRef = ref<TabsInst | null>(null)
const activeTab = ref('user')
const route = useRoute()
if (route.query.pwd) {
  activeTab.value = 'pwd'
}

// 用户设置
const modalFormRef = ref<FormInst | null>(null)
const modalForm = reactive({
  phone: userInfo.value.phone,
  name: userInfo.value.name,
  email: userInfo.value.email,
})

const formRules: FormRules = {
  name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  email: [
    { required: true, validator: (rule: FormItemRule, value: string) => {
      if (!value) return new Error('请输入邮箱')
      if (!checkEmail(rule, value)) return new Error('邮箱格式不正确')
      return true
    }, trigger: ['input', 'blur'] }
  ],
  phone: [
    { required: true, validator: (rule: FormItemRule, value: string) => {
      if (!value) return new Error('请输入手机号')
      if (!checkPhone(rule, value)) return new Error('手机号格式不正确')
      return true
    }, trigger: ['input', 'blur'] }
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