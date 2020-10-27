<template>
<div>
    <h2>Create an account</h2>
    <div class="register-box">
        <form id="register">
            <input type="text" id="email" v-model="email" placeholder="email">
            <input type="password" id="password" v-model="password" placeholder="password">
            <input type="text" id="username" v-model="username" placeholder="Display Name">
            <input type="text" id="firstName" v-model="name.first" placeholder="First Name">
            <input type="text" id="lastName" v-model="name.last" placeholder="Last Name">
            <textarea type="text" v-model="biography" rows="50" placeholder="Biography"></textarea>
            <button class="confirm" v-on:click="register">Register</button>
        </form>
    </div>
</div>
</template>

<script>
import firebase from 'firebase';
import db from './firebaseInit';

export default {
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
            e.preventDefault();
        }
    }
}
</script>

<style scoped>
.register-box{
  position: center;
    border: 3px solid #5386f3;
    border-radius: 10px 10px;
    margin: 0 0 3px 0;
    width: 30%;
    height: 80%;
    overflow-wrap: break-word;
    bottom: 7px;
    background-color: #fafafa;
    display: inline-block;

}

.confirm{
    margin: 10px 10px
}

</style>
