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
     getChildValue (childValue) {
      console.log(childValue)
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
