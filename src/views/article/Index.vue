<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="20"
        sm="10"
        md="20"
        lg="10"
      >
        <v-skeleton-loader
          :loading="loading"
          ref="skeleton"
          type="article"
          class="mx-auto"
        >
          <h1 style="font-size:60px">{{ title }}</h1>
          <br>
          <div
            v-html="markdownHtmlTest"
            class="hljs"
            ref="hlDiv"
          ></div>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  // Extensions
  import View from '@/views/View'
  import marked from 'marked'
  import hljs from 'highlight.js'
  import javascript from 'highlight.js/lib/languages/javascript'
  import 'highlight.js/styles/github.css'
  import '@/styles/markdown.css'
  // Mixins
  import LoadSections from '@/mixins/load-sections'
  import { getArticleForId } from '@/utils/api'

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  })

  export default {
    name: 'Article',

    extends: View,

    data () {
      return {
        title: '',
        markdownHtmlTest: '',
        loading: true,
      }
    },

    mixins: [
      LoadSections([
        'hero-alt',
        'about-our-product',
      ]),
    ],
    created () {
      this.get_info()
    },
    methods: {
      async get_info () {
        var id = { id: this.$route.params.pathMatch }
        await getArticleForId(id).then(res => {
          this.datas = res.data
        })
        this.markdownHtmlTest = marked(this.datas.content || '', {
          sanitize: true,
        })
        this.title = this.datas.title
        this.loading = false
        document.title = '二猫子 - blog | ' + this.title
      },
      jump (id) {
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>
