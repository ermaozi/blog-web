<template>
  <v-row justify="center">
    <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
    >
      <br><br>
      <h2 class="text-xl-left">注 册</h2>
      <v-card
        flat
        ref="form"
      >
        <v-card-text>
          <v-text-field
            ref="user"
            v-model="user"
            counter="16"
            maxlength="16"
            :rules="[rules.required]"
            :error-messages="errorMessages"
            label="昵 称"
            clearable
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[rules.required, rules.emailCheck]"
            label="E-mail"
            hint="登录时需要用到邮箱"
            clearable
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            label="密 码"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            clearable
            @click:append="show = !show"
            :rules="[
              rules.required,
              () => !!password && password.length >= 8 || '密码不可小于 8 位',
            ]"
            required
          ></v-text-field>
          <v-text-field
            ref="domainname"
            v-model="domainname"
            :rules="[]"
            label="域 名 ( 选填 )"
            hint="填写正确且可访问的域名可以增加访客量哦"
            clearable
            required
          ></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="生 日 ( 选填 )"
                hint="填写生日信息可能会在生日那天收到惊喜!"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              locale="zh-cn"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                保存
              </v-btn>
              <v-btn
                text
                color="blue-grey"
                @click="menu = false"
              >
                取消
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn
           text
           @click="login"
          >取 消</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>清空信息</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            提 交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { register } from '@/utils/api'

  export default {
    metaInfo: { title: '注册' },
    data: () => ({
      menu: false,
      show: false,
      user: null,
      email: null,
      password: null,
      date: '',
      domainname: '',
      errorMessages: '',
      formHasErrors: false,
      rules: {
        required: value => !!value || '不可为空',
        emailCheck: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '邮箱格式错误'
        },
      },
    }),

    computed: {
      form () {
        return {
          user: this.user,
          email: this.email,
          password: this.password,
          domainname: this.domainname,
          date: this.date,
        }
      },
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      async submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (f === 'date' || f === 'domainname') {
            return
          }
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
        if (!this.formHasErrors) {
          var reqData = {}
          reqData.nickname = this.user
          reqData.domainname = this.domainname
          reqData.birthday = this.date
          reqData.email = this.email
          reqData.password = this.password
          await register(reqData).then(res => {
            if (res.code !== 200) {
              alert(res.message)
            } else {
              alert('注册成功!')
              this.login()
            }
          })
        }
      },
      login () {
        this.$router.push({ path: '/login' })
      },
    },
  }
</script>
