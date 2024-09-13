<template>
    <div class="diy-calendar-wrapper">
      <div class="calendar-header">
        <!-- 左箭头 -->
        <div class="left-arrow" @click="jumpMonth(-1)">
          <svg width="30" height="30">
            <path
              d="M 19,9 L 11,15 18,21"
              stroke="rgba(95,147,238,0.3)"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <!-- 年月标题 -->
        <div class="center-title">{{ targetDateFormat }}</div>
        <!-- 右箭头 -->
        <div class="right-arrow" @click="jumpMonth(1)">
          <svg width="30" height="30">
            <path
              d="M 11,9 L 18,15 11,21"
              stroke="rgba(95,147,238,0.3)"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <!-- 日历主体 -->
      <table class="diy-calendar-table">
        <!-- 星期栏 -->
        <thead>
          <tr class="table-header-row">
            <th
              v-for="day in dayNameList"
              :key="day.chineseShortName"
              class="table-header"
            >
              {{ day.shortName }}
            </th>
          </tr>
        </thead>
        <!-- 日期部分 -->
        <tbody>
          <tr
            class="table-body-row"
            v-for="(row, index) in calendarData"
            :key="index"
          >
            <td
              v-for="col in row"
              class="table-data"
              :data-date="col.dateNumber"
              :key="`${col.dateObj.getMonth()}-${col.dateNumber}`"
            >
              <div class="td-content-box">
                <div
                  class="content-border"
                  :class="{ selected: isSelectedDate(col) }"
                  @click="checkoutTargetDate(col)"
                >
                  <div
                    class="date-number"
                    :class="{ current: isCurrentMonth(col) }"
                  >
                    {{ col.dateNumber }}
                  </div>
                  <!--<div class="the-tradition-chinese-calendar">
                    {{ col.dateObj }}
                  </div>-->
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script setup>
  import { reactive, ref, computed, watch } from "vue";

  const props = defineProps({
    modelValue: Date,
  });

  const emits = defineEmits(["update:modelValue"]);

  /**
   * 最小年份
   */
  const MIN_YEAR = 1900;
  /**
   * 最大年份
   */
  const MAX_YEAR = 9999;

  /**
   * 目标日期
   * @type {Ref<Date>}
   */
  const targetDate = ref(props.modelValue);

  /**
   * 有关月度的名称列表
   */
  const monthNameList = {
    chineseFullName: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    fullName: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    mmm: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  /**
   * 有关周几的名称列表
   */
  const dayNameList = [
    {
      chineseFullName: "周日",
      chineseShortName: "日",
      fullName: "Sunday",
      shortName: "Sun",
      dayNumber: 0,
    },
    {
      chineseFullName: "周一",
      chineseShortName: "一",
      fullName: "Monday",
      shortName: "Mon",
      dayNumber: 1,
    },
    {
      chineseFullName: "周二",
      chineseShortName: "二",
      fullName: "Tuesday",
      shortName: "Tue",
      dayNumber: 2,
    },
    {
      chineseFullName: "周三",
      chineseShortName: "三",
      fullName: "Wednesday",
      shortName: "Wed",
      dayNumber: 3,
    },
    {
      chineseFullName: "周四",
      chineseShortName: "四",
      fullName: "Thursday",
      shortName: "Thu",
      dayNumber: 4,
    },
    {
      chineseFullName: "周五",
      chineseShortName: "五",
      fullName: "Friday",
      shortName: "Fri",
      dayNumber: 5,
    },
    {
      chineseFullName: "周六",
      chineseShortName: "六",
      fullName: "Saturday",
      shortName: "Sat",
      dayNumber: 6,
    },
  ];
  /**
   * 今日
   */
  const today = new Date();

  /**
   * 日历的各项属性
   */
  const calendarProps = reactive({
    target: {
      year: null,
      month: null,
      date: null,
      day: null,
      monthShortName: null,
      monthFullName: null,
      monthChineseFullName: null,
      firstDay: null,
      firstDayIndex: null,
      totalDays: null,
    },
    previous: {
      totalDays: null,
    },
  });

  /**
   * 用于展现的日历数据
   */
  const calendarData = ref([]);

  initCalendar();

  /**
   * 初始化日历数据
   */
  function initCalendar() {
    setCalendarProps();
    setCalendarData();
  }

  /**
   * 设置日历的各个属性，比如当前年月日，本月一共多少天，上个月一共多少天等等
   */
  function setCalendarProps() {
    if (!targetDate.value) {
      targetDate.value = today;
    }
    // 获取目标日期的年月日星期几数据
    calendarProps.target.year = targetDate.value.getFullYear();
    calendarProps.target.month = targetDate.value.getMonth();
    calendarProps.target.date = targetDate.value.getDate();
    calendarProps.target.day = targetDate.value.getDay();

    if (
      calendarProps.target.year < MIN_YEAR ||
      calendarProps.target.year > MAX_YEAR
    ) {
      console.error("无效的年份，请检查传入的数据是否是正常");
      return;
    }

    // 获取到目标日期的月份【中文】名称
    let dateString;
    dateString = targetDate.value.toString().split(" ");
    calendarProps.target.monthShortName = dateString[1];
    calendarProps.target.monthFullName =
      monthNameList.fullName[calendarProps.target.month];
    calendarProps.target.monthChineseFullName =
      monthNameList.chineseFullName[calendarProps.target.month];
    // 获取目标月份的第一天是星期几，和在星期几中的索引值
    const targetMonthFirstDay = new Date(
      calendarProps.target.year,
      calendarProps.target.month,
      1
    );
    calendarProps.target.firstDay = targetMonthFirstDay.getDay();
    calendarProps.target.firstDayIndex = dayNameList.findIndex(
      (day) => day.dayNumber === calendarProps.target.firstDay
    );

    // 获取目标月份总共多少天
    const targetMonthLastDay = new Date(
      calendarProps.target.year,
      calendarProps.target.month + 1,
      0
    );
    calendarProps.target.totalDays = targetMonthLastDay.getDate();

    // 获取目标月份的上个月总共多少天
    const previousMonth = new Date(
      calendarProps.target.year,
      calendarProps.target.month,
      0
    );
    calendarProps.previous.totalDays = previousMonth.getDate();

    console.log('calendarProps:',calendarProps);
  }

  /**
   * 生成日历的数据
   */
  function setCalendarData() {
    let i;
    let date = 1;
    const originData = [];
    const firstRow = [];
    // 设置第一行数据
    for (i = 0; i <= 6; i++) {
      // 设置目标月份之前月份的日期数据
      if (i < calendarProps.target.firstDayIndex) {
        const previousDate =
          calendarProps.previous.totalDays -
          calendarProps.target.firstDayIndex +
          (i + 1);
        firstRow.push({
          dateObj: new Date(
            calendarProps.target.year,
            calendarProps.target.month - 1,
            previousDate
          ),
          dateNumber: previousDate,
          dateType: "previous",
        });
      } else {
        // 设置目标月份当月的日期数据
        firstRow.push({
          dateObj: new Date(
            calendarProps.target.year,
            calendarProps.target.month,
            date
          ),
          dateNumber: date,
          dateType: "current",
        });
        date++;
      }
    }
    originData.push(firstRow);
    // 设置后面五行的数据
    for (let j = 0; j <= 4; j++) {
      const rowData = [];
      for (let k = 0; k <= 6; k++) {
        // 设置目标月份剩下的日期数据
        if (date <= calendarProps.target.totalDays) {
          rowData.push({
            dateObj: new Date(
              calendarProps.target.year,
              calendarProps.target.month,
              date
            ),
            dateNumber: date,
            dateType: "current",
          });
        } else {
          // 设置目标月份下个月的日期数据
          const nextDate = date - calendarProps.target.totalDays;
          rowData.push({
            dateObj: new Date(
              calendarProps.target.year,
              calendarProps.target.month + 1,
              nextDate
            ),
            dateNumber: nextDate,
            dateType: "next",
          });
        }
        date++;
      }
      originData.push(rowData);
    }
    calendarData.value = originData;
  }

  /**
   * 是否是被选中的日期
   * @param col 日期数据
   */
  function isSelectedDate(col) {
    const colDateObj = col.dateObj;
    const colYear = colDateObj.getFullYear();
    const colMonth = colDateObj.getMonth();
    const colDate = colDateObj.getDate();

    const targetDateYear = targetDate.value.getFullYear();
    const targetDateMonth = targetDate.value.getMonth();
    const targetDateDate = targetDate.value.getDate();

    if (
      colYear === targetDateYear &&
      colMonth === targetDateMonth &&
      colDate === targetDateDate
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 是否是当前月份
   * @param col 日期数据
   */
  function isCurrentMonth(col) {
    if (col.dateType !== "current") {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 切换目标日期
   * @param col 日期数据
   */
  function checkoutTargetDate(col) {
    const currentDate = col.dateObj;
    const oldDate = targetDate.value;
    // 如果本次点击的日期是当前选中的日期，则停止执行
    if (currentDate.getTime() === oldDate.getTime()) {
      return;
    }
    if (col.dateType === "current") {
      targetDate.value = col.dateObj;
      setCalendarProps();
    } else {
      targetDate.value = col.dateObj;
      initCalendar();
    }
  }

  /**
   * 跳转月份
   * @param flag 跳转数字标识，+1，就是增加一个月，-1就是减少一个月
   */
  function jumpMonth(flag) {
    let targetMonthNumber = calendarProps.target.month;
    let targetYear = calendarProps.target.year;
    targetDate.value = calendarProps.target.date;
    targetMonthNumber += flag;
    if (targetMonthNumber > 11) {
      targetYear += 1;
      targetMonthNumber = 0;
    } else if (targetMonthNumber < 0) {
      targetYear -= 1;
      targetMonthNumber = 11;
    }
    targetDate.value = new Date(targetYear, targetMonthNumber, targetDate.value);
    initCalendar();
  }

  const targetDateFormat = computed(() => {
    const monthNumber = targetDate.value.getMonth() + 1
    let monthString = "";

    if(monthNumber > 10){
      monthString = monthNumber + '';
    } else {
      monthString = '0' + monthNumber;
    }
    return `${targetDate.value.getFullYear()}.${monthString}`;
  });

  watch(targetDate, (newVal) => {
    emits("update:modelValue", newVal);
  });
  </script>

  <style scoped lang="scss">
  .diy-calendar-wrapper {
    width: auto;
    height: 100%;

    .calendar-header {
      height: 54px;
      padding: 13px 0;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      user-select: none;

      .left-arrow,
      .right-arrow {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(95, 147, 238, 0.06);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 1px solid rgba(95, 147, 238, 0.06);
        transition: all 0.2s;
        overflow: hidden;

        &:hover {
          border: 1px solid rgba(95, 147, 238, 0.5);
        }
      }

      .center-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Magneto;
        font-size: 30px;
        font-weight: bold;
      }
    }

    .diy-calendar-table {
      width: 100%;
      user-select: none;
      border-collapse: collapse;

      .table-header-row {
        height: 32px;
        background-color: rgba(95, 147, 238, 0.06);

        .table-header {
          font-size: 16px;
          text-align: center;
          font-family: "Lucida Handwriting";
          font-weight: bold;
        }
      }

      .table-body-row {
        height: 75px;

        .table-data {
          text-align: center;

          .td-content-box {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .content-border {
              position: relative;
              width: 60px;
              height: 60px;
              border-radius: 10px;
              cursor: pointer;
              transition: all ease 0.3s;

              .table-badge {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                position: absolute;
                right: 3px;
                top: 3px;
                background-color: rgba(20, 167, 59, 0.5);
                color: #ffffff;
                font-size: 10px;
                transition: all ease 0.3s;

                &.current {
                  background-color: #14a73b;
                  font-weight: normal;
                }
              }

              .date-number {
                width: 100%;
                position: absolute;
                left: 0;
                text-align: center;
                top: 20px;
                font-size: 18px;
                line-height: 20px;
                transition: all ease 0.3s;
                font-family: Magneto;
                font-weight: normal;
                color: rgba(42, 63, 103, 0.48);

                &.current {
                  color: #435069;
                  font-weight: bold;
                }
              }

              .the-tradition-chinese-calendar {
                width: 40px;
                position: absolute;
                left: 10px;
                top: 34px;
                font-size: 10px;
                transition: all ease 0.2s;
              }

              &.selected {
                background: #023f99;

                .table-badge {
                  background: #ffffff;
                  color: #023f99;
                }

                .date-number {
                  color: #ffffff;
                }

                .the-tradition-chinese-calendar {
                  color: #ffffff;
                }

                &::before,
                &::after {
                  content: "";
                  position: absolute;
                  width: 80px;
                  height: 80px;
                  border: 3px solid rgba(2, 63, 153, 0.5);
                  border-radius: 10px;
                  inset: -10px;
                }

                &::before {
                  animation: pathRotate1 4s linear infinite;
                }
                &::after {
                  animation: pathRotate2 4s linear infinite;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes pathRotate1 {
    0%,
    100% {
      clip-path: inset(0 0 95% 0);
    }
    25% {
      clip-path: inset(0 0 0 95%);
    }
    50% {
      clip-path: inset(95% 0 0 0);
    }
    75% {
      clip-path: inset(0 95% 0 0);
    }
  }

  @keyframes pathRotate2 {
    0%,
    100% {
      clip-path: inset(95% 0 0 0);
    }
    25% {
      clip-path: inset(0 95% 0 0);
    }
    50% {
      clip-path: inset(0 0 95% 0);
    }
    75% {
      clip-path: inset(0 0 0 95%);
    }
  }
  </style>
