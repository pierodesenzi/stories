<template>

        <div class="sts-navbar">
            <router-link class='nav-link' to='/'>Home</router-link>
            <router-link class='nav-link' to='/feed'>Feed</router-link>
            <router-link v-if="isLoggedIn" class='nav-link' to='/myfeed'>My Feed</router-link>
            <router-link v-if="isLoggedIn" class='nav-link' to='/groups'>Groups</router-link>
            <router-link v-if="!isLoggedIn" class='nav-link' to='/login'>Login</router-link>
            <router-link v-if="!isLoggedIn" class='nav-link' to='/register'>Register</router-link>
            <router-link v-if="isLoggedIn" class='nav-link' to='/write'>Write</router-link>
            <router-link v-if="isLoggedIn" class="email-top" :to="{ name: 'profile', params: { username: currentUser.displayName } }">{{ currentUser.displayName }}</router-link>
            <b v-if="isLoggedIn" v-on:click="logout" class='nav-link' to='/'>Logout</b>
        </div>

</template>

<script>
import firebase from 'firebase/app';

export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        };
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser;
        }
    },
    methods: {
        logout: function() {
            console.log(this.currentUser)
            firebase.auth().signOut().then(() => {
                
                // this.$router.push('/login')
                this.$router.go( {path: this.$router.path} )
            })    
        }
    }
}
</script>

<style scoped>
 .sts-navbar {
     position: fixed;
     background-color: #5386f3;
     top: 0;
     width: 100%;
     height: 40px;
     z-index: 5;
 }

 .nav-link {
     font-size: 20px;
     color: white;
     padding: 1%;
 }

 .email-top {
     color: black;
     font-size: 20px;
 }

</style>