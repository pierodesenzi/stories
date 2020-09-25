<template>
    <form id="login">
        <input type="text" id="email" v-model="email">
        <input type="password" id="password" v-model="password">
        <button v-on:click="login">go</button>
    </form>
</template>

<script>
import firebase from 'firebase'

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