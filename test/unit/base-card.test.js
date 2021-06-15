// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import BaseCard from '../../src/components/BaseCard.vue'

describe('BaseCard', () => {
  it('should display header text', () => {
    const wrapper = mount(BaseCard, {
      props: { 
        cardProperties: [
          {
            name: 'prop1',
            title: 'my title',
            type: 'string',
          }
        ],
        cardContent: {prop1: blabla},
      } 
    })
    const cardbody = wrapper.find('md:grid');
    expect(cardbody.text()).toMatch(/name/);
  })
})