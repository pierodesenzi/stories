<template>
<div>
    <h2>Login</h2>
    <div class="login-box">
        
    <form id="login">
        <input type="text" id="email" v-model="email" placeholder="email">
        <input type="password" id="password" v-model="password" placeholder="password">
        <button class="confirm" v-on:click="login">Login</button>
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
            password: ''
        }
    },
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword (this.email, this.password)
            .then(() => {
                this.$router.go( {path: this.$router.path} )
            });
            e.preventDefault();
        }
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

.confirm{
    margin: 10px 10px
}

</style>