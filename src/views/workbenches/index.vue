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
            <span>欢迎使用MineAdmin后台权限管理系统。{{ description }}</span>
            <n-space justify="space-between">
              <span>喜欢的帮忙点个 ⭐Star。</span>
              <div>
                <n-button mr-10>开发文档</n-button>
                <n-button type="primary"
                  @click="jumpTo('https://github.com/wzwdream/widgets-for-windows')">代码仓库</n-button>
              </div>
            </n-space>
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
              <n-grid-item>
                <n-card class="cursor-pointer" hoverable title="vue3-draggable-grid" size="small">
                  <p op-60>一个基于vue3+grid布局的网格拖拽布局，支持网格吸附、碰撞检测等。<a class="link" href="https://github.com/wzwdream/vue3-draggable-grid">链接地址</a></p>
                </n-card>
              </n-grid-item>
              <n-grid-item v-for="i in 5" :key="i">
                <n-card class="cursor-pointer" hoverable title="Unusual Admin" size="small">
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
              <n-timeline-item v-for="item in commits" :key="item.sha" :type="getColor(item.commit.message)"
                :title="item.commit.message" :content="item.commit.author.name" :time="item.commit.author.date" />
            </n-timeline>
          </n-scrollbar>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-grid cols="1 s:1 m:2 l:2 xl:2" :x-gap="12" :y-gap="8" mt-15 responsive="screen">
      <n-grid-item>
        <n-card rounded-10>
          <v-chart v-if="option" w-full h-400 :option="option" :autoresize="true" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card rounded-10>
          <v-chart v-if="mixedChartOptions" w-full h-400 :option="mixedChartOptions" :autoresize="true" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts" name="Workbenches">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { getLanguages, getCommits, getViews, getInfo } from '@/api/github/index'
import { type Languages } from '@/api/github/type'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  BarChart,
  GridComponent
])

// 获取技术栈数据
const option = ref()
getLanguages().then(res => {
  const data = res.data
  const seriesData = Object.keys(data).map((item) => {
    return { value: data[item as keyof Languages], name: item }
  }) || []
  const echartsOption = {
    title: {
      text: '技术栈',
      left: '0',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      right: '0'
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

// 获取仓库信息
const star = ref(0)
const forks = ref(0)
const description = ref('')
getInfo().then(res => {
  const { data } = res
  star.value = data.stargazers_count
  forks.value = data.forks_count
  description.value = data.description
})

// 获取提交记录
const commits = ref()
getCommits().then(res => {
  commits.value = res.data
})

// 获取访问数
const mixedChartOptions = ref()
getViews().then(res => {
  const lData: number[] = []
  const bData: number[] = []
  const xData: string[] = []
  res.data.views.forEach(element => {
    lData.push(element.count)
    bData.push(element.uniques)
    xData.push(new Date(element.timestamp).toLocaleDateString())
  })
  mixedChartOptions.value = {
    title: {
      text: '访客情况',
      left: 'left',
    },
    legend: {
      show: true,
      right: '0'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: [
      {
        type: 'value',
        name: '访问次数',
        min: 0,
        max: 200
      },
      {
        type: 'value',
        name: '访客数量',
        min: 0,
        max: 200
      },
    ],
    series: [
      {
        name: '访问次数',
        type: 'line',
        yAxisIndex: 0,
        data: lData
      },
      {
        name: '访客数量',
        type: 'bar',
        yAxisIndex: 1,
        data: bData
      }
    ]
  }
})

// 跳转外部链接
const jumpTo = (url: string) => {
  window.open(url, '_blank')
}

// 获取时间线的颜色
const getColor = (type: string) => {
  // 'default' | 'success' | 'info' | 'warning' | 'error'
  if (type.includes('feat')) return 'info'
  if (type.includes('fix')) return 'warning'
  if (type.includes('refactor')) return 'error'
  if (type.includes('perf')) return 'success'
  return 'default'
}
</script>

<style scoped>
.link {
  box-shadow: 0 -1px 0 0 #0069c2 inset;
  color: #0069c2;
}
</style>