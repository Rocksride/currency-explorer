<template>
  <RenderlessTable
    v-if="items.length"
    :page="page"
    :pageSize="currencyStore.pageSize"
    :items="items"
    :searchStr="searchStr"
  >
    <template
      #default="{ visibleItems, pageSize, currentPage, isShowNextPageButton, isShowPreviousButton }"
    >
      <section class="table-header">
        <input
          type="text"
          v-model="searchStr"
          placeholder="Search.."
          class="table-header__search"
          ref="elInputElement"
        />
        <div class="table-header__wrapper">
          <select
            :value="pageSize"
            class="table-header__select"
            name="state"
            @change="changePageSize"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="70">70</option>
            <option value="100">100</option>
            <option value="10000">Show ALL</option>
          </select>
        </div>
      </section>
      <table>
        <thead>
          <tr>
            <th>Назва валюти</th>
            <th>Код цифровий</th>
            <th>Код літерний</th>
            <th>Офіційний курс</th>
          </tr>
        </thead>
        <tr :data-input="'tr-'+i" v-for="(curr, i) in visibleItems" class="row" @click="$router.push(`/currency/${curr.cc}`)">
          <td>{{ curr.txt }}</td>
          <td>{{ curr.r030 }}</td>
          <td>{{ curr.cc }}</td>
          <td>{{ curr.rate }}</td>
        </tr>
      </table>
      <section class="navigation" v-if="showPagination">
        <nav>
          <ul class="pagination">
            <router-link
              v-if="isShowPreviousButton"
              class="pagination__button"
              :to="`/${routePrefix}/${currentPage - 1}`"
            >
              &lt;
            </router-link>
            <router-link
              v-for="page in Math.ceil(items.length / pageSize)"
              class="pagination__button"
              active-class="pagination__button--active"
              :to="`/${routePrefix}/${page}`"
            >
              {{ page }}
            </router-link>
            <router-link
              v-if="isShowNextPageButton"
              class="pagination__button"
              :to="`/${routePrefix}/${currentPage + 1}`"
            >
              &gt;
            </router-link>
          </ul>
        </nav>
        <div class="pagination__caption">
          Показано
          <span v-if="currentPage !== 1"
            >{{ Math.min(pageSize * currentPage, items.length) }} до
          </span>
          {{ Math.min(pageSize * (currentPage + 1), items.length) }} з {{ items.length }} всіх
        </div>
      </section>
    </template>
  </RenderlessTable>
  <h1 v-else class="caption">Даних немає</h1>
</template>

<script setup lang="ts">
import type { CurrencyShape } from '@/types'
import { ref, computed, type PropType, onMounted } from 'vue'
import RenderlessTable from './RenderlessTable.vue'
import { useCurrencyStore } from '../stores/CurrencyStore'
import { useRoute, useRouter } from 'vue-router'

const elInputElement = ref<HTMLInputElement | null>(null)
const route = useRoute()
const page = route.params.currentPage || 1

type PropTypes = {
  items: CurrencyShape[]
  routePrefix?: string
}
const props = defineProps({
  items: {
    type: Array as PropType<CurrencyShape[]>,
    default: []
  },
  routePrefix: {
    type: String
  }
})
const searchStr = ref('')

const currencyStore = useCurrencyStore()
const showPagination = computed(() => {
  return Math.ceil(props.items.length / currencyStore.pageSize) > 1 && searchStr.value === ''
})
function changePageSize(e: Event) {
  const target = e.target
  if (target) currencyStore.pageSize = +(target as HTMLButtonElement).value
}

onMounted(() => {
  elInputElement.value?.focus()
})
</script>

<style lang="scss" scoped>
.table-header {
  width: 100%;
  margin-bottom: 10px;
  &__search {
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #194367;
    background-color: #fff;
    border: 1px solid #ddd;
    flex: 1;
    margin-right: 10px;
  }
  &__select {
    padding: 8px 12px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    flex: 0 0 20%;
  }
}
table {
  width: 100%;
  border-bottom: 1px solid #fff;
}
th {
  padding: 10px;
}
thead th {
  padding: 14px;
  font-size: 18px;
  font-weight: 500;
}
td {
  padding: 8px;
}
@media only screen and (max-width: 600px) {
  td {
    padding: 5px;
  }
  thead th {
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    tr td:first-child {
      width: 200px;
    }
  }
}
tr td:first-child {
  width: 300px;
}
table tr:nth-child(even) {
  background-color: #e4e3e3;
}

th {
  background: #333;
  color: #fff;
}

.navigation {
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.pagination {
  padding: 0;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination {
  display: flex;

  &__caption {
    text-align: right;
    color: #999;
  }
  &__button {
    padding: 8px 14px;
    margin-left: -1px;
    font-size: 16px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
    &--active {
      background-color: #87b9e5;
    }
    &:hover:not(&--active) {
      cursor: pointer;
      background-color: #ecf2f8;
    }

    @media only screen and (max-width: 800px) {
      // font-size: 14px;
      // padding: 6px 8px;
    }
  }
}
.row {
  &:hover {
    cursor: pointer;
    background-color: #87b9e5;
  }
}
</style>
../stores/CurrencyStoreStore