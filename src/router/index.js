import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'
import Write from '@/components/Write'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/feed',
      name: 'list',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/write',
      name: 'write',
      component: Write,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    }
    

  ]
});

// Nav guards
router.beforeEach((to, from, next) => {
  // checks for requiredAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if not logged in
    if(!firebase.auth().currentUser){
      // go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
    else{
      next();
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if logged in
    if(firebase.auth().currentUser){
      // go to login page
      next({
        path: '/feed',
        query: {
          redirect: to.fullPath
        }
      });
    }
    else{
      next();
    }
  }
  else {
    next();
  }
});

export default router;
