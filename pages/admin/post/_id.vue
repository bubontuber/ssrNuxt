<template>
  <div class="pageWrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">
        Posts
      </el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ post.title }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Text (Supported formats .md and .html)" prop="text" class="mb">
        <el-input v-model="controls.text" type="textarea" :rows="10" autocomplete="off" />
      </el-form-item>
      <div class="mb dataWrap">
        <el-form-item>
          <el-button native-type="submit" round type="primary" :loading="loading">
            Edit
          </el-button>
        </el-form-item>
        <div>
          <small>
            <i class="el-icon-time" />
            <span>{{ new Date(post.date).toLocaleString() }}</span>
          </small>
          <small class="ml">
            <i class="el-icon-view" />
            <span>{{ post.views }}</span>
          </small>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'auth',
  data () {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: 'Text doesnt have to be empty', trigger: 'blur' }
        ]
      }
    }
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const post = await store.dispatch('posts/fetchAdminById', params.id)
    return { post }
  },
  mounted () {
    this.controls.text = this.post.text
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const formData = {
            text: this.controls.text,
            id: this.post._id
          }
          try {
            await this.$store.dispatch('posts/update', formData)
            this.$message.success('Post updated')
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.pageWrap
  width: 600px

.dataWrap
  display: flex
  justify-content: space-between
  color: #7F828B
  align-items: center

.ml
  margin-left: 2rem
</style>
