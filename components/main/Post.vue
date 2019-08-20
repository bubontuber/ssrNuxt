<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="postHeader">
      <h3>{{ post.title }}</h3>
      <small><i class="el-icon-time" />{{ new Date(post.date).toLocaleString() }}</small>
    </header>
    <div class="postBody">
      <img :src="post.imgUrl" alt="" class="postImg">
    </div>
    <footer class="postFooter">
      <el-button round @click="openPost">
        Open
      </el-button>
      <span>
        <i class="el-icon-tickets" />
        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost () {
      const id = this.post._id
      this.$router.push(`/post/` + id)
    }
  }
}
</script>

<style lang="sass" scoped>
.post
  margin-bottom: 2rem

.postHeader
  display: flex
  align-items: center
  justify-content: space-between

.postImg
  width: 100%
  height: auto

.postFooter
  padding: 1rem
  display: flex
  justify-content: space-between
  align-items: center
</style>
