<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
      <v-avatar
        size="65"
        v-ripple
        @click="login()"
        v-if="loged&!loging"
      >
        <base-img
          :src="require('@/assets/ermaozi.jpg')"
          contain
          max-width="80"
          width="100%"
        />
      </v-avatar>
      <v-avatar
        size="65"
        v-ripple
        @click="login()"
        v-if="!loged"
      >
        <h4>登 录</h4>
      </v-avatar>
      <v-avatar
        size="65"
        v-ripple
        @click="home()"
        v-if="loging"
      >
        <h4>返 回</h4>
      </v-avatar>

      <v-spacer />

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
        >
          <v-tab
            v-for="(name, i) in items"
            :key="i"
            :to="{ name }"
            :exact="name === 'Home'"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :items="items"
    />
  </div>
</template>

<script>
  export default {
    name: 'HomeAppBar',

    components: {
      HomeDrawer: () => import('./Drawer'),
    },

    data: () => ({
      loged: false,
      loging: false,
      drawer: null,
      items: [
        'Home',
        'About',
        'Contact',
      ],
    }),
    methods: {
      login () {
        this.loging = true
        this.loged = true
        this.$router.push({ path: '/login' })
      },
      home () {
        this.loging = false
        this.loged = false
        this.$router.push({ path: '/' })
      },
    },
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
