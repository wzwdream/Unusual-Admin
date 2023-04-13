const useDrage = () => {
    // 初始化数据
    const colWidth = ref(0), rowHeight = ref(0)
    const height = computed(() => {
        return `${rowHeight.value}px`
    })
    const layoutStyle = reactive({
        gridTemplateColumns: `repeat(0, minmax(50px, 1fr))`,
        gridAutoRows: `0px`,
        gap: `0px`,
        height: height
    })
    // 更新拖拽中的样式
    const updateStyle = (col: number, rowH: number, gutter: number) => {
        layoutStyle.gridTemplateColumns = `repeat(${col}, ${colWidth.value}px)`
        layoutStyle.gridAutoRows = `${rowH}px`
        layoutStyle.gap = `${gutter}px`
    }
    return {
        colWidth,
        rowHeight,
        layoutStyle,
        updateStyle
    }
}

export default useDrage