<script lang="ts">
import { ref, computed, watch, defineComponent, type PropType } from 'vue'
import type { CurrencyShape } from '@/types'

export default defineComponent({
  props: {
    pageSize: {
      required: true,
      type: Number,
      default: 3
    },
    items: {
      required: true,
      type: Array as PropType<CurrencyShape[]>,
      default: []
    },
    page: {
      type: Number,
      default: 1
    },
    searchStr: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const currentPage = ref(props.page)

    const isShowNextPageButton = computed(() => {
      return props.items.length > props.pageSize * (currentPage.value)
    })
    const isShowPreviousButton = computed(() => {
      return currentPage.value > 1
    })
    const visibleItems = computed(() => {
      return props.items.slice(
        props.pageSize * (currentPage.value - 1),
        props.pageSize * (currentPage.value - 1) + props.pageSize
      )
    })

    const filteredItems = computed(() => {
      if (props.searchStr === '') return visibleItems.value
      var regex = new RegExp(props.searchStr, 'i')
      return props.items.filter(el => {
        return regex.test(el.txt)
      })
    })
    
    watch(
      () => props.page,
      newPage => {
        currentPage.value = newPage
      }
    )

    return () =>
      ctx.slots.default({
        pageSize: props.pageSize,
        visibleItems: filteredItems.value,
        currentPage: currentPage.value,
        items: props.items.value,
        isShowNextPageButton: isShowNextPageButton.value,
        isShowPreviousButton: isShowPreviousButton.value,
      })
  }
})
</script>
