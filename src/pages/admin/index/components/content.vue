<template>
  <div class="content">
     <div class="top border">
        <router-link :to="urlFrom">
          <span class="back" v-if="back">返回</span>
        </router-link>
        <router-link :to="urlFrom" v-if="back">
          <span class="title">{{title}} </span>
        </router-link>
        <span class="title" v-if="!back">{{title}} </span>
        <span class="subtitle">{{subtitle}}</span>    
     </div>
     <div class="tableDisplay">
       <router-view></router-view>
     </div>
    
  </div>
</template>


<script>
export default {
  name: 'Content',
  data () {
    return {
      back: false,
      title: '文章列表',
      subtitle: '',
      urlTo: '',
      urlFrom: '',
    }
  },
  methods: {
    getTopTitle: function() {
      const name = this.$route.path.split('/').pop();
      switch(name) {
        case 'articleList':
          this.back = false;
          this.title = '文章列表';
          this.subtitle = '';
          break;
        case 'articleAdd':
          this.back = true;
          this.title = '文章列表';
          this.subtitle = ' > 文章添加';
          this.urlFrom = '/admin/index/articleList';
          break;
        case 'categoryList':
          this.back = false;
          this.title = '分类列表';
          this.subtitle = '';
          break;
        case 'categoryAdd':
          this.back = true;
          this.title = '分类列表';
          this.subtitle = ' > 分类添加';
          this.urlFrom = '/admin/index/categoryList'
          break;
        case 'categoryEdit':
          this.back = true;
          this.title = '分类列表';
          this.subtitle = ' > 分类编辑';
          this.urlFrom = '/admin/index/categoryList';
          break;
        case 'labelList':
          this.back = false;
          this.title = '标签列表';
          this.subtitle = '';
          break;
        case 'labelAdd':
          this.back = true;
          this.title = '标签列表';
          this.subtitle = ' > 标签添加';
          this.urlFrom = '/admin/index/labelList'
          break;
        case 'labelEdit':
          this.back = true;
          this.title = '标签列表';
          this.subtitle = ' > 标签编辑';
          this.urlFrom = '/admin/index/labelList';
          break;
        case 'userList':
          this.back = false;
          this.title = '用户列表';
          this.subtitle = '';
          break;
        case 'userAdd':
          this.back = true;
          this.title = '账号列表';
          this.subtitle = ' > 账号添加';
          this.urlFrom = '/admin/index/userList'
          break;
        case 'userEdit':
          this.back = true;
          this.title = '账号列表';
          this.subtitle = ' > 账号编辑';
          break;
      }
    }
  },
  created () {
    this.getTopTitle();
  },
  watch: {
    '$route' (to, from) {
      this.urlTo = to.path;
      this.urlFrom = from.path;
      this.getTopTitle();
    }
  }
}
</script>


<style lang="stylus" scoped>
  .content
    background: #f1f2f7
    top: 100px
    left : 140px
    width: 100%
    height: 100%
    position: absolute
    overflow:auto
    .border
      &:before
        border-color: #ccc
      &:after
        border-color: #ccc
    .tableDisplay
       padding-right: 180px   
       padding-left: 40px;
       top: 40px
       position: relative
    .top
      background: #fff
      height: 40px
      left:140px
      top:60px
      width: 100%
      z-index:99
      position: fixed
      .back
        left: 18px
        top: 10px
        margin-right: 8px
        font-size: 12px
        position: relative
      .title
        left: 18px
        top: 10px
        font-size: 14px
        color: #000
        padding-left: 8px
        border-left-width: 4px
        border-left-style: solid
        border-left-color: rgb(217, 83, 79)
        position: relative
      .subtitle 
        top: 10px
        left: 20px
        font-size: 14px
        color: #999;
        position: relative
          
  
</style>
