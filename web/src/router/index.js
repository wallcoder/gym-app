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
import AvailGyms from '@/views/User/AvailGyms.vue';
import LayoutGym from '@/views/User/LayoutGym.vue';
import UserSpace from '@/views/User/UserSpace.vue';
import Saved from '@/views/User/Saved.vue';
import Notification from '@/views/User/Notification.vue';
import Membership from '@/views/User/Membership.vue';
import Profile from '@/views/User/Profile.vue';
import MyGyms from '@/views/User/MyGyms.vue';
import NotFound from '@/views/User/NotFound.vue';


const routes = [
  {
    path: '/',
    component: UserView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'GymPass | Home'
        }
      },



    ],


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
      title: 'GymPass | Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'GymPass | Buttons'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'GymPass | Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'GymPass | Signup'
    }
  },
  {
    path: '/gym-registration/:planId',
    name: 'gym-registration',
    component: RegisterGymView,
    props: true,
    meta: {
      title: 'GymPass | Gym Registration',
      requiresAuth: true
    }
  },

  {
    path: '/gyms',
    component: LayoutGym,
    children: [
      {
        path: 'location/:location',  // Now this is specific to location
        props: true,
        name: 'available-gyms',
        component: AvailGyms,
        meta: {
          title: 'GymPass | Available Gyms'
        },
      },
      {
        path: 'gym/:id',  // Now this is specific to gym ID
        props: true,
        name: 'gym',
        component: GymView,
        meta: {
          title: 'GymPass | Gym'
        },
      }
    ]
  },

  {
    path: '/user-profile',

    component: UserSpace,

    meta: {
      title: 'Gympass | Userspace',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: Profile,
        name: 'profile',

        meta: {
          title: 'Gympass | Profile'
        }

      },
      {
        path: 'saved',
        component: Saved,
        name: 'saved',
        meta: {
          title: 'GymPass | Saved'
        }

      },
      {
        path: 'notifications',
        component: Notification,
        name: 'notifications',
        meta: {
          title: 'GymPass | Notifications'
        }

      },
      {
        path: 'memberships',
        component: Membership,
        name: 'memberships',
        meta: {
          title: 'GymPass | Membership'
        }

      },
      {
        path: 'my-gyms',
        component: MyGyms,
        name: 'my-gyms',
        meta: {
          title: 'GymPass | My Gyms'
        }

      }
    ]
  },
  { path: '/:catchall(.*)*', name: 'not-found', component: NotFound }

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
