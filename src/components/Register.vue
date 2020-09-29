<template>
<div>
    <h2>Create an account</h2>
    <div class="register-box">
        <form id="register">
            <input type="text" id="email" v-model="email" placeholder="email">
            <input type="password" id="password" v-model="password" placeholder="password">
            <button class="confirm" v-on:click="register">Register</button>
        </form>
    </div>
</div>
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