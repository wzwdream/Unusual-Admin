<template>
  <div flex-1>
    <n-grid cols="1 s:1 m:2 l:2 xl:2" :x-gap="12" :y-gap="8" responsive="screen">
      <n-grid-item>
        <n-card rounded-10 min-h-150>
          <div flex items-center>
            <img rounded-full width="60" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            <div ml-20>
              <p text-16>Hello, 管理员</p>
              <p mt-5 text-12 op-60>选择了方向与路途，就不要抱怨，一个人只有承担起旅途风雨，才能最终守得住彩虹满天。</p>
            </div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card rounded-10 min-h-150>
          <n-space vertical>
            <span>欢迎使用MineAdmin后台权限管理系统。一个基于 Vue3.0、Vite、Naive UI 的轻量级后台管理模板。</span>
            <span>喜欢的帮忙点个 ⭐Star。</span>
            <n-space>
              <n-tag round type="primary">fork: {{ forks }}</n-tag>
              <n-tag round type="error">star: {{ star }}</n-tag>
              <n-tag round type="warning">MIT协议</n-tag>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid cols="1 s:2 m:2 l:2 xl:2" :x-gap="12" :y-gap="8" mt-15 responsive="screen">
      <n-grid-item>
        <n-card title="项目" size="small" :segmented="true" rounded-10>
          <!-- <template #header-extra>
            <n-button text type="primary">更多</n-button>
          </template> -->
          <n-scrollbar h-500>
            <n-grid cols="1 s:1 m:2 l:2 xl:2" :x-gap="12" :y-gap="8" responsive="screen">
              <n-grid-item v-for="i in 5" :key="i">
                <n-card class="cursor-pointer" hoverable title="Vue Naive Admin" size="small">
                  <p op-60>一个基于 Vue3.0、Vite、Naive UI 的轻量级后台管理模板</p>
                </n-card>
              </n-grid-item>
            </n-grid>
          </n-scrollbar>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="更新日志" size="small" :segmented="true" rounded-10>
          <n-scrollbar h-500>
            <n-timeline v-if="commits" :horizontal="false">
              <n-timeline-item v-for="item in commits" :key="item.sha" :title="item.commit.message"
                :content="item.commit.author.name" :time="item.commit.author.date" />
            </n-timeline>
          </n-scrollbar>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-grid cols="1 s:1 m:2 l:2 xl:2" :x-gap="12" :y-gap="8" mt-15 responsive="screen">
      <n-grid-item>
        <n-card rounded-10>
          <v-chart w-full h-400 :option="option" :autoresize="true" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card rounded-10>
          <v-chart w-full h-400 :option="option" :autoresize="true" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup name="Workbenches">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { getLanguages, getStargazers, getForks, getCommits } from '@/api/github/index'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

// 获取技术栈数据
const option = ref()
getLanguages().then(res => {
  const data = res.data
  const seriesData = Object.keys(data).map((item) => {
    return { value: data[item], name: item }
  }) || []
  const echartsOption = {
    title: {
      text: '技术栈',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      show: true,
      top: '50px'
    },
    series: [
      {
        name: '技术栈',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  option.value = echartsOption
})

// 获取star数量
const star = ref(0)
getStargazers().then(res => {
  star.value = res.data.length
})

// 获取fork数量
const forks = ref(0)
getForks().then(res => {
  forks.value = res.data.length
})
// 获取提交记录
const commits = ref()
getCommits().then(res => {
  commits.value = res.data
})

</script>

<style scoped>
.chart {
  flex: 1 1 400px;
  max-width: 400px;
  min-width: 200px;
  height: 300px;
}
</style>