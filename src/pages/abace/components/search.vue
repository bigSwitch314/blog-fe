<template>
  <div class="container">
    <div class="content">
      <Input v-model="keyword" search enter-button  placeholder="Enter something..." class="inputSty"  @on-search="doSearch" />
      <Select v-model="selected" class="selectSty">
        <Option :value=1 >by Cat</Option>
        <Option :value=2 >by Title</Option>
        <Option :value=3 >by Industry</Option>
        <Option :value=4 >by Tag</Option>
      </Select>
      <span class="title">Abace Online Database</span>
      <span class="list">
        <span style="margin-left:15px;color:#57a3f3;cursor:pointer" @click="doTagList">TagList</span>
        <span style="margin-left:15px;color:#57a3f3;cursor:pointer" @click="doCompanyList">CompanyList</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      selected: 1,
      keyword: ''
       
    }
  },
  methods: {
    doSearch () {
      if (!window.localStorage.token || !window.localStorage.user_id || !window.localStorage.username) {
        localStorage.clear();
        this.$Message.error('Please login');
        return false;
      } 
      if (!this.keyword) {
        this.$Message.config({top: 200});
        this.$Message.error('请输入搜索关键字!');
        return false;
      }
      this.$router.push('/abace/index/customerList?type='+this.selected+'&keyword='+this.keyword);
    },
    doTagList () {
      if (!window.localStorage.token || !window.localStorage.user_id || !window.localStorage.username) {
        localStorage.clear();
        this.$Message.error('Please login');
        return false;
      } 
      this.$router.push('/abace/index/tagList');
    },
    doCompanyList () {
      if (!window.localStorage.token || !window.localStorage.user_id || !window.localStorage.username) {
        localStorage.clear();
        this.$Message.error('Please login');
        return false;
      }
      this.$router.push('/abace/index/companyList'); 
    }

  },
  created () {
    
  },
  watch: {
   
  }
}
</script>

<style>
  .ivu-select-selection {
    
    background-color: #eaeaea;
    border-radius: 4px;
    border: none;
    transition: none;
}
</style>


<style lang="stylus" scoped>
  .container
    background: #ffffff
    width: 100%
    height: 100%
    position: absolute
    overflow:auto
    padding-top: 45px
    .border
      &:before
        border-color: #ccc
      &:after
        border-color: #ccc
    .content
      width: 800px
      height 400px
      top: 160px
      position: relative
      margin:  0 auto
      .inputSty
        width: 500px
        position: absolute
        right:104px
        top:100px
      .title
        font-size: 24px
        position:relative
        left:270px
      .list
        position: absolute
        right:104px
        top:140px
      .selectSty
        position: absolute
        width: 100px
        left: 98px
        top: 100px
    
        
</style>
