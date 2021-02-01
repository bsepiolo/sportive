import {mount} from '@vue/test-utils'

import Button from './a-sp-button'

describe('@components/atoms/a-sp-button', () => {
    it('renders its content', () => {
        const wrapper = mount(Button, {
            propsData: {
                text: 'Hello world'
            }
        })

        // Assert the rendered text of the component
        expect(wrapper.text()).toContain('Hello world')
    })
    it('clicks the button', async () => {
        const wrapper = mount(Button, {
            propsData: {
                text: 'Hello world'
            }
        })

        // Assert the rendered text of the component
        await wrapper.find('button').trigger('click')
    })
    it('renders button with icon', async () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'eva eva-github'
            }
        })

        // Assert the rendered text of the component
        expect(wrapper.get('span.a-btn__icon')).toBeTruthy()
    })
})