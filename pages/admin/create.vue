<template>
  <div>
    <h1 class="mb">
      Create post
    </h1>
    <el-form
      ref="form"
      :model="controls"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <el-dialog
        title="Preview"
        :visible.sync="dialogVisible"
      >
        <div :key="controls.text">
          <vue-markdown>{{ controls.text }}</vue-markdown>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </el-dialog>

      <el-form-item label="Title" prop="title" class="mb">
        <el-input v-model="controls.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Text (Supported formats .md and .html)" prop="text" class="mb">
        <el-input v-model="controls.text" type="textarea" :rows="10" autocomplete="off" />
      </el-form-item>
      <el-upload
        ref="upload"
        class="mb"
        drag
        action=""
        :on-change="handeChange"
        :auto-upload="false"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
      </el-upload>
      <el-form-item>
        <el-button native-type="submit" round type="primary" :loading="loading">
          Create
        </el-button>
        <el-button round @click="dialogVisible = true">
          Preview
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
      dialogVisible: false,
      loading: false,
      image: null,
      controls: {
        text: '',
        title: ''
      },
      rules: {
        text: [
          { required: true, message: 'Text doesnt have to be empty', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'Title cant be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true
          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('posts/create', formData)
            this.controls.text = ''
            this.controls.title = ''
            this.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Post created')
          } catch (e) {

          } finally {
            this.loading = false
          }
        } else {
          this.$message.error('Where is image?')
        }
      })
    },
    handeChange (file, fileList) {
      this.image = file.raw
    }
  }
}
</script>
