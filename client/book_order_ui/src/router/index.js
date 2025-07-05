import { createWebHistory, createRouter } from "vue-router";
import MyHome from "../components/MyHome";
import UserLogin from "../components/auth/UserLogin";
import UserRegistration from "../components/auth/UserRegistration";
import EmailVerification from "@/components/auth/EmailVerification.vue";
import Workspace from "@/components/Workspace.vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import AddBook from "@/components/admin/AddBook.vue";
import ListBook from "@/components/admin/ListBook.vue";
import AuthLayout from "@/components/auth/AuthLayout.vue";

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
      {
        path: "admin",
        component: AdminLayout,
        children: [
          {
            name: "AddBook",
            path: "addbooks",
            component: AddBook,
          },
          {
            name: "ListBook",
            path: "books",
            component: ListBook,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        name: "login",
        path: "login",
        component: UserLogin,
      },
      {
        name: "registration",
        path: "registration",
        component: UserRegistration,
      },
      {
        name: "verify_email",
        path: "verify-email",
        component: EmailVerification,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
