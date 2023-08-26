<template>
  <n-layout-content :native-scrollbar="false" :scrollbar-props="{ xScrollable: true}" bg-white dark:bg-dark class="h-[calc(100vh-90px)]">
    <n-back-top :visibility-height=" 10 " bottom="120" />
    <main p-10>
      <router-view v-slot=" { Component, route } ">
        <Transition :duration=" 550 " name="nested">
          <KeepAlive>
            <component :is="Component" :key=" route.fullPath " />
          </KeepAlive>
        </Transition>
      </router-view>
    </main>
  </n-layout-content>
</template>