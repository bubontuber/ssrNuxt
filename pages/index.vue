<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="18" :lg="10">
      <app-post
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '@/components/main/Post'
export default {
  head: {
    title: `Awesome blog | ${process.env.appName}`
  },
  components: {
    AppPost
  },
  async asyncData ({ store }) {
    const posts = await store.dispatch('posts/fetch')
    return { posts }
  }
}
</script>
