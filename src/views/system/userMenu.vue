<template>
  <div>
    <BasicList
      :columns="columns"
      :data="listData"
      :loading="loading"
      :row-key="rowKey"
      @search="listQuery"
      @reset="handlereset"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
      @download="handleDownload"
      @change-checkrow="changeCheckRow"
    >
      <template #queryBar>
        <query-item label="角色名称">
          <n-input v-model:value="defualtQuery.roleName" size="small" placeholder="输入角色名称" />
        </query-item>
      </template>
    </BasicList>
    <BasicModel
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalShowFooter"
      width="550px"
      @save="handleSave"
    >
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item label="角色名称" path="roleName">
          <n-input v-model:value="modalForm.roleName" />
        </n-form-item>
        <n-space justify="space-between">
          <n-form-item label="角色排序" path="roleSort">
            <n-input-number v-model:value="modalForm.roleSort" clearable />
          </n-form-item>
          <n-form-item label="角色状态" path="roleStatus">
            <n-switch
              :checked-value="1"
              :unchecked-value="0"
              v-model:value="modalForm.roleStatus"
            />
          </n-form-item>
        </n-space>
        <n-form-item label="备注" path="roleReamark">
          <n-input v-model:value="modalForm.roleReamark" />
        </n-form-item>
      </n-form>
    </BasicModel>
  </div>
</template>

<script setup lang="ts" name="UserMenu">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import { NSwitch } from 'naive-ui'
import { type RoleList, type RoleQuery, updateUserRole, addUserRole, deleteUserRole } from '@/api/user/userRole'
import TableAction from '@/components/tableAction/index.vue'
import { useBasicList } from '@/hooks/useBasicList/index'

// 表格
const columns: Array<DataTableColumn<RoleList>> = [
  {
    type: 'selection',
    // disabled: (row) => {
    //   return row.id === 1
    // }
  },
  {
    title: 'ID',
    key: 'id'
  },

  {
    title: '菜单标题',
    key: 'title'
  },
  {
    title: '图标',
    key: 'icon'
  },
  {
    title: '排序',
    key: 'sort'
  },
  {
    title: '组件路径',
    key: 'component'
  },
  {
    title: '外链',
    key: 'externalLink'
  },
  {
    title: '缓存',
    key: 'keepAlive'
  },
  {
    title: '可见',
    key: 'visibily'
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
            onHandleDelete: () => handleDelete([row.id as number]),
            onEdit: () => handleEdit(row),
            onView: () => handleView(row)
          },
        )
      ]
    }
  }
]

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
  rowKey
} = useBasicList<RoleList, RoleQuery>({
  name: '菜单',
  url: '/userMenu',
  key: 'id',
  isPagination: false,
  initForm: { roleName: '', roleStatus: 1, roleSort: null, roleReamark: '' },
  initQuery: { roleName: '', roleStatus: undefined },
  doCreate: addUserRole,
  doDelete: deleteUserRole,
  doUpdate: updateUserRole,
  beforeSave: (form) => {
    console.log(form)
    return form
  }
})
</script>

<style scoped>
:deep(.selected-row > .n-data-table-td) {
  background-color: #e8f4ff !important;
}
</style>
