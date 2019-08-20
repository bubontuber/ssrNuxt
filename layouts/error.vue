<template>
  <div class="errorLayout">
    <div class="errorContent">
      <div class="errorTitle">Error 404</div>
    </div>
    <nuxt-link to="/"><el-button>Go to home</el-button></nuxt-link>
  </div>
</template>
<style lang="sass" scoped>
.errorLayout
  height: 80vh
  display: flex
  flex-direction: column
  width: 100%
  justify-content: center
  align-items: center

.errorTitle
  color: orangered
  font-size: 96px
</style>
