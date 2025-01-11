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
router.beforeEach(async (to, from, next){
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!localStorage.getItem('token')){
            return next()
        }
        return next('./login')
    }
    next()
})
export default router;