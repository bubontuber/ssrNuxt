<template>
  <div class="emptyLayout">
    <nuxt />
  </div>
</template>
<style lang="sass" scoped>
.emptyLayout
  display: flex
  justify-content: center
  width: 100%
  padding-top: 4rem
</style>
<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>
