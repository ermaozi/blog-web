<template>
  <base-section id="theme-features">
    <base-section-heading title="博客列表">
      或是所见所闻 或是偶有感悟
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="6"
        >
          <div v-on:click="jump(feature.id)">
            <base-avatar-card
              v-bind="feature"
              align="left"
              horizontal
            >
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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  import { getAllArticles } from '@/utils/api'
  export default {
    name: 'SectionThemeFeatures',
    data: () => ({
      features: [
        {
          // color: 'primary',
          // dark: true,
          title: 'Easily Customizable',
          icon: 'mdi-fountain-pen-tip',
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
        var currentPage = { current_page: 1 }
        await getAllArticles(currentPage).then(res => {
          this.datas = res.data
        })
        console.log(this.datas)
        this.features = this.datas.articles
        console.log(this.features)
        // this.currentPageAll = this.datas["pages_num"]
        // this.rowitem = JSON.parse(JSON.stringify(this.datas["articles"]));
      },
      jump (id) {
        console.log(id)
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>
