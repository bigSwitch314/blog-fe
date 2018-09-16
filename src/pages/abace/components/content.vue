<template>
  <div >
    <router-view></router-view>
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
      alert(this.keyword)
       if (!this.keyword) {
          this.$Message.config({top: 200});
          this.$Message.error('请完成信息填写!');
          return false;
        }
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
   
</style>
