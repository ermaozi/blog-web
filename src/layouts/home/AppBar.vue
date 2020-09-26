<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
      <v-menu
        open-on-hover
        top
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            size="65"
            v-ripple
            v-if="loged"
          >
            <base-img
              :src="require('@/assets/user-3.jpg')"
              contain
              max-width="80"
              width="100%"
              v-bind="attrs"
              v-on="on"
            />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-title>注销</v-list-item-title>
          </v-list-item>
          <v-list-item @click="addArticles()">
            <v-list-item-title>新增文章</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-avatar
        size="65"
        v-ripple
        @click="login()"
        v-if="!loged"
      >
        <h4>登 录</h4>
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
      loged: Boolean(localStorage.token),
      drawer: null,
      profilePhoto: '@/assets/user-' + localStorage.userID + '.jpg',
      items: [
        'Home',
        'About',
        'Contact',
      ],
    }),
    methods: {
      login () {
        this.$router.push({ path: '/login' })
      },
      logout () {
        localStorage.clear()
        location.reload()
      },
      addArticles () {
        this.$router.push({ path: '/meditor' })
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
