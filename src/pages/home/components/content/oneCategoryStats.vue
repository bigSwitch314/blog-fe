<template>
  <div class="container">
    <div class="no-article" v-if="!pageTotal" style="font-size:14px;text-align: center;">
      {{categoty_name}}分类还未添加文章哦～
    </div>
    <div class="have-article" v-if="pageTotal">
      <div class="title">
        <span>{{categoty_name}}</span> 
        <small>分类</small> 
      </div>
      <div class="article" v-for="item in articleList" :key="item.id">
        <span class="time">{{item.create_time}}</span>
        <router-link :to="'articleDetail?id=' + item.id">{{item.title}}</router-link>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="pageTotal >= 10" style="margin-bottom:10px;margin-top:120px">
      <hr style="border-top: 1px solid #eee"/>
      <Page :total="pageTotal" :postData="searchData" @on-change="pageChange" @on-page-size-change="pageSizeChange" size="small" style="font-size:14px"/>
    </div>

    <!-- spin -->
    <Spin fix v-if="loading" size="large" style="width:85%; height:350px; position:fix;">
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
        id: ''
      },
      articleList: [],
      categoty_name: '',
      loading: false
    }
  },
  methods: {
    getArticleList: function() {
      this.loading = true;
      const searchData = this.searchData;
      this.$ajax.post('blog/category/getArticleByCategory', {
        id: searchData.id,
        page_no: searchData.page_no,
        page_size: searchData.page_size,
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
    pageChange (page_no) {
      this.searchData.page_no = page_no;
      this.getArticleList();
    },
    pageSizeChange (page_size) {
      this.searchData.page_size = page_size;
      this.getArticleList();
    }
  },
  created() {
    this.searchData.id=this.$route.query.id,
    this.categoty_name=this.$route.query.name,
    this.getArticleList();
  },

}
</script>



<style lang="stylus" scoped>
  .container 
    padding-top: 80px
    .have-article
      font-size: 16px
      position: relative
      .title
        position: relative
        margin-bottom: 60px
        font-size: 22px
        font-weight: bold
        span
          margin-left: 20px
        small 
          color: #bbb;
          margin-left: 5px
      .title::before
        content: " ";
        position: absolute;
        left: 0
        top: 50%
        margin-left: -4px
        margin-top: -4px
        width: 8px
        height: 8px
        background: #bbb
        border-radius: 50%
        z-index: 8
      .article
        line-height: 32px
        padding-bottom: 10px
        border-bottom: 1px dashed #ccc
        margin: 30px 0
        position: relative
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out
        transition-delay: 0s
        transition-property: border-bottom
        span 
          margin-left: 20px
          margin-right: 6px
          font-size: 12px
        a 
          color: #666
      .article:hover
        border-bottom: 1px dashed #666
      .article::before
        content: " "
        position: absolute
        left: 0
        top: 12px
        width: 8px
        height: 8px
        margin-left: -4px
        background: #bbb
        border-radius: 50%
        border: 1px solid #fff
        transition-duration: 0.2s
        transition-timing-function: ease-in-out
        transition-delay: 0s
        transition-property: background
        z-index: 8
      .article:hover::before
        background: #222
    .have-article::after 
      content: " "
      position: absolute
      top: 20px
      left: 0
      margin-left: -2px
      width: 4px
      height: 100%
      background: #f5f5f5
      z-index: 1

        


</style>
