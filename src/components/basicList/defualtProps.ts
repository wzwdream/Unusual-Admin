import { NDataTable } from 'naive-ui'

export const defualtProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props，保证该组件可以像使用原组件一样
  add: {
    type: Boolean,
    default: true
  },
  del: {
    type: Boolean,
    default: true
  },
  edit: {
    type: Boolean,
    default: true
  },
  download: {
    type: Boolean,
    default: true
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  querybar: {
    type: Boolean,
    default: true
  }
}
