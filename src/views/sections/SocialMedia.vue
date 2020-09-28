<template>
  <v-theme-provider>
    <base-section
      id="social"
      class="text-center"
      space="56"
    >
      <!-- <base-section-heading title="博客列表">
        或是所见所闻 或是偶有感悟
      </base-section-heading> -->
      <v-row justify="center">
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="10"
          md="7"
          v-ripple
          @click="jump(card.id)"
        >
          <br>
          <base-section-heading
            :title="card.title"
          >
            {{ card.summary }}
            <br>
            <v-icon class="mb-1">
              mdi-account
            </v-icon>
            {{ card.author }}
            <v-icon class="mb-1">
              mdi-time
            </v-icon>
            {{ card.create_time }}
          </base-section-heading>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <br>
      <v-pagination
        v-model="page"
        total-visible="12"
        :length="pagesNum"
        @input="next"
      ></v-pagination>
      <div class="py-4" />
    </base-section>
  </v-theme-provider>
</template>

<script>
  import { getAllArticles } from '@/utils/api'
  export default {
    name: 'SectionNews',
    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      pagesNum: 1,
      page: 1,
      cards: [
        {
          title: '加载中...',
        }
      ],
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
        console.log(this.cards)
        this.cards = this.datas.articles
        this.pagesNum = this.datas.pages_num
      },
      next (page) {
        this.page = page
        this.get_info()
        document.getElementById('social').scrollIntoView({ block: 'start', behavior: 'smooth' })
      },
      jump (id) {
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>

<style>
  .col-md-7:hover {
    margin-top: -10px;
    padding: 30px;
    color: #444;
    word-spacing: 5px;
  }
  .col-md-7 {
    transition: all 0.5s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
</style>
