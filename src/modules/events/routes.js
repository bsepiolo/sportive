import EventsModule from "./events-module.vue";

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
        component: () => import(/* webpackChunkName: "about" */ "./views/list.vue"),
      },
      {
        path: "details",
        name: "events.details",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/details.vue"),
      },
      {
        path: "add",
        name: "events.add",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "./views/add.vue"),
      }
    ],
  },
];
