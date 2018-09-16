<template>
  <div class="topBar">
    <div class="login-content">
      <ul>
        <li>Login</li>
        <li style="">Logout</li>
        <li>Admin</li>
	    </ul>
    </div>
   
    
  </div>
</template>


<script>
export default {
  name: 'TopBar'
}
</script>



<style lang="stylus" scoped>
  ul
    position: absolute
    right: 0px
    top: 6px
  li
    float: left
    text-decoration: none
    list-style: none
    margin-left: 10px
    font-size: 14px
  .topBar
    background: #f5f5f5
    color: #4c4c4c
    width: 100%
    height: 45px
    z-index: 10
    position: fixed
    .login-content
      width: 400px
      height: 30px
      position: absolute
      right: 18px
      top: 7px

</style>
