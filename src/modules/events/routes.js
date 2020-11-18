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
        component: () => import(/* webpackChunkName: "about" */ "./views/list.vue"),
      },
      {
        path: "details/:id",
        name: "events.details",
        component: () => import(/* webpackChunkName: "about" */ "./views/details.vue"),
      },
      {
        path: "add",
        name: "events.add",
        component: () => import(/* webpackChunkName: "about" */ "./views/add.vue"),
      }
    ],
  },
];
