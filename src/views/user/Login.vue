<template>
  <v-form v-model="valid">
    <br><br><br>
    <v-card
      flat
      class="mx-auto"
      width="450px"
    >
      <h2 class="text-xl-left">登 录</h2>
      <br>
      <br>
      <v-text-field
        v-model="email"
        clearable
        :rules="[rules.required, rules.email]"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[
          rules.required,
          () => !!password && password.length >= 8 || '密码不可小于 8 位',
        ]"
        label="密码"
        clearable
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        counter
        @click:append="show = !show"
      ></v-text-field>

      <v-card-actions>
        <v-btn
          text
          width="30%"
          @click="register"
        >
          注 册
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="primary"
          text
          width="65%"
          @click="submit"
        >
          登 录
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-form>
</template>

<script>
  import { login } from '@/utils/api'
  export default {
    metaInfo: { title: '登录' },
    data () {
      return {
        valid: false,
        menu: false,
        show: false,
        email: '',
        password: '',
        rules: {
          required: value => !!value || '不可为空',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '邮箱格式错误'
          },
          password: value => value.length >= 8 || '密码不可小于 8 位',
        },
      }
    },
    methods: {
      async submit () {
        var reqData = {}
        reqData.email = this.email
        reqData.password = this.password
        await login(reqData).then(res => {
          if (res.code !== 200) {
            alert('登陆失败: 账号密码错误')
          } else {
            this.datas = res.data
            // localStorage.clear()
            localStorage.setItem('token', this.datas.token)
            localStorage.setItem('userID', this.datas.user_id)
            alert('登陆成功!')
            this.$router.go(-1)
          }
        })
      },
      register () {
        this.$router.push({ path: '/register' })
      },
    },
  }
</script>
