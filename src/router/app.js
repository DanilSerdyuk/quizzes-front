const EmptyParentComponent = {
  render: (h) => h("router-view"),
};

export default [
  {
    path: "",
    redirect: "admin",
    component: EmptyParentComponent,
    children: [
      {
        path: "/admin/forms",
        name: "admin",
        component: () => import("@/views/app/QuizzesList.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/app/About.vue"),
      },
    ],
  },
  {
    path: "*",
    component: { render: (h) => h("div", ["404! Page Not Found!"]) },
  },
];
