<template>
  <div class="container">
    <div class="no-article" v-if="!pageTotal" style="font-size:14px;text-align: center;">
      目前还未添加文章哦～
    </div>
    <div class="have-article" v-if="pageTotal">
      <div class="title">
        <span>非常好! 目前共计 {{pageTotal}} 篇日志。 继续努力。</span>
      </div>
      <div v-for="item in articleList" :key="item.id">
        <div class="year" v-if="item.isDisplayYear">
          <span>{{item.year}}</span>
        </div>
        <div class="article">
          <span class="time">{{item.date}}</span>
          <router-link :to="'articleDetail?id=' + item.id">{{item.title}}</router-link>
        </div>
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
      label_name: '',
      loading: false
    }
  },
  methods: {
    getArticleList: function() {
      this.loading = true;
      const searchData = this.searchData;
      this.$ajax.post('blog/Article/getArchive', {
        page_no: searchData.page_no,
        page_size: searchData.page_size,
      })
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.articleList = res.data.data.list;
          this.pageTotal = res.data.data.count;
          console.log(this.articleList)
          console.log(this.pageTotal)
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
    this.label_name=this.$route.query.name,
    this.getArticleList();
  },

}
</script>



<style lang="stylus" scoped>
  .container 
    padding-top: 80px
    padding-bottom: 40px
    .have-article
      font-size: 16px
      position: relative
      .title
        position: relative
        margin-bottom: 60px
        font-size: 14px
        span
          margin-left: 20px
      .title::before
        content: " ";
        position: absolute;
        left: 0
        top: 50%
        margin-left: -5px
        margin-top: -5px
        width: 10px
        height: 10px
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
      .year
        line-height: 32px
        padding-bottom: 10px
        border-bottom: none
        margin-bottom : 30px
        margin-top : 50px
        position: relative
        span 
          margin-left: 20px
          margin-right: 6px
          font-size: 22px
        a 
          color: #666
      .year:hover
        border-bottom: none
      .year::before
        content: " "
        position: absolute
        left: 0
        top: 12px
        width: 10px
        height: 10px
        margin-left: -4px
        background: #bbb
        border-radius: 50%
        border: 1px solid #fff
        z-index: 8
    .have-article::after 
      content: " "
      position: absolute
      top: 14px
      left: 0
      margin-left: -2px
      width: 4px
      height: 100%
      background: #f5f5f5
      z-index: 1

        


</style>
