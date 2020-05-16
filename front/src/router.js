import Vue from 'vue'
import Router from 'vue-router'
import Index from './frontOffice/Index.vue'
import Admin from './backOffice/Admin.vue'
import AddProfile from './backOffice/Views/AddProfile.vue'
import Projects from './backOffice/Projects.vue'
// import Team from './backOffice/Team.vue'
// import Aside from './frontOffice/Aside'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        children: [
          {
           
            path: '/admin/projects',
            component: Projects
          },
          {
           
            path: '/admin/new-profile',
            component: AddProfile
          }
        ]
      },
      // {
      //   path: '/dashboard',
      //   name: 'Dashboard',
      //   component: Dashboard
      // },
      // {
      //   path: '/project',
      //   name: 'Projects',
      //   component: Projects
      // },
      // {
      //   path: '/Team',
      //   name: 'Team',
      //   component: Team
      // },
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    ]
  })