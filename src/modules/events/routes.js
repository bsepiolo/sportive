import EventsModule from "./EventsModule.vue";

export const EventsRoutes = [
  {
    path: "/events",
    component: EventsModule,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "events.list",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/List.vue"),
      },
      {
        path: "details",
        name: "events.details",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/Details.vue"),
      },
      {
        path: "add",
        name: "events.add",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/Add.vue"),
      }
    ],
  },
];
