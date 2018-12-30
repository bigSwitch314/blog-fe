<template>
  <div class="container">
    <div class="no-Label" v-if="false" style="font-size:14px;text-align: center;">
      还未添加标签哦～
    </div>
    <div class="LabelList" v-if="true">
      <div class="title">标签</div>
      <div class="stats">目前共计 {{allLabelStats.count}} 个标签</div>
      <div class="list">
        <router-link
          v-for="item in allLabelStats.list"
          :key="item.id" 
          :to="'/home/index/oneLabelStats?id=' + item.id + '&name=' + item.name"
          :class="['itemSty', sizeLevel[item.size]]"
        >
          {{item.name }}
        </router-link>
      </div>
    </div>

    <!-- spin -->
    <Spin fix v-if="loading" size="large" class = "positionSty">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    
  </div>
  
</template>


<script>
export default {
  name: '',
  data () {
    return {
      allLabelStats: '',
      sizeLevel: ['', 'level1', 'level2', 'level3', 'level4', 'level5'],
    }
  },
  methods: {
    getAllLabelStats: function() {
      //this.loading = true;
      this.$ajax.post('blog/Label/getAllLabelStats', {})
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.allLabelStats = res.data.data;
        } else {
          this.$Message.error(res.data.errmsg);
        }
      })
      .catch(err => {
        console.log(err);
      }); 
    }
  },
  created() {
    this.getAllLabelStats();
  },

}
</script>



<style lang="stylus" scoped>
  .container 
    background: #fff
    padding-top: 80px
    .LabelList
      font-size: 14px
      .title
        font-size: 26px
        margin-bottom: 10px
        text-align: center  
        color: #555
      .stats
        margin-bottom: 20px
        text-align: center 
        line-height: 2 
      .list
        padding-bottom: 40px
        text-align: center
        height: auto
        .itemSty
          font-size: 14px
          margin: 10px
          display: inline-block
          color: #ccc
          border-bottom: 1px solid #ccc
        .itemSty:hover
          border-bottom: 1px solid #222
        .level1
          font-size: 12px;
          color: #ccc;
        .level2
          font-size: 17.14px
          color: #979797
        .level3
          font-size: 19.71px;
          color: #7c7c7c;
        .level4
          font-size: 22.29px
          color: #616161
        .level5
          font-size: 30px
          color: #111

</style>
