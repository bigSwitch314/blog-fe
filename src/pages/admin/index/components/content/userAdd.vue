<template>
  <div class="body border">
    <div class="title border">
      <span class="title-content"> 账号添加</span>
    </div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="right" :label-width="90" class="fromSty">
        <FormItem label="账号" prop="username" class="itemSty">
          <Input v-model="formItem.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="password" class="itemSty">
          <Input type="password" v-model="formItem.password"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email" class="itemSty">
          <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="formItem.status">
            <Radio label="enable">启用</Radio>
            <Radio label="disable">禁用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit">保存</Button>
          <Button style="margin-left: 40px" @click="$router.back()">取消</Button>
        </FormItem>
    </Form>
  </div>
</template>


<script>
//import TopBar from './components/topBar'

export default {
  name: 'userAdd',
  data () {
    return {
      formItem: {
        username: '',
        password: '',
        email: '',
        status: 'enable'
      },
      ruleValidate: {
        username: [
          { required: true, message: 'The username cannot be empty', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'The password cannot be empty', trigger: 'blur' },
          { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'email cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'The status cannot be empty', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submit: function() {
      this.$refs.formItem.validate(valid => {
        if (!valid) {
          this.$Message.config({top: 200});
          this.$Message.error('请完成信息填写!');
          return false;
        }
        this.loading = true;
        this.$ajax.post('blog/admin/add', {
          username: this.formItem.username,
          password: this.formItem.password,
          email: this.formItem.email,
          status: 'disable' == this.formItem.status ? 0 : 1,
        }).then(res => {
          if (res.data.errcode === 0) {
            this.$router.back();
            this.loading = false;
          }else{
            this.$Message.error(res.data.errmsg);
          }  
        })
        .catch(err => {
          console.log(err);
        }); 
      })
     
    }
  }
}
</script>

<style lang="stylus">
.ivu-form
  .ivu-form-item-label 
    font-size: 14px
.ivu-input
  font-size: 14px  
.ivu-radio-wrapper 
  font-size: 14px
.ivu-btn
  font-size: 14px;
</style>

<style lang="stylus" scoped>
  .body
    background-color: #fff
  .border
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .title
    height: 40px
    width: 100%
    background-color: #eee
    .title-content
      top: 10px
      left: 18px
      position: relative
      font-weight: bold
      font-size: 14px
      color: #495060
  .fromSty
    padding-top: 20px
    padding-bottom: 3px
    .itemSty
      width: 740px
  .ivu-input
    font-size: 14px

</style>
