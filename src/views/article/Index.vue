<template>
  <div>
    <!-- <div
      class="article"
      v-html="compiledMarkdown"
    >
    </div> -->
    <div v-html="markdownHtmlTest"></div>
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

    metaInfo: { title: '关于' },

    extends: View,

    data () {
      return {
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
        console.log(this.$route.params.pathMatch)
        var id = { id: this.$route.params.pathMatch }
        await getArticleForId(id).then(res => {
          this.datas = res.data
        })
        this.markdownHtmlTest = marked(this.datas.content || '', {
          sanitize: true,
        })
      },
      jump (id) {
        console.log(id)
        this.$router.push({ path: '/article/' + id })
      },
    },
  }
</script>
