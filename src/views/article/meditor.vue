<template>
  <div>
    <br>
    <v-row justify="center">
      <v-col
        cols="20"
        sm="10"
        md="20"
        lg="10"
      >
        <v-text-field
          v-model="title"
          clearable
          counter
          label="文章标题"
        ></v-text-field>
        <v-textarea
          v-model="summary"
          auto-grow
          clearable
          counter
          rows="1"
          label="文章简介"
        ></v-textarea>
        <br>
        <mavon-editor v-model="content"></mavon-editor>
        <v-card-actions>
        <v-btn
            text
            width="30%"
            @click="clear"
        >
            清 除
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            width="65%"
            @click="submit"
        >
            提 交
        </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { addArticle } from '@/utils/api'
  export default {
    components: {
      mavonEditor,
    },
    data: () => ({
      content: localStorage.articleContent,
      title: localStorage.articleTitle,
      summary: localStorage.articleSummary,
    }),
    methods: {
      async submit () {
        if (!localStorage.token) {
          alert('请先登录!')
          localStorage.setItem('articleContent', this.content)
          localStorage.setItem('articleTitle', this.title)
          localStorage.setItem('articleSummary', this.summary)
          this.$router.push({ path: '/login' })
          return
        }
        console.log(this.content)
        var reqData = {}
        reqData.user_id = localStorage.userID
        reqData.title = this.title
        reqData.summary = this.summary
        reqData.content = this.content
        await addArticle(reqData).then(res => {
          if (res.code !== 200) {
            alert(res.message)
          } else {
            alert('新增文章成功!')
            localStorage.setItem('articleContent', '')
            localStorage.setItem('articleTitle', '')
            localStorage.setItem('articleSummary', '')
            this.$router.push({ path: '/' })
          }
        })
      },
      clear () {
        this.article = ''
      },
    },
  }
</script>
