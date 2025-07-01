import { createWebHistory, createRouter } from "vue-router";
import MyHome from "../components/MyHome";
import UserLogin from "../components/UserLogin";
import UserRegistration from "../components/UserRegistration";

const routes = [
    {
        name: "home",
        path: "/",
        component: MyHome
    },
    {
        name: "login",
        path: "/login",
        component: UserLogin
    },
    {
        name: "registration",
        path: "/registration",
        component: UserRegistration
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;