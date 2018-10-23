<template>
  <div class="container">
    <div class="no-category" v-if="false" style="font-size:14px;text-align: center;">
      还未添加分类哦～
    </div>
    <div class="categoryList" v-if="true">
      <div class="title">分类</div>
      <div class="stats">目前共计 {{allCategoryStats.count}} 个分类</div>
      <div class="list">
        <ul>
          <li v-for="item in allCategoryStats.list" :key="item.id">
            <span>
              <router-link :to="'/home/index/oneCategoryStats?id=' + item.id + '&name=' + item.name">{{item.name }}</router-link>
              ({{item.article_number}})
            </span>
          </li>
        </ul>  
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
      allCategoryStats: ''
    }
  },
  methods: {
    getAllCategoryStats: function() {
      this.loading = true;
      this.$ajax.post('blog/category/getAllCategoryStats', {})
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.allCategoryStats = res.data.data;
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
    this.getAllCategoryStats();
  },

}
</script>



<style lang="stylus" scoped>
  .container 
    background: #fff
    padding-top: 80px
    .categoryList
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
        ul li
          padding-top: 5px
          padding-right: 10px
          padding-bottom: 5px
          font-size: 16px
          list-style: circle
          list-style-position: inside
          span 
            font-size: 14px
            margin-left: -8px
            color: #bbb
            a
              color: #555
              text-decoration: none; 
              border-bottom: 1px solid #ccc; 
            a:hover
              border-bottom: 1px solid #222;

</style>
