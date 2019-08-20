<template>
  <h1>Log out</h1>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  beforeCreate () {
    this.$store.dispatch('auth/logOut')
    this.$router.push('/admin/login')
    this.$message.info('You signed out')
  }
}
</script>
