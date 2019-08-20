<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column
      prop="title"
      label="Name"
    />
    <el-table-column
      label="Date"
    >
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time" />
        <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="views"
      label="Views"
    />
    <el-table-column
      label="Comments"
    >
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-message" />
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Actions"
    >
      <template slot-scope="scope">
        <el-button size="mini" @click="open(scope.row._id)">
          Edit
        </el-button>
        <el-button size="mini" type="danger" @click="remove(scope.row._id)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  async asyncData ({ store }) {
    const posts = await store.dispatch('posts/fetchAdminPosts')
    return { posts }
  },
  methods: {
    open (id) {
      this.$router.push(`/admin/post/${id}`)
    },
    async remove (id) {
      try {
        await this.$confirm('Delete?', 'Warning!', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        await this.$store.dispatch('posts/removePost', id)
        this.$message.success('Post deleted!')
        this.posts = this.posts.filter(p => p._id !== id)
      } catch (e) {

      }
    }
  }
}
</script>
