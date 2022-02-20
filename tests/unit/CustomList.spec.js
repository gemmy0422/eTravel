import { shallowMount } from '@vue/test-utils'
import CustomList from '@/components/common/CustomList'

describe('CustomList testing', () => {
  const wrapperShallow = (propsData = {
    type: 'text',
    title: 'for_test',
    placeholder: 'type something'
  }) => shallowMount(CustomList, {propsData})
  describe('Element exist testing', () => {
    test('is CustomInput exist', () => {
      expect(wrapperShallow().exists).toBeTruthy()
    })
    test('is CustomInput contains listGroup', () => {
      expect(wrapperShallow().get('.listGroup')).toBeTruthy()
    })
    test('is CustomInput contains span', () => {
      expect(wrapperShallow().get('span')).toBeTruthy()
    })
    test('is CustomInput contains input', () => {
      expect(wrapperShallow().get('input')).toBeTruthy()
    })
  })
  describe('Props: is props value pass success', () => {
    test('is type pass to input attribute', () => {
      expect(wrapperShallow().get('[type="text"]')).toBeTruthy()
    })
    test('is placeholder pass to input attribute', () => {
      expect(wrapperShallow().get('[placeholder="type something"]')).toBeTruthy()
    })
    test('is title pass to span context', () => {
      expect(wrapperShallow().get('span').text()).toBe('for_test')
    })
  })
  describe('Watch: is behavior success', () => {
    it("is called with the new inputVal in other cases", () => {
      
    })
    it("is not called if inputVal are the same", () => {

    })
  })
})