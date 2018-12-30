<template>
  <div class="container">
    <div class="no-article" v-if="!articleDetail" style="font-size:14px;text-align: center;">
      没有该文章信息哦～
    </div>
    
    <div v-if="articleDetail">
       <!-- 文章 -->
      <div class="title">{{articleDetail.title}}</div>
      <div class="meta">
        <ul>
          <li title="创建于"><i class="ii fa fa-calendar-o"></i> {{articleDetail.create_time}} </li>
          <li>|</li>
          <li title="分类于">
            <i class="ii fa fa-folder-o"></i> 
            <router-link :to="'/home/index/oneCategoryStats?id=' + articleDetail.category_id + '&name=' + articleDetail.category_name">{{articleDetail.category_name}}</router-link>
          </li>
          <li>|</li>
          <li title="阅读次数"><i class="ii fa fa-eye"></i> {{articleDetail.read_number}} </li>
          <li>|</li>
          <li title="复制次数"><i class="ii fa fa-file-o"></i>{{articleDetail.read_number}}</li>
        </ul>
      </div>
      <div v-html="articleDetail.content_html" class="markdown-body blockquote markdown-body dl markdown-body ol markdown-body p markdown-body pre markdown-body table markdown-body ul"></div>

      <!-- 作者、链接、版权信息 -->
      <div class="information">
        <ul>
        <li><strong>本文作者：</strong>luoqiang</li>
        <li><strong>本文链接：</strong>{{articleLink}}</li>
        <li><strong>版权申明：</strong>本博客所有文章除特别声明外，均采用 
          <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">
            CC BY-NC-SA 3.0  
          </a>
          许可协议。转载请注明出处！</li>
        </ul>
      </div>

      <!-- 标签 -->
      <div class="label">
        <ul v-for="(item,index) in articleDetail.label" :key="index">
          <router-link :to="'/home/index/oneLabelStats?id=' + item.id">
            <li>#{{item.name}}</li>
          </router-link>
        </ul>
      </div>

      <!-- 上一篇、下一篇文章 -->
      <hr style="border-top: 1px solid #eee;margin: 10px 0"/>
      <div class="pre_next">
        <ul>
          <router-link :to="'articleDetail?id='+ pre.id" v-if="pre">
            <li style="float:left"> <i class="fa fa-chevron-left" style="font-size:12px;margin-right:5px"></i> {{pre.title}} </li>
          </router-link>
          <router-link :to="'articleDetail?id='+ next.id" v-if="next">
            <li style="float:right">{{next.title}} <i class="fa fa-chevron-right" style="font-size:12px;margin-left:5px"></i> </li>
          </router-link>
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
import { getBaseUrl }  from '@/utils/config.js';
export default {
  name: '',
  data () {
    return {
      id: '',
      articleDetail: '',
      pre: '',
      next: '',
      articleLink: '',
      loading: false
    }
  },
  methods: {
    getDetail: function() {
      const id = this.id;
      this.loading = true;
      this.$ajax.post('blog/article/getDetail', {
        id: id
      })
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.articleDetail = res.data.data.article;
          this.pre = res.data.data.pre;
          this.next = res.data.data.next;
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
    this.id=this.$route.query.id,
    this.articleLink = window.location.host + this.$route.path + '?id=' + this.id;
    this.getDetail();
  },

  watch: {
    '$route' (to, from) {
      this.id=this.$route.query.id,
      this.articleLink = window.location.host + this.$route.path + '?id=' + this.id;
      this.getDetail();
    }
  }

}
</script>



<style lang="stylus" scoped>
  .container 
    background: #fff
    padding-top: 80px;
    .title
      font-size: 26px
      margin-bottom: 10px
      text-align: center  
      color: #555  
    .meta
      margin-bottom: 40px
      text-align: center
      line-height: 2
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
    .information
      width: 700px
      background: #f7f7f7
      padding: 7px 14px
      border-left: 3px solid #ff1700
      margin-top: 3px
      margin-bottom: 40px
      ul
        list-style: none
        font-size: 14px
        line-height: 2
        color: #555
        a
          color: #555
          text-decoration: none; 
          border-bottom: 1px solid #ccc; 
        a:hover
          border-bottom: 1px solid #222;
    .label
      width: 700px
      margin-bottom: 40px
      ul
        margin: 0 auto
        position: relative
        top: 2px
        display:inline-block
        a
          color: #515a6e
        li
          float: left
          text-decoration: none
          list-style: none
          padding: 1px 5px
          margin-right: 10px
          font-size: 13px
          background: #f5f5f5
          line-height: 2
        li:hover 
          cursor: pointer
          background: #ccc
          border-radius: 2px
    .pre_next
      width: 700px
      margin-bottom: 115px
      ul
        list-style: none
        font-size: 14px
        line-height: 2
        a
          color: #555
        a:hover
          color: #222
          
</style>
