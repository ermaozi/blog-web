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
        <v-alert
          dismissible
          transition="scale-transition"
          :type="alertType"
          :value="alert"
        >
          {{ alertMsg }}
        </v-alert>
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
        <mavon-editor
          :tabSize="4"
          :subfield="false"
          v-model="content"
        ></mavon-editor>
        <v-card-actions>
        <v-btn
            text
            width="30%"
            @click="save"
        >
            保 存
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
      show: false,
      alert: false,

      content: localStorage.articleContent,
      title: localStorage.articleTitle,
      summary: localStorage.articleSummary,
    }),
    methods: {
      async submit () {
        if (!localStorage.token) {
          this.alert = true
          this.alertType = 'error'
          this.alertMsg = '新增文章失败, 草稿已保存, 请先登录'
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
            this.alert = true
            this.alertType = 'success'
            this.alertMsg = '新增文章成功!'
            localStorage.setItem('articleContent', '')
            localStorage.setItem('articleTitle', '')
            localStorage.setItem('articleSummary', '')
            this.$router.push({ path: '/' })
          }
        })
      },
      save () {
        this.alert = true
        this.alertType = 'success'
        this.alertMsg = '保存成功!'
        localStorage.setItem('articleContent', this.content)
        localStorage.setItem('articleTitle', this.title)
        localStorage.setItem('articleSummary', this.summary)
      },
    },
  }
</script>
