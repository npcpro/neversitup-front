How it's work
1. cd to root of project outside src
2. npm install to install package
3. npm run dev to run on local

***
to change porn please change at .env NUXT_PORT

Conventions
Folder and File Naming:
    Components: Use PascalCase for components (e.g., Header.vue, Footer.vue).
    Pages: Use kebab-case for page components (e.g., home.vue, login.vue, daily-order.vue).
    Stores: Use camelCase for Pinia store names (e.g., userStore.ts).
    Interfaces: Use PascalCase for interface filenames and type names (e.g., User.ts for a user interface).

Structure folder

│   App.vue
│   main.ts
│   vite-env.d.ts
│
├───api
│       axiosInstance.ts
│
├───assets
│       logo.png
│       logo.svg
│
├───components
│   │   HelloWorld.vue
│   │   README.md
│   │   SimpleTable.vue
│   │   SnackAlert.vue
│   │   TodoPage.vue
│   │
│   └───todo
│           ToDoDeleteDialog.vue
│           ToDoDetailDialog.vue
│
├───interfaces
│       todo.ts
│       user.ts
│
├───pages
│       index.vue
│       login.vue
│       register.vue
│       todo.vue
│
├───plugins
│       hello.ts
│       index.ts
│       README.md
│       vuetify.ts
│
├───repositories
│       todoRepository.ts
│       userRepository.ts
│
├───router
│       index.ts
│
├───store
│       todoStore.ts
│       userStore.ts
│
├───styles
│       README.md
│       settings.scss
│
└───types