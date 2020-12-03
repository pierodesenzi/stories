<template>
<div>
    <h2>Login</h2>
    <div class="login-box">
        
    <form id="login" class="login-form">
        <input type="text" id="email" v-model="email" placeholder="email">
        <input type="password" id="password" v-model="password" placeholder="password">
        <button class="confirm" v-on:click="login">Login</button>
        <span class='error-msg'>{{errorMessage}}</span>
    </form>
    </div>
</div>
</template>

<script>
import firebase from 'firebase/app'

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            errorMessage: '',
        }
    },
    methods: {
        login: function(e) {
            this.errorMessage = ''
            firebase.auth().signInWithEmailAndPassword (this.email, this.password)
            .then(() => {
                this.$router.go( {path: this.$router.path} )
            })
            .catch(error =>{
                console.log(error)
                this.errorMessage = this.getErrorMessage(error.code)
            });
            e.preventDefault();
        },
        getErrorMessage: function(code){
            let ret = ''
            switch (code) {
                case 'auth/invalid-email': ret = 'Insert a valid email'; break;
                case 'auth/user-not-found': ret = 'Email not found'; break;
                case 'auth/wrong-password': ret = 'Wrong Password'; break;
                default: ret = 'Error when authenticating';
            }
            return ret;
        },
    }
}
</script>

<style scoped>
.login-box{
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

.login-form{
  padding: 2% 5%;
}

.confirm{
    margin: 10px 10px
}

</style>