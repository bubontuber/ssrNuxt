<template>
  <div>
    <h1>You can add users on this page</h1>
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
          Create user
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
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
            await this.$store.dispatch('auth/createUser', formData)
              .then(() => {
                this.$message.success('User created')
              })
            this.controls.login = ''
            this.controls.password = ''
            this.loading = false
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
<style lang="sass" scoped>
form
  width: 600px
</style>
