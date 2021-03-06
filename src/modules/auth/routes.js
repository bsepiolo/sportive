import AuthModule from "./auth-layout.vue";

export const AuthRoutes = [
  {
    path: "/auth",
    component: AuthModule,
    children: [
      {
        path: "/",
        name: "auth.signin",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/login.vue"),
      },
      {
        path: "signup",
        name: "auth.signup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/register.vue"),
      }
    ],
  },
];
