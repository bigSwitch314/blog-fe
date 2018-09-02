<template>
  <div class="body border">
    <div class="title border">
      <span class="title-content"> 分类添加</span>
    </div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="right" :label-width="90" class="fromSty">
        <FormItem label="分类名称" prop="name" class="itemSty">
          <Input v-model="formItem.name"></Input>
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
        name: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
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
        this.$ajax.post('blog/category/add', {
          name: this.formItem.name,
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
