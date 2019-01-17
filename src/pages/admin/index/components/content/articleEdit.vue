<template>
  <div class="body border">
    <div class="title border">
      <span class="title-content"> 文章编辑</span>
    </div>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" label-position="right" :label-width="90" class="fromSty">
        <FormItem label="标题" prop="title" class="itemSty">
          <Input v-model="formItem.title"></Input>
        </FormItem>
        <FormItem label="分类" prop="categorySelect" class="itemSty">
          <RadioGroup v-model="formItem.categorySelect">
            <Radio v-for="item of formItem.categoryDisplay" :key="item.id" :label="item.id" class="radioSty" >{{item.name}}</Radio>
          <router-link to="/admin/index/categoryAdd" title="添加">
            <Icon type="ios-add-circle-outline" size="24" class="radioSty" />
          </router-link>
          </RadioGroup>
        </FormItem>
        <FormItem label="标签" prop="labelSelect" class="itemSty">
          <CheckboxGroup v-model="formItem.labelSelect">
            <Checkbox v-for="item of formItem.labelDisplay" :key="item.id" :label="item.id" class="radioSty" >{{item.name}}</Checkbox>
            <router-link to="/admin/index/labelAdd" title="添加">
              <Icon type="ios-add-circle-outline" size="24" />
            </router-link>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="类型" prop="type">
          <RadioGroup v-model="formItem.type">
            <Radio :label="1">原创</Radio>
            <Radio :label="2">转载</Radio>
            <Radio :label="3">作者简介</Radio>
            <Radio :label="4">开源项目</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="发布" prop="release">
          <RadioGroup v-model="formItem.release">
            <Radio :label="1" >是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input v-html="msg.htmlValue" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="Enter something..." class="ivu-form-item-content previewContainer markdown-body">{{msg.mdValue}}</Input>
          <Button type="text" @click="contentEdit" style="color:#57a3f3;left:-56px;top:40px;position:absolute;width:40px">编辑</Button>
        </FormItem>
       
        <FormItem>
          <Button type="primary" @click="submit">保存</Button>
          <Button style="margin-left: 40px" @click="$router.push('/admin/index/articleList');">取消</Button>
        </FormItem>

    </Form>
     
  </div>
</template>


<script>
import Markdown from '@/component/markdown/markdown'
export default {
  name: 'userAdd',
  components: {Markdown},
  data () {
    return {
      msg: {
        mdValue:'## Vue-markdownEditor22222',
        htmlValue: '请写文章'
      },
      formItem: {
        title: '',
        categoryDisplay: [],
        categorySelect: [],
        labelDisplay: [],
        labelSelect: [],
        type: '1',
        release: '0',
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ],
        categorySelect: [
          { required: true, message: 'The category cannot be empty'}
        ],
        type: [
          { required: true, message: 'The type cannot be empty'}
        ],
        release: [
          { required: true, message: 'The release cannot be empty'}
        ],
        content: [
          { required: true, message: 'The content cannot be empty', trigger: 'blur' }
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
        this.$ajax.post('blog/article/edit', {
          id: this.formItem.id,
          title: this.formItem.title,
          category_id: this.formItem.categorySelect,
          label_ids: this.formItem.labelSelect.toString(),
          type: this.formItem.type,
          release: this.formItem.release,
          content_md: this.msg.mdValue,
          content_html: this.msg.htmlValue
        }).then(res => {
          if (res.data.errcode === 0) {
            this.$router.push('/admin/index/articleList');
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
    getDeatil: function() {
    const id = this.$route.query.id;
    this.loading = true;
    this.$ajax
      .post('blog/article/get', {
        id: id
      })
      .then(res => {
        this.loading = false;
        if (res.data.errcode === 0) {
          this.formItem.id = res.data.data.id;
          this.formItem.title = res.data.data.title;
          this.formItem.categorySelect = res.data.data.category_id;
          this.formItem.labelSelect = res.data.data.label_ids;
          this.formItem.type = res.data.data.type;
          this.formItem.release = res.data.data.release;
          this.msg.mdValue = res.data.data.content_md;
          this.msg.htmlValue = res.data.data.content_html;
          this.formItem.content = res.data.data.content_html;
          // 编辑后，则使用编辑数据
          if (this.$route.params.mdValue) {
            this.formItem.title  = this.$route.params.title;
            this.formItem.categorySelect = this.$route.params.categorySelect;
            this.formItem.labelSelect = this.$route.params.labelSelect;
            this.formItem.type = this.$route.params.type;
            this.formItem.release = this.$route.params.release;
            this.msg.mdValue   = this.$route.params.mdValue;
            this.msg.htmlValue = this.$route.params.htmlValue;
            this.formItem.content = this.$route.params.htmlValue;
          } 
        } else {
          this.$Message.error(res.data.errmsg);
        }
      })
      .catch(err => {
        console.log(err);
      }); 
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
    },
    childEventHandler: function(res) {
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.msg=res;
    },
    contentEdit () {
       this.$router.push({ 
        name : 'markdown', 
        params: {
          articleId: this.$route.query.id,
          title: this.formItem.title,
          categorySelect: this.formItem.categorySelect,
          labelSelect: this.formItem.labelSelect,
          type: this.formItem.type,
          release: this.formItem.release,
          mdValue: this.msg.mdValue,
          htmlValue: this.msg.mdValue
        }
      }) 
    }
  },
  created () {
    this.getCategory();
    this.getLabel(); 
    this.getDeatil();
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
.ivu-btn-text:focus 
  box-shadow: none
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
      .radioSty
        width 116px
  
  .ivu-input
    font-size: 14px

</style>
