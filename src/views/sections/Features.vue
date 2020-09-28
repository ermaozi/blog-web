<template>
  <base-section
    id="features"
  >
    <base-section-heading title="博客列表">
      或是所见所闻 或是偶有感悟
    </base-section-heading>
    <v-responsive
      class="mx-auto"
      max-width="1350"
    >
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="12"
          >
            <base-info-card
              v-bind="card"
            />
            <v-icon class="mb-1">
              mdi-account
            </v-icon>
            {{ card.author }}
            <v-icon class="mb-1">
              mdi-time
            </v-icon>
            {{ card.create_time }}
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
  import { getAllArticles } from '@/utils/api'
  export default {
    name: 'SectionFeatures',

    data: () => ({
      page: 1,
      cards: [],
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
        for (var i = 0; i < this.datas.articles.length; i++) {
          this.cards.push(
            {
              // icon: this.datas.articles[i].icon,
              title: this.datas.articles[i].title,
              text: this.datas.articles[i].summary,
              author: this.datas.articles[i].author,
              create_time: this.datas.articles[i].create_time,
            },
          )
        }
        console.log(this.cards)
        // this.cards = this.datas.articles
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
