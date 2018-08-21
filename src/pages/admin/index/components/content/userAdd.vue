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
          <Input v-model="formItem.password"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email" class="itemSty">
          <Input v-model="formItem.email"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
            <RadioGroup v-model="formItem.status">
                <Radio label="disable">禁用</Radio>
                <Radio label="enable">启用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit">保存</Button>
          <Button style="margin-left: 40px" @click="cancle">取消</Button>
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
        status: 'disable'
      },
      ruleValidate: {
        username: [
          { required: true, message: 'The username cannot be empty', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'The password cannot be empty', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'email cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'The status cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit: function() {
      console.log(this.formItem);
    },
    cancle: function() {
      console.log('cancle');
    }
  }
}
</script>


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

    

</style>
