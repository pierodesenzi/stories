<template>

        <div class="sts-navbar">
            <router-link class='nav-link' to='/'>Home | </router-link>
            <router-link class='nav-link' to='/feed'>Lista</router-link>
        </div>

</template>

<style scoped>
 .sts-navbar {
     position: fixed;
     background-color: #5386f3;
     top: 0;
     width: 100%;
     height: 40px;
 }

 .nav-link {
     font-size: 20px;
     color: white;
 }

</style>