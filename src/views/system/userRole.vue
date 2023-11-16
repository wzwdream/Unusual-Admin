<template>
  <div>
    <n-grid cols="3" item-responsive :y-gap="8" :x-gap="10" responsive="screen">
      <n-grid-item span="3 m:2 l:2 xl:2">
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
            <query-item label="角色名称">
              <n-input v-model:value="defualtQuery.roleName" size="small" placeholder="输入角色名称" />
            </query-item>
            <query-item label="角色状态">
              <n-select v-model:value="defualtQuery.roleStatus" placeholder="选择角色状态" :options="dict?.status" />
            </query-item>
          </template>
          <n-data-table
            :columns="columns"
            :data="listData"
            :pagination="pagination"
            :loading="loading"
            :row-key="rowKey"
            :row-props="rowProps"
            :row-class-name="getRowClassName"
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
          width="550px"
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
      </n-grid-item>
      <n-grid-item span="3 m:1 l:1 xl:1">
        <n-card title="菜单分配" size="small" :segmented="true">
          <template #header-extra>
            <n-button type="primary" size="small" :loading="saveLoading" @click="saveMenu">
              <template #icon>
                <Icon icon="mingcute:save-2-line" />
              </template>
              保存
            </n-button>
          </template>
          <n-tree
            :data="data"
            :checked-keys="checkedKeys"
            key-field="path"
            label-field="title"
            :selectable="false"
            :show-line="true"
            block-line
            multiple
            cascade
            checkable
            expand-on-click
            @update:checked-keys="updateCheckedKeys"
          />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts" name="UserRole">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import { type FormRules, NButton, NSwitch } from 'naive-ui'
import { type RoleList, type RoleQuery, updateUserRole, addUserRole, deleteUserRole } from '@/api/user/userRole'
import { useMenuStore } from '@/store/menu'
import TableAction from '@/components/basic/tableAction.vue'
import { useBasicList } from '@/components/basic/useBasicList/index'
import { message } from '@/utils/help'
import { useDict } from '@/hooks/useDict'

// 获取dict
const { dict } =  useDict(['status'])
// 表格
const columns = ref<DataTableColumn<RoleList>[]>([
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
    title: '角色名称',
    key: 'roleName'
  },
  {
    title: '角色排序',
    key: 'roleSort'
  },
  {
    title: '角色状态',
    key: 'roleStatus',
    render(row) {
      return h(
        NSwitch,
        {
          rubberBand: false,
          value: Number(row['roleStatus']),
          loading: !!row.loading,
          checkedValue: 1,
          uncheckedValue: 0,
          onUpdateValue: () => handleChangeStatus(row)
        }
      )
    }
  },
  {
    title: '备注',
    key: 'roleReamark'
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
            onHandleEdit: () => handleEdit(row),
            onHandleView: () => handleView(row)
          },
        )
      ]
    }
  }
])

const handleChangeStatus = async (row: RoleList) => {
  row.loading = true
  const params: RoleList = { ...row, roleStatus: row.roleStatus === 0 ? 1 : 0 }
  await updateUserRole(params)
  await listQuery()
  row.loading = false
}

// 点击表格的某一行，添加选中效果，并存储行数据
const selectedRow = ref<RoleList>()
const rowProps = (row: RoleList) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      selectedRow.value = row
      checkedKeys.value = row.roleMenu || []
    }
  }
}
// 根据点击选中的设置样式
const getRowClassName = computed(() => {
  return (row: RoleList) => {
    if (row.id === selectedRow.value?.id) {
      return 'selected-row'
    }
    return ''
  }
})

// 右侧菜单
const menuStore = useMenuStore()
const data = ref(menuStore.treeMenu)
const checkedKeys = ref<string[]>([])

// 菜单选中更新
const updateCheckedKeys = (keys: Array<string>) => {
  checkedKeys.value = keys
}
// 保存选中菜单
const saveLoading = ref(false)
const saveMenu = () => {
  if (selectedRow.value && checkedKeys.value) {
    saveLoading.value = true
    const params = { ...selectedRow.value, roleMenu: checkedKeys.value }
    updateUserRole(params).then(res => {
      saveLoading.value = false
      message.success(res.message)
      listQuery()
    }).catch(() => {
      saveLoading.value = false
    })
  } else {
    message.warning('请选择数据')
  }
}

// 表单规则
const formRules: FormRules = {
  roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}]
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
  pagination,
  loading,
  rowKey,
  btnDisabled
} = useBasicList<RoleList, RoleQuery>({
  name: '角色',
  url: '/userRole',
  key: 'id',
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