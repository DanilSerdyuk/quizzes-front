import Auth from "@/views/auth/Auth";

export default [
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/auth/Login"),
      },
      {
        path: "registration",
        name: "registration",
        component: () => import("@/views/auth/Registration"),
      },
    ],
  },
];
