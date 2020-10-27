// Importe `shallowMount` do Vue Test Utils e o componente sendo testado
import { shallowMount } from '@vue/test-utils'
import List from '../../src/components/List.vue'

// Monte o componente
const wrapper = shallowMount(List)

// Aqui estão alguns testes Jest, apesar de poder usar
// qualquer test runner / assertion library que preferir
describe('List', () => {
  // Inspeciona as opções do componente
  it('has a created hook', () => {
    expect(typeof List.created).toBe('function')
  })
})
