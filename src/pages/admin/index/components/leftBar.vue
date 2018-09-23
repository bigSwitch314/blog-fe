<template>
  <div class="leftBar">
    <ul>
       <li v-for="menu of menus" :key="menu.id" class="li_style" @click="choseMenu(menu.id)">
         <router-link :to="'/admin/index/'+menu.path" :class="menu.id==flag? 'links' :'link'">{{menu.title}}</router-link>
       </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'LeftBar',
  data () {
    return {
      menus: [
        {
          id: "1",
          title: "文章管理",
          path: "articleList"
        },
        {
          id: "2",
          title: "分类管理",
          path: "categoryList"
        },
        {
          id: "3",
          title: "标签管理",
          path: "labelList"
        },
        {
          id: "4",
          title: "账号管理",
          path: "userList"
        },
      ],
      flag: 1,
    }
  },
  created () {
    this.getMenu();
  },
  methods: {
    choseMenu: function(id) {
      this.flag=id;
    },
    getMenu: function() {
       const name = this.$route.path.split('/').pop();
      if (name.indexOf("article") != -1) {
        this.flag = 1;
      } else if (name.indexOf("category") != -1) {
        this.flag = 2;
      } else if (name.indexOf("label") != -1) {
        this.flag = 3;
      } else if (name.indexOf("user") != -1) {
        this.flag = 4;
      }
    } 
  },
   watch: {
    '$route' (to, from) {
     this.getMenu();
    }
  }
}
</script>



<style lang="stylus" scoped>
  .leftBar
    background: #324057
    width: 140px
    height: 100%
    top: 60px
    position: fixed
    z-index: 10
    .li_style
      font-size:14px 
      line-height:30px
      text-indent: 38px
      cursor: pointer
      display: block
      .link
        width: 100%
        color: #ccc
        display: block
      .links
        width: 100%
        color: #44b5df
        display: block
    .li_style:hover
      background: #789

</style>
