<template>
<div>
    <h2>Create an account</h2>
    <div class="register-box">
      <ValidationObserver ref="form">
        <form class="register-form" id="register">
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <div class="input-field">
              <input type="email" id="email" v-model="email">
              <label for="email">Email</label>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required|min:6" v-slot="{ errors }">
            <div class="input-field">
              <input type="password" id="password" v-model="password">
              <label for="password">Password</label>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="input-field">
              <input type="text" id="username" v-model="username">
              <label for="username">Display Name</label>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="input-field">
              <input type="text" id="firstName" v-model="name.first" >
              <label for="firstName">First Name</label>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="input-field">
              <input type="text" id="lastName" v-model="name.last">
              <label for="lastName">Last Name</label>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="input-field">
            <textarea type="text" class="materialize-textarea" id="biography" v-model="biography"></textarea>
            <label for="biography">Biography</label>
          </div>
          <button type="submit" id="btnSubmit" class="confirm" v-on:click="register">Register</button>
        </form>
      </ValidationObserver>
    </div>
</div>
</template>

<script>

import firebase from 'firebase/app';
import db from './firebaseInit';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules.umd.js';

extend('email', {
  ...email,
  message: 'A valid email is required'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'A valid password with 6 digits or more is required'
});

export default {
    components: {
      ValidationProvider,
      ValidationObserver
    },
    name: 'register',
    data () {
        return {
            email: '',
            password: '',
            username:'',
            name:{
              first: '',
              last:'',
            },
            biography: '',
        }
    },
    methods: {
        register: function(e) {
          console.log(process.env.NODE_ENV)
          this.$refs.form.validate().then(success => {
            if(success){
              let registeredUser;
              //Registra o usuário no sistema de autenticação
              firebase.auth().createUserWithEmailAndPassword (this.email, this.password)
              .then(user => {
                registeredUser = user.user;
                //Registra o perfil
                db.collection('profiles').doc(this.username).set({
                  name: this.name,
                  email: this.email,
                  biography: this.biography,
                  articles: []
                })
                .then(DocRef => {
                  //Atualiza o usuário para incluir o username
                  registeredUser.updateProfile({
                    displayName: this.username,
                  })
                  .then(DocRef => this.$router.go( {path: this.$router.path} ))
                })
              })
              .catch(error => {
                //Deleta o usuário caso ocorra um erro ao criar o perfil
                console.log("Erro ao criar perfil")
                console.log(error);
                registeredUser.delete()
                  .then(()=>{})
                  .catch(error => {});
              })
            }
          });
            
          e.preventDefault();
        },
      
    }
}
</script>

<style scoped>
.register-box{
  position: center;
    border: 3px solid #5386f3;
    border-radius: 10px 10px;
    margin: 0 0 3px 0;
    width: 40%;
    height: 80%;
    overflow-wrap: break-word;
    bottom: 7px;
    background-color: #fafafa;
    display: inline-block;

}

.register-form{
  padding: 2% 5%;
}

.confirm{
    margin: 10px 10px
}

</style>
