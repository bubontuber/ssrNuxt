<template>
  <article class="post">
    <header class="postHeader">
      <div class="postTitle">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back" />
        </nuxt-link>
      </div>
      <div class="postInfo">
        <small>
          <i class="el-icon-time" />
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view" />
          {{ post.views }}
        </small>
      </div>
    </header>
    <div class="postImg">
      <img :src="post.imgUrl" alt="">
    </div>
    <main class="postContent">
      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>
    <footer>
      <app-form
        v-if="canAddComment"
        :post-id="post._id"
        @created="createCommentHandler"
      />
      <div v-if="post.comments.length" class="comments">
        <app-comments
          v-for="com in post.comments"
          :key="com._id"
          :comment="com"
        />
      </div>
      <div v-else class="text-center">
        No comments yet
      </div>
    </footer>
  </article>
</template>
<script>
import AppComments from '@/components/main/comment'
import AppForm from '@/components/main/CommentForm'
export default {
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  components: {
    AppComments,
    AppForm
  },
  data () {
    return {
      canAddComment: true
    }
  },
  async asyncData ({ store, params }) {
    const post = await store.dispatch('posts/fetchById', params.id)
    await store.dispatch('posts/addView', post)
    return {
      post: {
        ...post,
        views: ++post.views
      }
    }
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  methods: {
    createCommentHandler (comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  }
}
</script>
<style lang="sass" scoped>
.post
  max-width: 600px
  margin: 0 auto

.postTitle
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1rem

.postInfo
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1rem

.postImg img
  width: 100%
  height: auto

.postHeader
  margin-bottom: 1.5rem

.postContent
  margin-bottom: 2rem
  margin-top: 2rem
</style>
