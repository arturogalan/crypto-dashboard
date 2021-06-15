// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import BaseCard from '../../src/components/BaseCard.vue'

describe('BaseCard', () => {
  it('should display header text', () => {
    const wrapper = mount(BaseCard, {
      props: { 
        cardProperties: [
          {
            id: 'prop1',
            title: 'prop-title',
            type: 'string',
          }
        ],
        cardContent: {prop1: 'prop-content'},
      },
      global: {
        mocks: {
          $t: (key)=> key,
          $n: (number)=> number,
        }
      }      
    })
    expect(wrapper.text()).toContain('prop-title')
    expect(wrapper.text()).toContain('prop-content')

  })
})