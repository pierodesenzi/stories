import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase/app'
import Write from '@/components/Write'
import Profile from '@/components/Profile'
import Groups from '@/components/Groups'
import MyFeed from '@/components/MyFeed'
import GroupFeed from '@/components/GroupFeed'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/feed',
      name: 'feed',
      component: Feed,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myfeed',
      name: 'myfeed',
      component: MyFeed,
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
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group/:group',
      name: 'group',
      component: GroupFeed,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: {
        requiresAuth: true
      }
    },


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
