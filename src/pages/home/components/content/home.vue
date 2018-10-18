<template>
  <div class="container">
    <!-- 文章列表 -->
    <div class="no-article" v-if="!articleList.length" style="font-size:14px;text-align: center;">
      还未发布文章哦～
    </div>

    <div class="articleList" v-if="articleList.length" v-for="article in articleList" :key="article.id">
      <div class="title">
        <router-link :to="'index/articleDetail?id='+ article.id" style="color: #555">{{article.title}}</router-link>
      </div>
      <div class="meta">
        <ul>
          <li><i class="ii fa fa-calendar-o"></i> 创建于{{article.create_time}} </li>
          <li>|</li>
          <li><i class="ii fa fa-folder-o"></i> 分类于 <router-link to="/home/index">{{article.category_name}}</router-link></li>
          <li>|</li>
          <li><i class="ii fa fa-eye"></i> 阅读次数:{{article.read_number}}  </li>
        </ul>
      </div>
      <div class="content">
        {{article.content}}
        <div class="readAll">
          <router-link :to="'index/articleDetail?id='+ article.id">
            <span style="border-bottom: 2px solid rgb(102, 102, 102); padding-bottom:2px">阅读全文</span> »  
          </router-link>
          </div>      
      </div>
    </div>

     <!-- 分页 -->
    <div v-if="articleList.length" style="margin-bottom:10px">
       <hr style="border-top: 1px solid #eee"/>
       <Page :total="pageTotal" :postData="searchData" @on-change="pageChange" @on-page-size-change="pageSizeChange" size="small" style="font-size: 14px"/>
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
    pageChange (page_no) {
      this.searchData.page_no = page_no;
      this.getArticleList();
    },
    pageSizeChange (page_size) {
      this.searchData.page_size = page_size;
      this.getArticleList();
    },
  },
  created() {
    this.getArticleList();
  },
  
}
</script>



<style lang="stylus" scoped>
  .container 
    padding-top: 80px
    .articleList
      margin-bottom: 120px
      .title
        font-size: 26px
        margin-bottom: 10px
        position: relative
        width:auto
        display:inline-block !important
        display:inline
      .title:after
        content: ""
        width: 0
        height: 2px
        background: #111
        position: absolute
        top: 90%
        left: 50%
        transition: all .3s
      .title:hover:after
        left: 0%
        width: 100%
      .meta
        margin-bottom: 20px
        a
          color: #555
          text-decoration: none; 
          border-bottom: 1px solid #ccc; 
        a:hover
          border-bottom: 1px solid #222;  
      .meta ul
        position: relative
        top: 2px
        display:inline-block
        color: #999
      .meta ul li
        float: left
        text-decoration: none
        list-style: none
        font-size: 12px
        padding-right: 10px
        .ii
         padding-right: 4px 
      .content
        font-size: 14px
        line-height: 28px
        color: #555
        .readAll
          margin-top: 20px   
          a
            color: #555
          a:hover
            color: #222  

</style>
