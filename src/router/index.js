import { createRouter, createWebHistory } from 'vue-router';

const AboutView = () => import('@/views/AboutView');
const RegisterView = () => import('@/views/RegisterView');
const LoginView = () => import('@/views/LoginView');
const DictionaryView = () => import('@/views/DictionaryView');
const HomeView = () => import('@/views/HomeView');
const RepeatWordsByCardsView = () => import('@/views/RepeatWordsByCardsView');
const RepeatWordsByWriteWordsView = () => import('@/views/RepeatWordsByWriteWordsView');
const RepeatWordsByBuildSentence = () => import('@/views/RepeatWordsByBuildSentence');

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
    component: HomeView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/word',
    name: 'word',
    component: DictionaryView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/repeat_words_by_cards',
    name: 'repeat_words_by_cards',
    component: RepeatWordsByCardsView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/repeat_words_by_write_words',
    name: 'repeat_words_by_write_words',
    component: RepeatWordsByWriteWordsView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/repeat_words_by_build_a_sentence',
    name: 'repeat_words_by_build_a_sentence',
    component: RepeatWordsByBuildSentence,
    beforeEnter: ifAuthenticated,
  },
  // {
  //   path: '/word/create',
  //   name: 'createWords',
  //   component: CreateWords,
  //   beforeEnter: ifAuthenticated,
  // },
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
