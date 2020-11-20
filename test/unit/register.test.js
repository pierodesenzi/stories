// Importe `shallowMount` do Vue Test Utils e o componente sendo testado
import { mount } from '@vue/test-utils'
import Register from '../../src/components/Register.vue'

// Monte o componente
const wrapper = mount(Register)

// Aqui estão alguns testes Jest, apesar de poder usar
// qualquer test runner / assertion library que preferir
describe('Register', () => {
  // Inspeciona as opções do componente
  it('has data', () => {
    expect(typeof Register.data).toBe('function')
  })

  it('has a form', ()=>{
      expect(wrapper.get('form')).toBeTruthy
  })


//   it('has not a register method', () => {
//     expect(typeof List.created).toBe('function')
//   })
})
