<template>
  <div class="body">
    <top-bar> </top-bar>
    <Content> </Content>
    <bottom-bar> </bottom-bar>

    <!-- 回到顶部 -->
    <BackTop :height="120" :bottom="20" class="top">
      <i class="fa fa-arrow-up" style="font-size:12px; line-height:24px;padding:0"></i>
    </BackTop>
  </div>
</template>


<script>
import TopBar from './components/topBar'
import BottomBar from './components/bottomBar'
import Content from './components/content'

export default {
  name: 'homeIndex',
  components: {TopBar, BottomBar, Content}
}
</script>

<style>
body{
  -webkit-font-smoothing: auto
}
</style>

<style lang="stylus" scoped>
  .body
    background-color: #fff 
    .top
      color: #fff
      font-size: 12px
      background: #262a30
      width:24px
      height:24px
      text-align:center
      transition-property: bottom
      transition-duration: 0.2s
      transition-timing-function: ease-in-out
      transition-delay: 0s   
      
</style>
