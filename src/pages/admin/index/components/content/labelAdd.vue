<template>
  <div class="body border">
    <div class="title border">
      <span class="title-content"> 标签添加</span>
    </div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="right" :label-width="90" class="fromSty">
        <FormItem label="标签名称" prop="name" class="itemSty">
          <Input v-model="formItem.name"/>
        </FormItem>
        <FormItem label="显示级别" prop="size" class="itemSty">
          <Select v-model="formItem.size" clearable>
            <Option v-for="item in option" :value="item.value" :key="item.value">
              {{item.label}}
            </Option>
          </Select>
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
        name: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The username cannot be empty', trigger: 'blur' }
        ],
        size: [
          { required: true, message: 'The size cannot be empty', trigger: 'blur' }
        ],
      },
      option: [
        {label: 'size-level-1', value: '1'},
        {label: 'size-level-2', value: '2'},
        {label: 'size-level-3', value: '3'},
        {label: 'size-level-4', value: '4'},
        {label: 'size-level-5', value: '5'},
      ],
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
        this.$ajax.post('blog/label/add', {
          name: this.formItem.name,
          size: this.formItem.size,
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
