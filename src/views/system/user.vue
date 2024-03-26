<template>
  <div>
    <BasicLayout
      v-model:columns="columns"
      :btnDisabled="btnDisabled"
      :permission="permission"
      @search="listQuery"
      @reset="handlereset"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
      @download="handleDownload"
    >
      <template #queryBar>
        <query-item label="登录账号">
          <n-input v-model:value="defualtQuery.account" size="small" clearable placeholder="输入登录账号，模糊搜索" />
        </query-item>
        <query-item label="手机号">
          <n-input v-model:value="defualtQuery.phone" size="small" clearable placeholder="输入手机号，模糊搜索" />
        </query-item>
        <query-item label="用户状态">
          <n-select v-model:value="defualtQuery.status" placeholder="选择用户状态" :options="dict?.status" clearable />
        </query-item>
      </template>
      <n-data-table
        :columns="columns"
        :data="listData"
        :loading="loading"
        :row-key="rowKey"
        :pagination="pagination"
        striped
        :remote="true"
        :checked-row-keys="checkedRowKeys"
        @update:checked-row-keys="changeCheckRow"
      />
    </BasicLayout>
    <BasicModel
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalShowFooter"
      width="600px"
      @save="handleSave"
    >
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="right"
        :label-width="80"
        :model="modalForm"
        :rules="formRules"
        :disabled="modalAction === 'view'"
      >
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-form-item label="登录账号" path="account">
              <n-input v-model:value="modalForm.account" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="电话" path="phone">
              <n-input v-model:value="modalForm.phone" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="用户名称" path="name">
              <n-input v-model:value="modalForm.name" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="邮箱" path="email">
              <n-input v-model:value="modalForm.email" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="性别" path="sex">
              <n-radio-group v-model:value="modalForm.sex" name="sex">
                <n-radio v-for="item in dict?.sex" :key="item.id" :value="Number(item.value)" :label="item.label"></n-radio>
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="状态" path="status">
              <n-radio-group v-model:value="modalForm.status" name="status">
                <n-radio v-for="item in dict?.status" :key="item.id" :value="Number(item.value)" :label="item.label"></n-radio>
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi span="2">
            <n-form-item label="用户角色" path="roles">
              <n-select v-model:value="modalForm.roles" multiple label-field="name" value-field="id"  filterable clearable :options="roles" />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
    </BasicModel>
  </div>
</template>

<script setup lang="ts" name="User">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import TableAction from '@/components/basic/tableAction.vue'
import { useBasicList } from '@/components/basic/useBasicList/index'
import { type Query, type UserList, addUser, delUser, editUser } from '@/api/user/user'
import { getUserRole } from '@/api/user/role'
import { type RoleList } from '@/api/user/role'
import { type FormRules, NSwitch } from 'naive-ui/es/components'
import { useDict } from '@/hooks/useDict'
import { checkPassword, checkEmail, checkPhone } from '@/utils/calibrationRules';
import { type ModalAction } from '@/components/basic/useBasicList/utils/type'

// 权限标识
const permission = {
  add: ['admin'],
  del: ['admin', 'user:del'],
  edit: ['admin'],
  download: ['admin']
}
// 获取角色
const roles = ref<RoleList[]>([])
getUserRole().then(res => {
  roles.value = res.data.data
})

// 获取dict
const { dict, getDictLabel } =  useDict(['status', 'sex'])

// 表格
const columns = ref<Array<DataTableColumn<UserList>>>([
  {
    type: 'selection',
    disabled: (row) => {
      return row.id === 1
    }
  },
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '登录账号',
    key: 'account'
  },
  {
    title: '用户名称',
    key: 'name'
  },
  {
    title: '性别',
    key: 'sex',
    render(row) {
      return h('span', getDictLabel('sex', String(row.sex)))
    }
  },
  {
    title: '电话',
    key: 'phone'
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h(
        NSwitch,
        {
          rubberBand: false,
          value: Number(row['status']),
          loading: !!row.loading,
          checkedValue: 1,
          uncheckedValue: 0,
          disabled: row.id === 1,
          onUpdateValue: () => handleChangeStatus(row)
        }
      )
    }
  },
  {
    title: '创建日期',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'actions',
    // width: 280,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
        h(
          TableAction,
          {
            disabled: row.id === 1,
            permission,
            onHandleDelete: () => handleDelete(row.id as number),
            onHandleEdit: () => handleEdit(row),
            onHandleView: () => handleView(row)
          },
        )
      ]
    }
  }
])

// 更改用户状态
const handleChangeStatus = async (row: UserList) => {
  row.loading = true
  const params: UserList = { ...row, status: row.status === 0 ? 1 : 0 }
  await editUser(params)
  await listQuery()
  row.loading = false
}

// 表单规则
const formRules: FormRules = {
  account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
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
// 提示
const notification = useNotification()
// 表格hooks
const {
  pagination,
  modalVisible,
  modalAction,
  modalShowFooter,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleDownload,
  handleView,
  handleSave,
  handlereset,
  defualtQuery,
  modalForm,
  modalFormRef,
  changeCheckRow,
  listQuery,
  listData,
  loading,
  rowKey,
  btnDisabled,
  checkedRowKeys
} = useBasicList<UserList, Query>({
  name: '用户',
  url: '/user',
  key: 'id',
  initForm: { account: '', name: '', phone: '', email: '', sex: 0, status: 1, roles: [] },
  initQuery: { account: undefined, phone: undefined, status: undefined },
  // 搜索前
  beforeRefresh: (query) => {
    if (query && query.title) {
      query.pid = undefined
    }
    return query
  },
  // 新增/修改保存之后
  afterSave: (type: ModalAction) => {
    if (type === 'add') {
      notification.info({
        title: '初始密码',
        content: '123456',
      })
    }
  },
  doDelete: delUser,
  doCreate: addUser,
  doUpdate: editUser
})
</script>

<style scoped>
:deep(.selected-row > .n-data-table-td) {
  background-color: #e8f4ff !important;
}
</style>
