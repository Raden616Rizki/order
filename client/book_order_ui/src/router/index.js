import { createWebHistory, createRouter } from "vue-router";
import MyHome from "../components/MyHome";
import UserLogin from "../components/auth/UserLogin";
import UserRegistration from "../components/auth/UserRegistration";
import EmailVerification from "@/components/auth/EmailVerification.vue";
import Workspace from "@/components/Workspace.vue";

const routes = [
  {
    path: "/",
    component: Workspace,
    children: [
      {
        name: "home",
        path: "/",
        component: MyHome,
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: UserLogin,
  },
  {
    name: "registration",
    path: "/registration",
    component: UserRegistration,
  },
  {
    name: "verify_email",
    path: "/verify-email",
    component: EmailVerification,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
