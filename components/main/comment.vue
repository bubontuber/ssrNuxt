<template>
  <el-card class="comment">
    <div class="commentHeader">
      <small>{{ comment.name}}</small>
      <small>
        <i class="el-icon-time"></i>
        {{ new Date(comment.date).toLocaleString() }}</small>
    </div>
    <div class="commentText">
      {{ comment.text }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style lang="sass" scoped>
.comment
  margin-bottom: 1rem

.commentHeader
  color: #7F828B
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 0.5rem

.commentText
  white-space: pre-line
</style>
