// Importe `shallowMount` do Vue Test Utils e o componente sendo testado
import { mount } from '@vue/test-utils'
import Feed from '../../src/components/Feed.vue'

// Monte o componente
const wrapper = mount(Feed)

// Aqui estão alguns testes Jest, apesar de poder usar
// qualquer test runner / assertion library que preferir
describe('Feed', () => {
  // Inspeciona as opções do componente
  it('has a created hook', () => {
    expect(typeof Feed.created).toBe('function')
  })
})
