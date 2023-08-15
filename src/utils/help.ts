import { createDiscreteApi } from 'naive-ui'

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar']
)

export { message, notification, dialog, loadingBar }