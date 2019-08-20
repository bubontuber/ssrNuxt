<template>
  <div class="formWrapper">
    <h1>Add comment</h1>
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="controls.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Comment" prop="text">
        <el-input v-model="controls.text" type="textarea" :rows="4" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" round type="primary" :loading="loading">
          Add comment
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="sass" scoped>
.formWrapper
  margin: 5rem 0
</style>
<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Please enter your comment', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            name: this.controls.name,
            comment: this.controls.text,
            postId: this.postId
          }
          try {
            const newComment = await this.$store.dispatch('comment/create', formData)
            this.$emit('created', newComment)
            this.$message.success('Your comment successfully added')
          } catch (e) {
            this.loading = false
          }
          console.log(formData)
        } else {
          console.log('not Submit')
          return false
        }
      })
    }
  }
}
</script>
