<template>
  <div class="container">
    <!-- 文章列表 -->
    <div class="no-article" v-if="!haveArticle" style="font-size:14px;text-align: center;">
      还未发布文章哦～
    </div>

    <div class="articleList" v-if="haveArticle">
      <div class="title">
        <router-link to="/foo" style="color: #555">golang40行代码实现通用协程池</router-link>
      </div>
      <div class="meta">
        <ul>
          <li><i class="ii fa fa-calendar-o"></i> 创建于2018-08-08 </li>
          <li>|</li>
          <li><i class="ii fa fa-folder-o"></i> 分类于goland </li>
          <li>|</li>
          <li><i class="ii fa fa-eye"></i> 阅读次数: 74 </li>
        </ul>
      </div>
      <div class="content">
        代码仓库goroutine-pool golang 的协程管理golang 协程机制很方便的解决了并发编程的问题，但是协程并不是没有开销的，所以也需要适当限制一下数量。 不使用协程池的代码(示例代码使用 chan 实现，代码略啰嗦)1234567891011121314151617181920212 ...
        <div class="readAll">
          <router-link to="/foo" style="color: #555">
            <span style="border-bottom: 2px solid rgb(102, 102, 102); padding-bottom:2px">阅读全文</span> »  
          </router-link></div>      
      </div>
    </div>

    <div class="articleList" v-if="haveArticle">
      <div class="title">
        <router-link to="/foo" style="color: #555">golang40行代码实现通用协程池</router-link>
      </div>
      <div class="meta">
        <ul>
          <li title="发表时间"><i class="ii fa fa-calendar-o"></i> 2018-08-08 </li>
          <li>|</li>
          <li title="分类"><i class="ii fa fa-folder-o"></i> goland </li>
          <li>|</li>
          <li title="阅读次数"><i class="ii fa fa-eye"></i> 56 </li>
        </ul>
      </div>
      <div class="content">
        代码仓库goroutine-pool golang 的协程管理golang 协程机制很方便的解决了并发编程的问题，但是协程并不是没有开销的，所以也需要适当限制一下数量。 不使用协程池的代码(示例代码使用 chan 实现，代码略啰嗦)1234567891011121314151617181920212 ...
        <div class="readAll">
          <router-link to="/foo" style="color: #555">
            <span style="border-bottom: 2px solid rgb(102, 102, 102); padding-bottom:2px">查看原文</span> »  
          </router-link></div>      
      </div>
    </div>

    <div class="articleList" v-if="haveArticle">
      <div class="title">
        <router-link to="/foo" style="color: #555">golang40行代码实现通用协程池</router-link>
      </div>
      <div class="meta">
        <ul>
          <li title="发表时间"><i class="ii fa fa-calendar-o"></i> 2018-08-08 </li>
          <li>|</li>
          <li title="分类"><i class="ii fa fa-folder-o"></i> goland </li>
          <li>|</li>
          <li title="阅读次数"><i class="ii fa fa-eye"></i> 56 </li>
        </ul>
      </div>
      <div class="content">
        代码仓库goroutine-pool golang 的协程管理golang 协程机制很方便的解决了并发编程的问题，但是协程并不是没有开销的，所以也需要适当限制一下数量。 不使用协程池的代码(示例代码使用 chan 实现，代码略啰嗦)1234567891011121314151617181920212 ...
        <div class="readAll">
          <router-link to="/foo" style="color: #555">
            <span style="border-bottom: 2px solid rgb(102, 102, 102); padding-bottom:2px">查看原文</span> »  
          </router-link></div>      
      </div>
    </div>

    <div class="articleList" v-if="haveArticle">
      <div class="title">
        <router-link to="/foo" style="color: #555">golang40行代码实现通用协程池</router-link>
      </div>
      <div class="meta">
        <ul>
          <li title="发表时间"><i class="ii fa fa-calendar-o"></i> 2018-08-08 </li>
          <li>|</li>
          <li title="分类"><i class="ii fa fa-folder-o"></i> goland </li>
          <li>|</li>
          <li title="阅读次数"><i class="ii fa fa-eye"></i> 56 </li>
        </ul>
      </div>
      <div class="content">
        代码仓库goroutine-pool golang 的协程管理golang 协程机制很方便的解决了并发编程的问题，但是协程并不是没有开销的，所以也需要适当限制一下数量。 不使用协程池的代码(示例代码使用 chan 实现，代码略啰嗦)1234567891011121314151617181920212 ...
        <div class="readAll">
          <router-link to="/foo" style="color: #555">
            <span style="border-bottom: 2px solid rgb(102, 102, 102); padding-bottom:2px">查看原文</span> »  
          </router-link></div>      
      </div>
    </div>

     <!-- 分页 -->
    <div v-if="haveArticle" style="margin-bottom:10px">
       <hr style="border-top: 1px solid #eee"/>
       <Page :total="400" size="small" style="font-size: 14px"/>
    </div>

    
  


    
  </div>
  
</template>


<script>
export default {
  name: '',
  data () {
    return {
      articleList: [
        {
          title: "golang40行代码实现通用协程池",
          create_time: "2018-08-08",
          category: "goland",
          read_number: 56,
          content: "代码仓库goroutine-pool golang 的协程管理golang 协程机制很方便的解决了并发编程的问题，但是协程并不是没有开销的，所以也需要适当限制一下数量。 不使用协程池的代码(示例代码使用 chan 实现，代码略啰嗦)1234567891011121314151617181920212 ..."
        },
      ],
      haveArticle: 1,
    }
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

</style>
