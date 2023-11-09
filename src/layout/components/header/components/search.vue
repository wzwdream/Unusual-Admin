<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-20 text @click="showModal = true">
        <Icon icon="mdi:magnify" />
      </n-button>
    </template>
    {{ $t('header.search') }}(Control+K)
  </n-tooltip>
  <n-modal
    v-model:show="showModal"
    style="width:560px;position:fixed;top:100px;left:50%;transform:translateX(-280px);"
    :bordered="false"
    :closable="false"
    :on-after-leave="afterCloseModal"
  >
    <n-card
      :bordered="false"
      :segmented="{ content: true, footer: 'soft' }"
      content-style="padding-top: 0;border-top: none;"
      footer-style="padding: 0;"
    >
    <template #header>
      <n-input v-model:value="searchValue" type="text" :placeholder="$t('header.seachPlaceholder')" />
    </template>
    <n-empty v-if="result.length <= 0" :description="$t('header.searchEmpty')" />
    <n-scrollbar v-else max-h-300>
      <n-list>
        <n-list-item v-for="(item, index) in result" :key="item.path" mb-5 b-rd-4 :class="{ 'bg-primary': actived === index }" @mouseenter="changeActive(index)" @click="jumpTo">
          <n-space justify="space-between" :wrap="false" px-15>
            <div>
              <span>{{ item.title }}</span>
              <span font-size-12 color-blueGray>（{{ item.title }}）</span>
            </div>
            <Icon icon="uil:enter" />
          </n-space>
        </n-list-item>
      </n-list>
    </n-scrollbar>
    <template #footer>
      <div class="h-[54px] flex flex-items-center">
        <span class="mr-[14px] flex flex-items-center">
          <Icon class="icon text-[20px] p-[2px] mr-[5px]" icon="uil:enter" />
          <span>{{ $t('header.enter') }}</span>
        </span>
        <span class="mr-[14px] flex flex-items-center">
          <Icon class="icon text-[20px] p-[2px] mr-[5px]" icon="material-symbols:arrow-upward" />
          <Icon class="icon text-[20px] p-[2px] mr-[5px]" icon="material-symbols:arrow-downward" />
          <span>{{ $t('header.toggle') }}</span>
        </span>
        <span class="flex flex-items-center">
          <Icon class="icon text-[20px] p-[2px] mr-[5px]" icon="material-symbols:close-rounded" />
          <span>{{ $t('header.close') }}</span>
        </span>
      </div>
    </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts" name="Search">
import { onKeyStroke } from '@vueuse/core'
import { useMenuStore } from '../../../../store/menu';
import { type TreeMenu } from '@/type/menu'

const showModal = ref(false)
const searchValue = ref('')

// 当前选中
const actived = ref(0)
const changeActive = (val: number) => {
  actived.value = val
}

const menuStore = useMenuStore()
// 查找符合条件的路由
const result = computed(() => {
  return searchRoute(searchValue.value, menuStore.menu)
})
const searchRoute = (val: string, route: TreeMenu[] = []) => {
  const R: TreeMenu[] = []
  if ((val ?? '') === '') return R
  route.forEach(item => {
    if (item.children) {
      R.push(...searchRoute(val, item.children))
    } else {
      const title = item.title
      if (item.path.includes(val) || title?.includes(val)) {
        R.push(item)
      }
    }
  })
  return R
}

// 关闭模态框后恢复默认值
const afterCloseModal = () => {
  actived.value = 0
  searchValue.value = ''
}

// 点击跳转
const jumpTo = () => {
  const path = result.value[actived.value].path
  showModal.value = false
  router.push(path)
}

// 键盘事件
const router = useRouter()
const handleEnter = (e: KeyboardEvent) => {
  if (!showModal.value || result.value.length <= 0 || (searchValue.value ?? '') === '') return
  e.preventDefault()
  jumpTo()
}

const handleUpOrDown = (type: 'up' | 'down') => {
  const length = result.value.length
  if (!showModal.value || length <= 0 || (searchValue.value ?? '') === '') return
  if (type === 'up') {
    actived.value = actived.value === 0 ? length - 1 : actived.value - 1
  } else {
    actived.value = actived.value === length - 1 ? 0 : actived.value + 1
  }
}

const openSearch = (e: KeyboardEvent) => {
  if (e.ctrlKey) {
    e.preventDefault()
    showModal.value = true
  }
}

onKeyStroke('Enter', (e) => handleEnter(e))
onKeyStroke('ArrowUp', () => handleUpOrDown('up'))
onKeyStroke('ArrowDown', () => handleUpOrDown('down'))
onKeyStroke('k', (e) => openSearch(e))
</script>

<style scoped>
.icon {
  box-shadow:
    inset 0 -2px #cdcde6,
    inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
}
</style>