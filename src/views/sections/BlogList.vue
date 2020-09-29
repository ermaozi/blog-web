<template>
  <v-theme-provider>
    <base-section
      id="blog-list"
      class="text-center"
      space="56"
    >
      <v-alert
        dismissible
        transition="scale-transition"
        :type="alertType"
        :value="alert"
      >
        {{ alertMsg }}
      </v-alert>
      <v-progress-circular
        indeterminate
        v-show="loading"
        color="primary"
      ></v-progress-circular>
      <v-row justify="center">
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="10"
          md="7"
        >
          <br>
          <v-skeleton-loader
            :loading="loading"
            @click="jump(card.id)"
            ref="skeleton"
            type="article"
            class="mx-auto"
          >
            <base-section-heading
              v-ripple
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
          </v-skeleton-loader>
          <v-vard
            v-if="if_user(card.user_id)"
          >
            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  small
                  @click.stop="dialog = true"
                >删除</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">确定删除文章?</v-card-title>
                <v-card-text>文章删除后无法恢复, 如果确定删除请先自行备份</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    @click="dialog = false"
                  >取消</v-btn>
                  <v-btn
                    color="green"
                    text
                    @click="delete_articles(card.id)"
                  >确定删除</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              text
              small
              @click="set_articles()"
              color="primary"
            >修改</v-btn>
          </v-vard>
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
  import { getAllArticles, delArticle } from '@/utils/api'
  export default {
    name: 'SectionNews',
    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      show: false,
      alert: false,
      alertMsg: '',
      alertType: '',
      dialog: false,
      pagesNum: 1,
      page: 1,
      loading: true,
      cards: [],
    }),
    created () {
      this.get_info()
    },
    methods: {
      async get_info () {
        const datas = {}
        this.loading = true
        var page = { current_page: this.page }
        await getAllArticles(page).then(res => {
          this.datas = res.data
        })
        this.cards = this.datas.articles
        console.log(this.cards)
        this.pagesNum = this.datas.pages_num
        this.loading = false
      },
      if_user (userId) {
        return Number(localStorage.userID) === userId
      },
      async delete_articles (id) {
        if (!localStorage.token) {
          this.alert = true
          this.alertType = 'error'
          this.alertMsg = '删除文章失败, 请先登录'
          return
        }
        var data = {}
        data.id = id
        data.userID = localStorage.userID
        data.token = localStorage.token
        await delArticle(data).then(res => {
          if (res.code !== 200) {
            alert(res.message)
          } else {
            this.alert = true
            this.alertType = 'success'
            this.alertMsg = '删除文章成功!'
            location.reload()
          }
        })
      },
      set_articles () {
          this.alert = true
          this.alertType = 'warning'
          this.alertMsg = '修改功能太麻烦了, 博主没做. 建议直接删除, 完事重新添加'
      },
      next (page) {
        this.page = page
        this.get_info()
        document.getElementById('blog-list').scrollIntoView({ block: 'start', behavior: 'smooth' })
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
