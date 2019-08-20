<template>
  <el-menu
    router
    style="height: 100%"
    :default-active="$route.path"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-setting"></i>
      <span>Analytics</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit"></i>
      <span>Create</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-document-copy"></i>
      <span>Posts</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <i class="el-icon-user"></i>
      <span>Users</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-switch-button"></i>
      <span>Log out</span>
    </el-menu-item>
  </el-menu>
</template>
<style lang="sass" scoped>

</style>
