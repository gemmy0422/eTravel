import { shallowMount, mount } from '@vue/test-utils'
import CustomInput from '@/components/common/CustomInput'
import { formatISO, addYears } from 'date-fns'
import { mutations } from '@/store/mutations'
import { getters } from '@/store/getters'
import { state } from '@/store/state'

describe('CustomInput testing', () => {
  const wrapperShallow = (propsData = {
    inputType: 'text',
    inputId: 'for_test',
    labelTitle: 'for_test',
    placeholder: 'type something'
  }, options) => shallowMount(CustomInput, {propsData, ...options})
  const wrapper = (propsData = {
    inputType: 'text',
    inputId: 'for_test',
    labelTitle: 'for_test',
    placeholder: 'type something'
  }, options) => mount(CustomInput, {propsData, ...options})
  describe('Element exist testing', () => {
    test('is CustomInput exist', () => {
      expect(wrapperShallow().exists).toBeTruthy()
    })
    test('is CustomInput contains inputGroup', () => {
      expect(wrapperShallow().get('.inputGroup')).toBeTruthy()
    })
    test('is CustomInput contains input', () => {
      expect(wrapperShallow().get('input')).toBeTruthy()
    })
    test('is CustomInput contains label', () => {
      expect(wrapperShallow().get('label')).toBeTruthy()
    })
  })
  describe('Props: is props value pass success', () => {
    test('is inputType pass to input attribute', () => {
      expect(wrapperShallow().get('[type="text"]')).toBeTruthy()
    })
    test('is inputId pass to input attribute', () => {
      expect(wrapperShallow().get('[id="for_test"]')).toBeTruthy()
    })
    test('is inputId pass to label for name', () => {
      expect(wrapperShallow().get('label[for="for_test"]')).toBeTruthy()
    })
    test('is labelTitle pass to label context', () => {
      expect(wrapperShallow().get('label').text()).toBe('for_test')
    })
    test('is placeholder pass to input attribute', () => {
      expect(wrapperShallow().get('[placeholder="type something"]')).toBeTruthy()
    })
    test('is isHalfWidth pass to inputGroup v-bind:class', () => {
      expect(wrapperShallow().classes('.width-half')).toBeFalsy()
    })
  })
  describe('Created: is behavior success', () => {
    const inputDate = wrapperShallow({
      inputType: 'date',
      inputId: 'test_date',
      labelTitle: 'test_date'
    }).get('input')
    const inputNotDate = wrapperShallow().get('input')
    test('if inputType is date then set value to minDate and maxDate', () => {
      expect(inputDate.attributes('min')).toBe(formatISO(new Date(), { representation: 'date' }))
      expect(inputDate.attributes('max')).toBe(formatISO(new Date(addYears(new Date(inputDate.attributes('min')), 1)), { representation: 'date' }))
    })
    test('if inputType is not date then do nothing to minDate and maxDate', () => {
      expect(inputNotDate.attributes('min')).toBe('')
      expect(inputNotDate.attributes('max')).toBe('')
    })
  })
  describe('Getters: is import success', () => {
    test('is get dateError success', () => {
      expect(getters.dateError).toBeTruthy()
    })
  })
  describe('Methods: is changeFn fire success', () => {
    test('is $emit fire success', async() => {

    })
    test('if dateError equal to true then clear inputBindVal', () => {
      mutations.dateErrorFn(state, true)
      expect(wrapperShallow().get('input').text()).toBe('')
    })
  })
  describe('Watch: is behavior success', () => {
    test('if $attrs.value equal to empty string then clear inputBindVal', () => {
      wrapperShallow().vm.$attrs.value = ''
      expect(wrapperShallow().get('input').text()).toBe('')
    })
  })
})