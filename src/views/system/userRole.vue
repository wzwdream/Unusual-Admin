<template>
  <div>
    <n-grid cols="3" item-responsive :y-gap="8" :x-gap="10" responsive="screen">
      <n-grid-item span="3 m:2 l:2 xl:2">
        <BasicList
          ref="testTable"
          :columns="columns"
          :data="listData"
          :pagination="pagination"
          :loading="loading"
          :row-key="rowKey"
          :row-props="rowProps"
          :row-class-name="getRowClassName"
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
            <query-item label="角色状态">
              <n-select v-model:value="defualtQuery.roleStatus" placeholder="选择角色状态" :options="statusOptions" />
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
      </n-grid-item>
      <n-grid-item span="3 m:1 l:1 xl:1">
        <n-card title="菜单分配" size="small" :segmented="true">
          <template #header-extra>
            <n-button type="info" size="small" :render-icon="renderIcon('mingcute:save-2-line')" @click="saveMenu">保存</n-button>
          </template>
          <n-tree
            ref="treeMenuRef"
            :data="data"
            key-field="path"
            label-field="title"
            :selectable="false"
            :show-line="true"
            block-line
            multiple
            cascade
            checkable
            expand-on-click
          />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts" name="BaseList">
import { type BasicTableType } from '@/type/components'
import { type DataTableColumn } from 'naive-ui/es/data-table'
import { NButton, NSwitch } from 'naive-ui'
import { type RoleList, type RoleQuery, updateUserRole, addUserRole, deleteUserRole } from '@/api/user/userRole'
import { renderIcon } from '@/utils/help'
import { useMenuStore } from '@/store/menu';
import TableAction from '@/components/tableAction/index.vue'
import { useBasicList } from '@/hooks/useBasicList/index'

// 表格
const testTable = ref<BasicTableType | null>(null)
const columns: Array<DataTableColumn<RoleList>> = [
  {
    type: 'selection'
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
          value: row['roleStatus'] as number,
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
            onEdit: () => handleEdit(row),
            onView: () => handleView(row)
          },
        )
      ]
    }
  }
]

// 点击表格的某一行，添加选中效果，并存储行数据
const selectedRow = ref<RoleList>()
const rowProps = (row: RoleList) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      selectedRow.value = row
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

// 更改角色状态
const statusOptions = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  }
]
const handleChangeStatus = async (row: RoleList) => {
  row.loading = true
  const params: RoleList = { ...row, roleStatus: row.roleStatus === 0 ? 1 : 0 }
  await updateUserRole(params)
  await testTable.value?.listQuery()
  row.loading = false
}

// 右侧菜单
const menuStore = useMenuStore()
const data = ref(menuStore.treeMenu)
const treeMenuRef = ref()
const saveMenu = () => {
  const keys = treeMenuRef.value?.getCheckedData()
  const key = treeMenuRef.value?.getIndeterminateData()
  console.log('保存', keys, key)
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
  rowKey
} = useBasicList<RoleList, RoleQuery>({
  name: '角色',
  url: '/userRole',
  key: 'id',
  initForm: { roleName: '', roleStatus: 1, roleSort: null, roleReamark: '' },
  initQuery: { roleName: '', roleStatus: undefined },
  doCreate: addUserRole,
  doDelete: deleteUserRole,
  doUpdate: updateUserRole,
  beforeRefresh: (form) => {
    console.log(form)
    return true
  },
  afterRefresh: (data) => {
    console.log(data)
    return data
  }
})
</script>

<style scoped>
:deep(.selected-row > .n-data-table-td) {
  background-color: #e8f4ff !important;
}
</style>
