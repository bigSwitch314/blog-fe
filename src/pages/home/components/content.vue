<template>
  <div class="content" :style="minHeightSty">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ffcontent',
  data() {
    return {
      minHeightSty: ''
    }
  },
  created() {
    this.getMinHeight(); 
  },
  methods: {
    // 内容区域最小高度
    getMinHeight() {
      const documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const minHeight = documentHeight - 286;
      this.minHeightSty = 'min-height:' + minHeight + 'px';
    }
  }
}
</script>


<style lang="stylus" scoped>
  .content
    width: 100%
    height: auto
    min-height:517px
    .container 
      margin: 0 auto
      width: 700px
      height: 100%
      position: relative
</style>
