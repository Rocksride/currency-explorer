<template>
  <nav class="nav">
    <ul class="list">
      <li v-for="link in linkList" class="list__item">
        <RouterLink class="list__link" :to="link.url">{{ link.title }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

type LinkItem = {
  title: string
  url: string
}
defineProps({
  linkList: {
    type: Array as PropType<LinkItem[]>,
    default: [
      {
        url: '/',
        title: 'Головна'
      },
      {
        url: '/changed-currency',
        title: 'Змінені'
      },
      {
        url: '/search-currency',
        title: 'Пошук'
      }
    ]
  }
})
</script>
<style lang="scss" scoped>
.nav {
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  padding: 20px;
}

.list {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  &__item {
    list-style: none;
  }
  &__link {
    font-family: 'Roboto', sans-serif;
    padding: 10px 15px;
    font-weight: 300;
    font-size: 30px;
    text-decoration: none;
    color: black;
    @media only screen and (max-width: 600px) {
      padding: 6px 10px;
      font-size: 20px;
    }
  }
}
</style>
