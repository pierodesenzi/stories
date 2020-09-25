<template>
    <form id="register">
        <input type="text" id="email" v-model="email">
        <input type="password" id="password" v-model="password">
        <button v-on:click="register">register</button>
    </form>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'register',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register: function(e) {
            firebase.auth().createUserWithEmailAndPassword (this.email, this.password)
            .then(user => {
                this.$router.go( {path: this.$router.path} )
            })
            e.preventDefault();
        }
    }
}
</script>