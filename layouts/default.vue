<template>
  <div>
    <el-container>
      <el-header>
        <app-navigation />
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import appNavigation from '@/components/main/Navigation'
export default {
  components: {
    appNavigation
  }
}
</script>
