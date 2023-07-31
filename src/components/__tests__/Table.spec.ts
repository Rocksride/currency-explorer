import { describe, it, expect, vi, beforeEach } from 'vitest'

import Table from '../Table.vue'
import { mount, shallowMount } from '@vue/test-utils'
import { useRouter } from 'vue-router'

describe('Table', () => {
  // useRouter.mockReturnValue({
  //   push: vi.fn(),
  // })
  // beforeEach(() => {
  //   useRouter().push.mockReset()
  // })
  it('renders properly', () => {
    const wrapper = shallowMount(Table, {
      props: {
        items: [
          {
            r030: 36,
            txt: 'Австралійський долар',
            rate: 24.863,
            cc: 'AUD',
            exchangedate: '28.07.2023'
          },
          {
            r030: 124,
            txt: 'Канадський долар',
            rate: 27.7624,
            cc: 'CAD',
            exchangedate: '28.07.2023'
          }
        ],
        routePrefix: 'latest-currency'
      }
    })

    expect(wrapper.text()).toContain(`'<thead data-v-83c58b0d=""><tr data-v-83c58b0d=""><th data-v-83c58b0d="">Назва валюти</th><th data-v-83c58b0d="">Код цифровий</th><th data-v-83c58b0d="">Код літерний</th><th data-v-83c58b0d="">Офіційний курс</th></tr></thead><tr data-v-83c58b0d="" class="row"><td data-v-83c58b0d="">Австралійський долар</td><td data-v-83c58b0d="">36</td><td data-v-83c58b0d="">AUD</td><td data-v-83c58b0d="">24.863</td></tr><tr data-v-83c58b0d="" class="row"><td data-v-83c58b0d="">Канадський долар</td><td data-v-83c58b0d="">124</td><td data-v-83c58b0d="">CAD</td><td data-v-83c58b0d="">27.7624</td></tr>'`)
  })
})
