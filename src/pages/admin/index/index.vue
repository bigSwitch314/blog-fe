<template>
  <div class="body">
    <top-bar> </top-bar>
    <left-bar> </left-bar>
    <Content> </Content>
  </div>
</template>


<script>
import TopBar from './components/topBar'
import LeftBar from './components/leftBar'
import Content from './components/content'

export default {
  name: 'adminIndex',
  components: {TopBar, LeftBar, Content}
}
</script>


<style lang="stylus" scoped>
  .body
    background-color: #1f2d3d
</style>
