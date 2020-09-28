<template>
  <base-section id="theme-features">
    <base-section-heading title="博客列表">
      或是所见所闻 或是偶有感悟
    </base-section-heading>

    <v-container>
      <v-row justify="center">
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          md="10"
          @click="jump(feature.id)"
        >
          <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
          >
            <v-card
              class="ma-2 pa-2"
              v-ripple
              :elevation="hover ? 2 : 0"
            >
              <base-avatar-card
                v-bind="feature"
                horizontal
              >
                <br>
                {{ feature.summary }}
                <br><br>
                <div>
                  <v-icon class="mb-1">
                    mdi-account
                  </v-icon>
                  {{ feature.author }}
                  <v-icon class="mb-1">
                    mdi-event
                  </v-icon>
                  {{ feature.create_time }}
                </div>
              </base-avatar-card>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        :length="pagesNum"
        @input="next"
      ></v-pagination>
    </v-container>
  </base-section>
</template>

<script>
  import { getAllArticles } from '@/utils/api'
  export default {
    name: 'SectionThemeFeatures',
    data: () => ({
      pagesNum: 1,
      page: 1,
      features: [
        {
          // color: 'primary',
          // dark: true,
          title: 'Easily Customizable',
          // icon: 'mdi-fountain-pen-tip',
          summary: 'testsummary2',
          author: '二猫子',
          create_time: '2020-01-29',
        }],
    }),
    created () {
      this.get_info()
    },
    methods: {
      async get_info () {
        const datas = {}
        var page = { current_page: this.page }
        await getAllArticles(page).then(res => {
          this.datas = res.data
        })
        this.features = this.datas.articles
        this.pagesNum = this.datas.pages_num
        // this.rowitem = JSON.parse(JSON.stringify(this.datas["articles"]));
      },
      next (page) {
        this.page = page
        this.get_info()
        console.log(page)
      },
      jump (id) {
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>
