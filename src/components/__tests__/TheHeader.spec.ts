import { describe, it, expect } from 'vitest'

import TheHeader from '../TheHeader.vue'
import { mount } from '@vue/test-utils'

describe('TheHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(TheHeader, {
      props: {
        linkList: [
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

    expect(wrapper.text()).toContain('ГоловнаЗміненіПошук')
  })
})