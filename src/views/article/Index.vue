<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="20"
        sm="10"
        md="20"
        lg="10"
      >
        <h1 style="font-size:60px">{{ title }}</h1>
        <br>
        <div v-html="markdownHtmlTest"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  // Extensions
  import View from '@/views/View'
  import marked from 'marked'

  // Mixins
  import LoadSections from '@/mixins/load-sections'
  import { getArticleForId } from '@/utils/api'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  })

  export default {
    name: 'Article',

    metaInfo: { title: '文章' },

    extends: View,

    data () {
      return {
        title: '',
        markdownHtmlTest: '',
      }
    },

    mixins: [
      LoadSections([
        // 'hero-alt',
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
      },
      jump (id) {
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>
