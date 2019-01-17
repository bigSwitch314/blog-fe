<template>
  <div class="container">
    <div class="no-about" v-if="false" style="font-size:14px;text-align: center;">
      还未添加作者简介哦～
    </div>
    <div class="aboutList" v-if="true">
      <div class="title">about</div>
      <div class="list">
        11111
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
      pageTotal: 0,
      searchData: {
        page_no: 1,
        page_size: 10,
      },
      articleList: [],
      loading: false
    }
  },
  methods: {
    getArticleList: function() {
      this.loading = true;
      const searchData = this.searchData;
      this.$ajax.post('blog/article/get', {
        type: 3,
        page_no: searchData.page_no,
        page_size: searchData.page_size
      })
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.articleList = res.data.data.list;
          this.pageTotal = res.data.data.count;
        } else {
          this.$Message.error(res.data.errmsg);
        }
      })
      .catch(err => {
        console.log(err);
      }); 
    },
  },
  created() {
    this.getArticleList();
  },

}
</script>



<style lang="stylus" scoped>
  .container 
    background: #fff
    padding-top: 80px
    .aboutList
      font-size: 14px
      .title
        font-size: 26px
        margin-bottom: 10px
        text-align: center  
        color: #555
      .list
        padding-bottom: 40px
</style>
