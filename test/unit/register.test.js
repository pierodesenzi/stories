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

  it('validates if fields are empty', ()=>{

    const button = wrapper.find('#btnSubmit')
    button.trigger('click').then(resp =>{
        expect(wrapper.html()).toContain('This field is required')
        done();
    })
    .catch(err =>{
      throw err;
    })
  })

  it('insert if data is valid, then redirect', ()=>{
    wrapper.setData({
        email: 'ayrofllmao@gmail.com',
        password: '123456',
        username:'risos',
        name:{
            first: 'risonho',
            last:'da silva',
        },
        biography: 'hhahahahahah',
    })
    .then(ret =>{
        const button = wrapper.find('#btnSubmit')
        button.trigger('click').then(resp =>{
            expect(wrapper.vm._isDestroyed).toBeTruthy;
            done()
        })
        .catch(err =>{
          throw err;
        })
    })
    .catch(err =>{
      throw err;
    })

    
  })

//   it('has not a register method', () => {
//     expect(typeof List.created).toBe('function')
//   })
})
