<template>
  <div class="body border">
    <div class="title border">
      <span class="title-content"> 账号添加</span>
    </div>
    <Form :model="formRight" label-position="right" :label-width="84" class="fromSty">
        <FormItem label="账号" class="itemSty">
          <Input v-model="formRight.input1"></Input>
        </FormItem>
        <FormItem label="密码" class="itemSty">
          <Input v-model="formRight.input2"></Input>
        </FormItem>
        <FormItem label="邮箱" class="itemSty">
          <Input v-model="formRight.input3"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
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
      formRight: {
        input1: '',
        input2: '',
        input3: ''
                },
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
