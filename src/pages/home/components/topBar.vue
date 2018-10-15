<template>
  <div class="topBar">
      <div class="container">
          <div class="title">
              <span class="line"><i></i></span>
              <router-link to="/home/index">每天进步一点点</router-link>
              <span class="line"><i></i></span>
          </div>
          <div class="menu">
            <ul>
              <router-link to="/home/index">
                <li> <i class="menu-item-icon fa fa-fw fa-home"></i> 首页 </li>
              </router-link>
              <router-link to="/home/index/category">
                <li> <i class="menu-item-icon fa fa-fw fa-th"></i> 分类 </li>
              </router-link>
              <router-link to="/home/index/label"> 
                <li> <i class="menu-item-icon fa fa-fw fa-tags"></i> 标签 </li>
              </router-link>  
              <router-link to="/home/index/archive">
                <li> <i class="menu-item-icon fa fa-fw fa-archive"></i> 归档 </li>
              </router-link>  
              <router-link to="/home/index/about">     
                <li> <i class="menu-item-icon fa fa-fw fa-user"></i> 关于 </li> 
              </router-link>
              <router-link to="/home/index/reprint">
                <li> <i class="menu-item-icon fa fa-fw fa-gg"></i> 转载 </li> 
              </router-link> 
              <router-link to="/home/index/openSource">
                <li><i class="menu-item-icon fa fa-fw fa-github"></i> 开源项目 </li> 
              </router-link> 
              <router-link to="/home/index">    
                <li> <i class="menu-item-icon fa fa-search fa-fw"></i> 搜索 </li>
              </router-link> 
              <router-link to="/home/index">    
                <li> <i class="menu-item-icon fa fa-search fa-fw"></i> 后台 </li>
              </router-link> 
	        </ul> 
          </div> 
      </div>
  </div>
</template>


<script>
export default {
  name: 'TopBar'
}
</script>


<style lang="stylus" scoped>
  .topBar
    background: #f5f5f5
    width: 100%
    height: 154px
    .container 
      margin: 0 auto
      width: 700px
      height: 100%
      position: relative
      .title
        font-size: 22px
        font-weight: bolder
        position: absolute
        top: 30px
        .line i 
          position: relative
          display: block
          height: 2px
          background: #222
          width: 75%
          margin: 0 auto
      .title a 
        color: #222
      .menu
        position: absolute
        text-align: center
        width: 700px
        margin: 0 auto 
        top: 90px
        left: 50%
        margin-left: -350px;
        font-size: 13px
        ul
          margin: 0 auto
          position: relative
          top: 2px
          display:inline-block
        ul a
          color: #515a6e
        li
          float: left
          text-decoration: none
          list-style: none
          padding-left: 11px
          padding-right: 11px
          font-size: 14px
        li:hover 
          cursor: pointer
          background: #e1e1e1
          border-radius: 2px

</style>
