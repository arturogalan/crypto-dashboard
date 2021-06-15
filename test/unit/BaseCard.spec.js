import { mount } from '@vue/test-utils'
import BaseCard from '../../src/components/BaseCard.vue'
const MOCKS = {
  $t: (key)=> key,
  $n: (number)=> number,
}

describe('BaseCard.vue component', () => {
  it('it renders a prop and its content', () => {
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
        mocks: MOCKS,
      }      
    })
    expect(wrapper.text()).toContain('prop-title')
    expect(wrapper.text()).toContain('prop-content')
  })
  it('if a prop doesnt exist then it renders N/A as value content', () => {
    const wrapper = mount(BaseCard, {
      props: { 
        cardProperties: [
          {
            id: 'non-existent',
            title: 'prop-non-existent-title',
            type: 'string',
          }
        ],
        cardContent: {prop1: 'prop-content'},
      },
      global: {
        mocks: MOCKS,
      }      
    })
    expect(wrapper.text()).toContain('prop-non-existent-title')
    expect(wrapper.text()).toContain('N/A')
  })  
  it('it renders a title and a subtitle passed by slot', () => {
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
      slots: {
        title: 'This is the title',
        subtitle: 'This is the subtitle',
      },
      global: {
        mocks: MOCKS,
      }      
    })
    expect(wrapper.text()).toContain('This is the title')
    expect(wrapper.text()).toContain('This is the subtitle')    
  })
})