<template>
  <div class="leftBar">
    <ul>
       <li v-for="menu of menus" :key="menu.id" class="li_style" @click="choseMenu(menu.id)">
         <router-link :to="'/admin/index/'+menu.path+'?flag='+flag" :class="menu.id==flag? 'links' :'link'">{{menu.title}}</router-link>
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
          title: "用户管理",
          path: "userList"
        },
      ],
      flag: 1,
    }
  },
  methods: {
    choseMenu: function(id) {
      this.flag=id;
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
