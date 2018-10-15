<template>
  <div class="bottomBar">
    <div class="container">
      <div class="copyright">
          © 2018 — 2019 
        <span style="margin: 3px"><i class="fa fa-user"></i></span>
        <span class="author">luoqiang</span>
      </div>
      <div class="powered-by">
        由PHP+Mysql强力驱动
        <span style="margin: 3px">|</span>
        主题 — NexT.Mist v5.1.3
      </div>
      <div class="custom">渝ICP备14062481号-1</div>
      <div class="busuanzi-count">
        <span title="site-uv"><i class="fa fa-user" style="margin-right:6px" ></i>1234</span> 
        <span style="margin: 14px">|</span>
        <span title="site-pv"><i class="fa fa-eye" style="margin-right:6px" ></i>2234</span> 
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'BottomBar'
}
</script>



<style lang="stylus" scoped>
  .bottomBar
    width: 100%
    height: 132px
    padding: 10px 0
    background: #f5f5f5
    .container 
      margin: 0 auto
      width: 700px
      height: 100%
      position: relative
      font-size: 14px
      .copyright 
        padding-top: 6px
      .powered-by 
        padding-top: 6px
      .custom 
        padding-top: 6px
      .busuanzi-count 
        padding-top: 6px
        
    

</style>
