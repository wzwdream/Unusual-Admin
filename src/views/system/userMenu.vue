<template>
  <div>
    <BasicLayout
      v-model:columns="columns"
      :btnDisabled="btnDisabled"
      :permission="permission"
      :optShow="optShow"
      @search="listQuery"
      @reset="handlereset"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
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
        :checked-row-keys="checkedRowKeys"
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
        :rules="formRules"
        :disabled="modalAction === 'view'"
      >
        <n-grid x-gap="12" :cols="6">
          <n-gi span="3">
            <n-form-item label="菜单类型" path="menuType">
              <n-radio-group v-model:value="modalForm.menuType" name="menuType" :on-update:value="menuTypeChange">
                <n-radio-button :key="1" :value="1" label="目录" />
                <n-radio-button :key="0" :value="0" label="菜单" />
                <n-radio-button :key="2" :value="2" label="按钮" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi v-if="modalForm.menuType !== 2" span="3">
            <n-form-item label="菜单图标" path="icon">
              <n-select v-model:value="modalForm.icon" :options="icons" :renderLabel="renderLabel" filterable clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-if="modalForm.menuType !== 2" span="2">
            <n-form-item label="菜单可见" path="visibily">
              <n-radio-group v-model:value="modalForm.visibily" name="visibily">
                <n-radio-button :key="1" :value="true" label="是" />
                <n-radio-button :key="0" :value="false" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi v-if="!modalForm.menuType" span="2">
            <n-form-item label="菜单缓存" path="keepAlive">
              <n-radio-group v-model:value="modalForm.keepAlive" name="keepAlive">
                <n-radio-button :key="1" :value="true" label="是" />
                <n-radio-button :key="0" :value="false" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi span="2" v-if="!modalForm.menuType">
            <n-form-item label="外链菜单" path="externalLink">
              <n-radio-group v-model:value="modalForm.externalLink" name="externalLink">
                <n-radio-button :key="1" :value="true" label="是" />
                <n-radio-button :key="0" :value="false" label="否" />
              </n-radio-group>
            </n-form-item>
          </n-gi>
          <n-gi v-if="!!modalForm.externalLink && !modalForm.menuType" span="6">
            <n-form-item label="外链链接" path="link">
              <n-input v-model:value="modalForm.link" clearable />
            </n-form-item>
          </n-gi>
          <n-gi :span="modalForm.menuType === 2 ? 3 : 6">
            <n-form-item :label="modalForm.menuType === 2 ? '按钮名称' : '菜单标题'" path="title">
              <n-input v-model:value="modalForm.title" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-if="modalForm.menuType !== 1 && !modalForm.externalLink" span="3">
            <n-form-item label="权限标识" path="competence">
              <n-input v-model:value="modalForm.competence" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="3">
            <n-form-item label="菜单排序" path="sort">
              <n-input-number v-model:value="modalForm.sort" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-if="modalForm.menuType !== 2" span="3">
            <n-form-item label="路由地址" path="path">
              <n-input v-model:value="modalForm.path" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-if="!modalForm.menuType && !modalForm.externalLink" span="3">
            <n-form-item label="组件名称" path="name">
              <n-input v-model:value="modalForm.name" clearable />
            </n-form-item>
          </n-gi>
          <n-gi v-if="!modalForm.menuType && !modalForm.externalLink" span="3">
            <n-form-item label="组件路径" path="component">
              <n-input v-model:value="modalForm.component" clearable />
            </n-form-item>
          </n-gi>
          <n-gi span="6">
            <n-form-item label="上级菜单" path="pid">
              <n-tree-select
                :options="options"
                filterable
                :default-value="modalForm.pid"
                label-field="title"
                key-field="id"
                @update:value="(value) => modalForm.pid = value"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
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
import { addUserMenu, delUserMenu, editUserMenu, getRoleMenu, getUserMenu } from '@/api/user/menu'
import { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import { icons, renderLabel } from '@/utils/icon'
import { type FormRules } from 'naive-ui/es/form/src/interface'

const permission = {
  add: ['admin'],
  del: ['admin'],
  edit: ['admin'],
  download: ['admin']
}
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
      return h('span',row.externalLink ? '否' : '是')
    }
  },
  {
    title: '缓存',
    key: 'keepAlive',
    render(row) {
      return h('span',row.keepAlive ? '否' : '是')
    }
  },
  {
    title: '可见',
    key: 'visibily',
    render(row) {
      return h('span',row.visibily ? '否' : '是')
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

// 树形表格懒加载
const onLoad = (row: Record<string, unknown>) => {
  return getUserMenu({ pid: row.id }).then(res => {
    row.children = res.data.data
  })
}

// 上级菜单选择
const options = ref<TreeSelectOption[]>()

// 表单规则
const formRules: FormRules = {
  title: [{required: true, message: '请输入菜单标题', trigger: 'blur'}],
  path: [{required: true, message: '请输入路由地址', trigger: 'blur'}],
  name: [{required: true, message: '请输入组件名称', trigger: 'blur'}],
  component: [{required: true, message: '请输入组件地址', trigger: 'blur'}],
  link: [{required: true, message: '请输入外链菜单地址', trigger: 'blur'}]
}

// 表格hooks
interface Query {
  title?: string
  pid?: number
}
// 操作按钮显示
const optShow = {
  add: true,
  del: true,
  edit: true,
  view: true,
  download: false
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
} = useBasicList<TreeMenu, Query>({
  name: '菜单',
  url: '/menu',
  key: 'id',
  isPagination: false,
  initForm: { pid: 0, path: '', title: '', visibily: true, menuType: 1, icon: '', name: '', component: '', keepAlive: false, externalLink: false, link: '', sort: 1, competence: '' },
  initQuery: { pid: 0, title: '' },
  // 搜索前
  beforeRefresh: (query) => {
    if (query && query.title) {
      query.pid = undefined
    }
    return query
  },
  beforeAsyncValidate: async () => {
    const result = await getRoleMenu()
    options.value = [{id: 0, title: '顶级菜单', isLeaf: false, children: result.data}] as unknown as TreeSelectOption[]
  },
  beforeSave: (form) => {
    if (form.menuType === 2) form.visibily = true
    return form
  },
  doDelete: delUserMenu,
  doCreate: addUserMenu,
  doUpdate: editUserMenu
})

const menuTypeChange = (val: 0 | 1 | 2) => {
  modalForm.menuType = val
  modalForm.externalLink = false
}
</script>
