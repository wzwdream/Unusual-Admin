<template>
  <div :style="`height: ${calcHeight('main')};`" class="wh-full pos-relative">
    <v-chart :option="mapOption" :autoresize="true" @click="handleClick" />
    <n-button v-show="isShowBack" class="pos-absolute top-10 left-10" @click="goBack">返回</n-button>
  </div>
</template>

<script setup lang="ts" name="EchartsMap">
import { use, registerMap } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, EffectScatterChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, VisualMapComponent } from 'echarts/components'
import { calcHeight } from '@/utils/help';

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  MapChart,
  EffectScatterChart
])

const notification = useNotification()
const mapOption = ref()
const mapList = ref < string[] > ([]) // 记录地图
const isShowBack = computed(() => {
  return mapList.value.length !== 0
})

const getMapJson = async (mapName: string) => {
  const url = `../../assets/mapJson/${mapName}.json`
  const mapJson = await import(/* @vite-ignore */ url)
  return mapJson
}

const setOptions = (mapName: string, mapData: any) => {
  return {
    tooltip: {
      show: true,
      formatter: function (params: any) {
        // 根据需要进行数据处理或格式化操作
        if (params && params.data) {
          const { adcode, name, data } = params.data;
          // 返回自定义的tooltip内容
          return `adcode: ${adcode}<br>name: ${name}<br>data: ${data}`;
        }
      },
    },
    geo: {
      map: mapName,
      roam: true,
      select: false,
      // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
      selectedMode: 'single',
      label: {
        show: true
      },
      itemStyle: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0,
            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
      },
      emphasis: {
        itemStyle: {
          areaColor: '#389BB7',
          borderColor: '#389BB7',
          borderWidth: 0
        },
        label: {
          fontSize: 14,
        },
      }
    },
    series: [
      // 数据
      {
        type: 'map',
        map: mapName,
        roam: true,
        geoIndex: 0,
        select: false,
        data: mapData
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        itemStyle: {
          color: '#b02a02'
        },
        data: mapData
      }
    ]
  }
}

const renderMapEcharts = async (mapName: string) => {
  const mapJson = await getMapJson(mapName)
  registerMap(mapName, mapJson);
  const mapdata = mapJson.features.map((item: { properties: any }) => {
    return {
      name: item.properties.name,
      value: item.properties.center, // 中心点经纬度
      adcode: item.properties.adcode, // 区域编码
      level: item.properties.level, // 层级
      data: (Math.random() * 100).toFixed(2) // 模拟数据
    }
  });
  mapOption.value = setOptions(mapName, mapdata)
}

renderMapEcharts('china') // 初始化绘制中国地图

// 点击下砖
const handleClick = (param: any) => {
  // 只有点击地图才触发
  if (param.seriesType !== 'map') return
  const { adcode } = param.data
  // 防止最后一个层级被重复点击，返回上一级出错
  if (mapList.value[mapList.value.length - 1] === adcode) {
    return notification.warning({ content: '已经是最下层了', duration: 1000 })
  }
  mapList.value.push(adcode)
  renderMapEcharts(adcode)
}

// 点击返回上一级地图
const goBack = () => {
  const mapName = mapList.value[mapList.value.length - 2] || 'china'
  mapList.value.pop()
  renderMapEcharts(mapName)
}
</script>