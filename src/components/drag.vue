<template>
  <div id="drag">
    <div class="slide">
      <div id="list">
        <img class="item" src="../assets/IMG_0249.JPG"/>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "drag"
}
</script>

<style lang="scss" scoped>
#drag {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.active {
  cursor: grabbing;
}

.slide {
  width: 260px;
  height: 100%;
  overflow: scroll;
  border-right: 1px solid rgba(0, 0, 0, .15);

  #list {
    user-select: none;

    .item {
      background: rgba(0, 0, 0, .15);
      width: 120px;
      display: inline-block;
      break-inside: avoid;
      margin-bottom: 4px;
    }

    .item:hover {
      cursor: grab;
      filter: brightness(90%);
    }

    .item:active {
      cursor: grabbing;
    }

  }

  .grid {
    column-count: 2;
    column-gap: 0px;
  }

}

.slide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

#content {
  position: relative;
  flex: 1;
  height: 100%;
  margin-left: 45px;
  background: rgba(0, 0, 0, .07);

  .item {
    position: absolute;
    transform-origin: top left;
  }

}

</style>
