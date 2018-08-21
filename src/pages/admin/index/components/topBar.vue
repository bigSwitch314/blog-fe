<template>
  <div class="topBar">
    <span class="title">后台管理</span>
  </div>
</template>


<script>
export default {
  name: 'TopBar'
}
</script>



<style lang="stylus" scoped>
  .topBar
    background: #1f2d3d
    color: #eee
    width: 100%
    height: 60px
    z-index: 10
    position: fixed
    .title
      top: 14px
      left: 18px
      font-size: 22px
      position: relative

</style>
