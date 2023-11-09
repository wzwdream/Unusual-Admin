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
        :cascade="false"
        allow-checking-not-loaded
        @load="onLoad"
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
        <n-grid x-gap="12" :cols="6">
          <n-gi span="3">
            <n-form-item label="菜单类型" path="isDir">
              <n-radio-group v-model:value="modalForm.isDir" name="isDir">
                <n-radio-button :key="1" :value="1" label="目录" />
                <n-radio-button :key="0" :value="0" label="菜单" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi span="3">
            <n-form-item label="菜单图标" path="icon">
              <n-select v-model:value="modalForm.icon" :options="icons" :renderLabel="renderLabel" filterable clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="2">
            <n-form-item label="菜单可见" path="visibily">
              <n-radio-group v-model:value="modalForm.visibily" name="visibily">
                <n-radio-button :key="1" :value="1" label="是" />
                <n-radio-button :key="0" :value="0" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi v-show="!modalForm.isDir" span="2">
            <n-form-item label="菜单缓存" path="keepAlive">
              <n-radio-group v-model:value="modalForm.keepAlive" name="keepAlive">
                <n-radio-button :key="1" :value="1" label="是" />
                <n-radio-button :key="0" :value="0" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi span="2" v-show="!modalForm.isDir">
            <n-form-item label="外链菜单" path="externalLink">
              <n-radio-group v-model:value="modalForm.externalLink" name="externalLink">
                <n-radio-button :key="1" :value="1" label="是" />
                <n-radio-button :key="0" :value="0" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi v-show="!!modalForm.externalLink" span="3">
            <n-form-item label="外链菜单链接" path="link">
              <n-input v-model:value="modalForm.link" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="6">
            <n-form-item label="菜单标题" path="title">
              <n-input v-model:value="modalForm.title" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="3">
            <n-form-item label="菜单排序" path="sort">
              <n-input-number v-model:value="modalForm.sort" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="3">
            <n-form-item label="路由地址" path="path">
              <n-input v-model:value="modalForm.path" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-show="!modalForm.isDir" span="3">
            <n-form-item label="组件名称" path="name">
              <n-input v-model:value="modalForm.name" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-show="!modalForm.isDir" span="3">
            <n-form-item label="组件路径" path="component">
              <n-input v-model:value="modalForm.component" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="6">
            <n-form-item label="上级菜单" path="pid">
              <n-tree-select
                :options="options"
                filterable
                clearable
                :default-value="modalForm.pid"
                label-field="title"
                key-field="id"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
        <!-- <n-form-item label="权限标识" path="title">
          <n-input v-model:value="modalForm.title" clearable />
        </n-form-item> -->
      </n-form>
    </BasicModel>
  </div>
</template>

<script setup lang="ts" name="UserMenu">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import TableAction from '@/components/basic/tableAction.vue'
import Icon from '@/components/icon/index.vue'
import { useBasicList } from '@/components/basic/useBasicList/index'
import { type TreeMenu } from '@/type/menu'
import { addUserMenu, delUserMenu, editUserMenu, getUserMenu } from '@/api/user/menu'
import { useMenuStore } from '@/store/menu'
import { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import { icons, renderLabel } from '@/utils/icon'

// 表格
const columns = ref<Array<DataTableColumn<TreeMenu>>>([
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
    key: 'icon',
    render(row) {
      return h(Icon, { icon: row.icon || '' })
    }
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
    key: 'externalLink',
    render(row) {
      return h('span',row.externalLink === 0 ? '否' : '是')
    }
  },
  {
    title: '缓存',
    key: 'keepAlive',
    render(row) {
      return h('span',row.keepAlive === 0 ? '否' : '是')
    }
  },
  {
    title: '可见',
    key: 'visibily',
    render(row) {
      return h('span',row.visibily === 0 ? '否' : '是')
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
            onHandleDelete: () => handleDelete([row.id as number]),
            onHandleEdit: () => handleEdit(row),
            onHandleView: () => handleView(row)
          },
        )
      ]
    }
  }
])

// 树形表格懒加载
const onLoad = (row: Record<string, unknown>) => {
  return getUserMenu({ pid: row.id }).then(res => {
    row.children = res.data
  })
}

// 上级菜单选择
const menuStore = useMenuStore()
const menu = [{id: 0, title: '顶级菜单', isLeaf: false, children: menuStore.treeMenu}] as unknown as TreeSelectOption[]
const options = ref(menu)
// 表格hooks
interface Query {
  title?: string
  pid?: number
}
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
} = useBasicList<TreeMenu, Query>({
  name: '菜单',
  url: '/userMenu',
  key: 'id',
  isPagination: false,
  initForm: { pid: 0, path: '', title: '', visibily: 1, isDir: 1, icon: '', name: '', component: '', keepAlive: 0, externalLink: 0, link: '', sort: 1 },
  initQuery: { pid: 0, title: '' },
  // 搜索前
  beforeRefresh: (query) => {
    if (query && query.title) {
      query.pid = undefined
    }
    return query
  },
  doDelete: delUserMenu,
  doCreate: addUserMenu,
  doUpdate: editUserMenu
})
</script>

<style scoped>
:deep(.selected-row > .n-data-table-td) {
  background-color: #e8f4ff !important;
}
</style>
