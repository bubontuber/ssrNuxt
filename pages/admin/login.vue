<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <h3 style="margin-bottom: 10px">
      Login form
    </h3>
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Login" prop="login">
        <el-input v-model.trim="controls.login" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model.trim="controls.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" round type="primary" :loading="loading" style="margin-top: 20px; width: 100%">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  layout: 'empty',
  data () {
    return {
      loading: false,
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: 'Please enter your name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your comment', trigger: 'blur' },
          { min: 6, message: 'Password has to be at least 6 symbols', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    const message = this.$route.query.message
    if (message === 'login') {
      this.$message.error('You need to login first to access this page')
    }
    if (message === 'session') {
      this.$message.warning('Your session has been expired')
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')
          } catch (e) {
            this.loading = false
          }
        } else {

        }
      })
    }
  }
}
</script>
