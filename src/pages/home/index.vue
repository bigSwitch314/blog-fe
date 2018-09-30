<template>
  <div class="body">
    <top-bar> </top-bar>
    <bottom-bar> </bottom-bar>
    <Content> </Content>
  </div>
</template>


<script>
import TopBar from './components/topBar'
import BottomeBar from './components/bottomBar'
import Content from './components/content'

export default {
  name: 'homeIndex',
  components: {TopBar, BottomeBar, Content}
}
</script>


<style lang="stylus" scoped>
  .body
    background-color: #1f2d3d
</style>
