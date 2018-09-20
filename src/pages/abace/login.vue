<template>
  <div class="container">
    <div class="content">
      <span class="title">Abace Online Database</span>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.username" @on-focus="changeUsername" placeholder="Username" class="inputNameSty">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" @on-focus="changePassword" placeholder="Password" class="inputPasswordSty">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" class="buttonSty">Signin</Button>
        </FormItem>
      </Form>
      <span class="noticeNameSty" v-if="showUsernameNotice">Please fill in useranme</span>
      <span class="noticePasswordStyA" v-if="showPasswordNoticeA">Please fill in password</span>
      <span class="noticePasswordStyB" v-if="showPasswordNoticeB"> Not less 6 chart</span>
      
    </div>
  </div>
</template>


<script>
export default {
  name: 'Content',
  data () {
    return {
      showUsernameNotice: false,
      showPasswordNoticeA: false,
      showPasswordNoticeB: false,
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          {required: true, message: ' ', trigger: 'blur'}
        ],
        password: [
          {required: true, message: ' ', trigger: 'blur'},
          {type: 'string', min: 6, message: ' ', trigger: 'blur'}
        ]
      } 
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$ajax.post('abace/index/login', {
            username: this.formInline.username,
            password: this.formInline.password
          })
          .then(res => {
            if (res.data.errcode === 0) {
              window.localStorage.user_id = res.data.data.user_id;
              window.localStorage.username = res.data.data.username;
              window.localStorage.token = res.data.data.token;
              this.$router.push('/abace/index');
            } else {
              this.$Message.error(res.data.errmsg);
            }
          })
          .catch(err => {
            console.log(err);
          }); 
          //
        } else {
          if ('' == this.formInline.username) this.showUsernameNotice = true;
          if ('' == this.formInline.password) this.showPasswordNoticeA = true;
          if ('' != this.formInline.password && this.formInline.password.length < 5) this.showPasswordNoticeB = true;
        }
      })
    },
    changeUsername () {
      this.showUsernameNotice = false;
    },
    changePassword () {
      this.showPasswordNoticeA = false;
      this.showPasswordNoticeB = false;

    },
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
      width: 600px
      height 400px
      top: 150px
      position: relative
      margin:  0 auto
      -webkit-box-shadow: #666 0px 0px 10px
      -moz-box-shadow: #666 0px 0px 10px
      box-shadow: #666 0px 0px 10px
      background: #fff
      .title
        font-size: 24px
        position:relative
        left:174px
        top: 20px
      .inputNameSty
        position:relative
        left:150px
        top:90px
        width: 300px
      .inputPasswordSty
        position: relative
        left: 150px
        top: 80px
        width: 300px
      .buttonSty
        position: relative
        left: 150px
        top: 70px
        width: 300px
      .noticeNameSty
        position: absolute
        left: 322px
        top: 132px
        color:red
        z-index: 22
      .noticePasswordStyA
        position: absolute
        left: 322px
        top: 178px
        color:red
        z-index: 22
      .noticePasswordStyB
        position: absolute
        left: 358px
        top: 180px
        color:red
        z-index: 22
      
    
        
</style>
