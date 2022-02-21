import Admin from "@/views/app/Admin";

// const EmptyParentComponent = {
//   render: (h) => h("router-view"),
// };

export default [
  {
    path: "",
    redirect: { name: "quiz.list" },
  },
  {
    path: "/admin",
    name: "admin",
    redirect: { name: "quiz.list" },
    component: Admin,
    children: [
      {
        path: "forms",
        name: "quiz.list",
        component: () => import("@/views/app/QuizzesList.vue"),
      },
      {
        path: "quiz/create",
        name: "quiz.create",
        component: () => import("@/views/app/QuizCreate.vue"),
      },
      {
        path: "forms/:id",
        name: "quiz.edit",
        component: () => import("@/views/app/QuizEdit.vue"),
      },
      {
        path: "/survey/:slug",
        name: "quiz.show",
        component: () => import("@/views/app/Survey.vue"),
      },
    ],
  },
  {
    path: "*",
    component: { render: (h) => h("div", ["404! Page Not Found!"]) },
  },
];
