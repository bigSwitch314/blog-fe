<template>
  
  <div class="body border">
     <div class="title border">
      <router-link to="/abace/index/customerList">
        <span class="titleA"> CustomerList</span>
       </router-link>
      <span class="titleB">&nbsp;>&nbsp; </span>
      <span class="titleC"> CustomerAdd</span>
    </div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="right" :label-width="90" class="fromSty">
        <FormItem label="cat" prop="cat" class="itemSty">
          <Input v-model="formItem.cat"></Input>
        </FormItem>
        <FormItem label="firstName" prop="firstName" class="itemSty">
          <Input v-model="formItem.firstName"></Input>
        </FormItem>
         <FormItem label="middleName" prop="middleName" class="itemSty">
          <Input v-model="formItem.middleName"></Input>
        </FormItem>
         <FormItem label="lastName" prop="lastName" class="itemSty">
          <Input v-model="formItem.lastName"></Input>
        </FormItem>
        <FormItem label="name" prop="name" class="itemSty">
          <Input v-model="formItem.name"></Input>
        </FormItem>
         <FormItem label="title" prop="title" class="itemSty">
          <Input v-model="formItem.title"></Input>
        </FormItem>
         <FormItem label="company" prop="company" class="itemSty">
          <Input v-model="formItem.company"></Input>
        </FormItem>
        <FormItem label="address" prop="address" class="itemSty">
          <Input v-model="formItem.address"></Input>
        </FormItem>
        <FormItem label="phone" prop="phone" class="itemSty">
          <Input v-model="formItem.phone"></Input>
        </FormItem>
        <FormItem label="industry" prop="industry" class="itemSty">
          <Input v-model="formItem.industry"></Input>
        </FormItem>
        <FormItem label="tag" prop="tag" class="itemSty">
          <Input v-model="formItem.tag"></Input>
        </FormItem>
         <FormItem>
          <Button type="primary" @click="submit">save</Button>
          <Button style="margin-left: 40px" @click="$router.back()">cancel</Button>
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
        cat: '',
        firstName: '',
        middleName: '',
        lastName: '',
        name: '',
        title: '',
        company: '',
        address: '',
        phone: '',
        industry: '',
        tag: ''
      },
      ruleValidate: {
        cat: [
          { required: true, message: 'The cat cannot be empty', trigger: 'blur' }
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
        this.$ajax.post('abace/Customer/add', {
          cat: this.formItem.cat,
          first_name: this.formItem.firstName,
          middle_name: this.formItem.middleName,
          last_name: this.formItem.lastName,
          name: this.formItem.name,
          title: this.formItem.title,
          company: this.formItem.company,
          address: this.formItem.address,
          phone: this.formItem.phone,
          industry: this.formItem.industry,
          tag: this.formItem.tag
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
     
    },
    getCategory: function() {
       this.$ajax.post('blog/category/get', {})
        .then(res => {
          if (res.data.errcode === 0) {
            this.formItem.categoryDisplay = res.data.data.list.reverse();
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(err => {
          console.log(err);
        }); 
    },
    getLabel: function() {
       this.$ajax.post('blog/label/get', {})
        .then(res => {
          if (res.data.errcode === 0) {
            this.formItem.labelDisplay = res.data.data.list.reverse();
          } else {
            this.$Message.error(res.data.errmsg);
          }
        })
        .catch(err => {
          console.log(err);
        }); 
    }
  },
  created () {
    this.getCategory();
    this.getLabel();
  },
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
    margin-top: 85px
    margin-left:60px
    margin-right: 60px
  .border
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .title
    height: 40px
    width: 100%
    background-color: #eee
    .titleA
      top: 10px
      left: 18px
      position: relative
      font-size: 14px
    .titleB
      top: 10px
      left: 18px
      position: relative
      font-size: 14px
      color: #888
    .titleC
      top: 10px
      left: 18px
      position: relative
      font-size: 14px
      color: #888
  .fromSty
    padding-top: 20px
    padding-bottom: 3px
    padding-left: 20px
    .itemSty
      width: 740px
      .radioSty
        width 116px
  .ivu-input
    font-size: 14px

</style>
