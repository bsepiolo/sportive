# Sportive :soccer: :basketball:	


## Social App for creating Sport events.
 * Components: self made reusable atomic design components,
 * State management:  Vuex,  
 * Backend: Firebase,
 * Maps: TomTom api,
 * Desing: Figma,
 * More: PWA, Vue-Router, Scss

**Available functionalisties:**
 * Sign In, Sign Up,
 * User dashboard which includes:
   * incoming event, 
   * events created by you, 
   * events with your participation,
   * recommended events wich are filtered by your geolocation,
 * Every user can create event by picking location, date, time etc,  
 * User can join events,  
 * User can check the route to the event from his location 

**Worth mentioning:**
 * Form component which generates fields based on the given configuration,
 * Self made validation engine,
 * Self made location picker based on TomTom api
 
**Development plan**

 * Move components to Storybook,
 * Dynamic check if email is already in use,
 * Limit on the number of people at the event,
 * User's preffered disciplines,
 * Chat
 * Carousel at start screen
 * Search
 * Friends
 * Notifications
 * User profile
 * Burger menu
 * Improve current functionalities
 * Fix errors
 

**:warning:Appliaction needs geolocation permission to run.:warning:**

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

