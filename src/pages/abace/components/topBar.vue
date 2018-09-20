<template>
  <div class="topBar">
    <div class="login-content">
      <ul>
        <li v-if="isLogin" @click="login">
          <span style="color:#57a3f3;cursor:pointer">Login</span>
        </li>
        <li v-if="isLogout" @click="logout">
          <span style="color:#57a3f3;cursor:pointer">Logout</span>
        </li>
        <li >{{username}}</li>
	    </ul>
    </div>
   
    
  </div>
</template>


<script>
export default {
  name: 'TopBar',
  data () {
    return {
      isLogin: false,
      isLogout: false,
      isAdmin: false,
      username: ''
    }
  },
  methods: {
    checkLogin () {
      if (window.localStorage.token && window.localStorage.user_id && window.localStorage.username) {
        this.isLogin = false;
        this.isLogout = true;
        this.username = window.localStorage.username
      } else {
        localStorage.clear();
        const name = this.$route.path.split('/').pop();
        if (name != "index") {
          this.$router.push('/abace/login');
        } else {
          this.isLogin = true;
          this.isLogout = false;
        } 
      }
    },
    logout () {
      localStorage.clear();
      this.isLogin = true;
      this.isLogout = false;
      this.username = '';
      this.$router.push('/abace/index');
    },
    login () {
      this.$router.push('/abace/login');
    }
  },
  created () {
    this.checkLogin();
  },
  watch: {
    '$route' (to, from) {
      this.checkLogin();
    }
  }
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
