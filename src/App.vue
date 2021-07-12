<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
    >

    </v-app-bar>

    <v-main>
      <HomeLayout/>
    </v-main>
  </v-app>
</template>

<script>
import HomeLayout from './components/HomeLayout';

export default {
  name: 'App',

  components: {
    HomeLayout,
  },

  data: () => ({
    //
  }),
};
</script>
