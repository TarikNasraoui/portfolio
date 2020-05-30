import Vue from 'vue'
import Router from 'vue-router'
import Index from './frontOffice/Index.vue'
import Admin from './backOffice/Admin.vue'
import AddProfile from './backOffice/Views/AddProfile.vue'
import Login from './backOffice/Views/auth/Login.vue'
import Register from './backOffice/Views/auth/Register.vue'
import Projects from './backOffice/Projects.vue'
import store from './store'
// import Team from './backOffice/Team.vue'
// import Aside from './frontOffice/Aside'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index,
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: { 
          requiresAuth: true
        },
        children: [
          {
           
            path: '/admin/projects',
            component: Projects,
            meta: { 
              requiresAuth: true
            }
          },
          {
           
            path: '/admin/new-profile',
            component: AddProfile,
            meta: { 
              requiresAuth: true
            }
          },
          
        ]
      },
    ]
  })
  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })
  export default router