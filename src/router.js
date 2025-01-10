import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./Home.vue'),
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./Register.vue')
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
});
export default router;