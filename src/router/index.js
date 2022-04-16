import { createRouter, createWebHistory } from 'vue-router';

const AboutView = () => import('@/views/AboutView');
const RegisterView = () => import('@/views/RegisterView');
const LoginView = () => import('@/views/LoginView');
const DictionaryView = () => import('@/views/DictionaryView');
const CreateWord = () => import('@/views/CreateWord');

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
    return;
  }
  router.push('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: DictionaryView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/word',
    name: 'word',
    component: DictionaryView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/word/create',
    name: 'createWord',
    component: CreateWord,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  //   {
  //     path: "/edit-recipe/:id",
  //     name: "EditRecipe",
  //     component: EditRecipe,
  //     beforeEnter: ifAuthenticated,
  //   },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
