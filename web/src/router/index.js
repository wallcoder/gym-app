import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Admin/Authentication/SigninView.vue'
import SignupView from '@/views/Admin/Authentication/SignupView.vue'
import CalendarView from '@/views/Admin/CalendarView.vue'
import BasicChartView from '@/views/Admin/Charts/BasicChartView.vue'
import ECommerceView from '@/views/Admin/Dashboard/ECommerceView.vue'
import FormElementsView from '@/views/Admin/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Admin/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Admin/Pages/SettingsView.vue'
import ProfileView from '@/views/Admin/ProfileView.vue'
import TablesView from '@/views/Admin/TablesView.vue'
import AlertsView from '@/views/Admin/UiElements/AlertsView.vue'
import ButtonsView from '@/views/Admin/UiElements/ButtonsView.vue'

import UserView from '@/views/User/UserView.vue';
import GymView from '@/views/User/GymView.vue';
import HomeView from '@/views/User/HomeView.vue';
import RegisterGymView from '@/views/User/RegisterGymView.vue';


const routes = [
  {
    path: '/',
    component: UserView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      

    ],
    meta: {
      title: 'eCommerce Dashboard'
    }
  },
  {
    path: '/dashboard',
    name: 'eCommerce',
    component: ECommerceView,
    meta: {
      title: 'eCommerce Dashboard'
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/gym-registration/:planId',
    name: 'gym-registration',
    component: RegisterGymView,
    props: true,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:planType',
    name: 'gym-view',
    component: GymView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      
      return next({ name: 'home', query: { showLoginModal: true } });

    }
  }

  next();
  
})

export default router
