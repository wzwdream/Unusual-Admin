<template>
  <div>
    <BasicLayout
      v-model:columns="columns"
      :btnDisabled="btnDisabled"
      @search="listQuery"
      @reset="handlereset"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
      @download="handleDownload"
    >
      <template #queryBar>
        <query-item label="菜单名称">
          <n-input v-model:value="defualtQuery.title" size="small" clearable placeholder="输入菜单名称，模糊搜索" />
        </query-item>
      </template>
      <n-data-table
        :columns="columns"
        :data="listData"
        :loading="loading"
        :row-key="rowKey"
        striped
        :remote="true"
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
        :disabled="modalAction === 'view'"
      >
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-form-item label="登录账号" path="userName">
              <n-input v-model:value="modalForm.userName" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="电话" path="iphone">
              <n-input v-model:value="modalForm.iphone" clearable />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="用户姓名" path="name">
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
                <n-radio :key="0" :value="0" label="男" />
                <n-radio :key="1" :value="1" label="女" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="状态" path="status">
              <n-radio-group v-model:value="modalForm.status" name="status">
                <n-radio v-for="item in dict?.status" :key="item.id" :value="Number(item.value)" :label="item.label"></n-radio>
                <!-- <n-radio :key="0" :value="1" label="正常" />
                <n-radio :key="1" :value="0" label="禁用" /> -->
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi span="2">
            <n-form-item label="用户角色" path="roles">
              <n-select v-model:value="modalForm.roles" multiple label-field="roleName" value-field="id"  filterable clearable :options="roles" />
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
import { getUserRole } from '@/api/user/userRole'
import { type RoleList } from '../../api/user/userRole'
import { NSwitch } from 'naive-ui/es/components'
import { useDict } from '@/hooks/useDict'

// 获取角色
const roles = ref<RoleList[]>([])
getUserRole().then(res => {
  roles.value = res.data
})

// 获取dict
const { dict } =  useDict(['status'])

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
    key: 'userName'
  },
  {
    title: '用户姓名',
    key: 'name'
  },
  {
    title: '性别',
    key: 'sex',
    render(row) {
      return h('span',row.sex === 0 ? '男' : '女')
    }
  },
  {
    title: '电话',
    key: 'iphone'
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
            onHandleDelete: () => handleDelete([row.id as number]),
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
// 表格hooks
const {
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
  btnDisabled
} = useBasicList<UserList, Query>({
  name: '用户',
  url: '/user',
  key: 'id',
  isPagination: false,
  initForm: { userName: '', name: '', iphone: '', email: '', sex: 0, status: 1, roles: [] },
  initQuery: { userName: '', email: '', iphone: '' },
  // 搜索前
  beforeRefresh: (query) => {
    if (query && query.title) {
      query.pid = undefined
    }
    return query
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
