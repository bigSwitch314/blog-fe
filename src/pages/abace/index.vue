<template>
  <div class="content">
   <top-bar> </top-bar>
    <Content> </Content>
  </div>
</template>


<script>
import TopBar from './components/topBar'
import Content from './components/content'

export default {
  name: 'adminIndex',
  components: {TopBar, Content}
}
</script>


<style lang="stylus" scoped>
  .content
    background-color: #ffffff
    width: 100%
    height: 100%
    position: absolute
</style>