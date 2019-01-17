<template>
    <div class="indexContainer">
        <div class="editorContainer">
            <markdown 
            :articleId="msg.articleId"
            :mdValuesP="msg.mdValue"  
            :title="msg.title"
            :categorySelect="msg.categorySelect"
            :labelSelect="msg.labelSelect"
            :type="msg.type"
            :release="msg.release"
            :fullPageStatusP="false" 
            :editStatusP="true" 
            :previewStatusP="true" 
            :navStatusP="true"
            :icoStatusP="true"  
            @childevent="childEventHandler"
            ></markdown>
        </div>
    </div>
</template>


<script>
    import markdown from '@/component/markdown/markdown'
    export default {
        name: 'index',
        data() {
            return {
                msg: {
                    articleId: 0,
                    mdValue:'## Vue-markdownEditor22222',
                    title: '',
                    categorySelect: '',
                    labelSelect: '',
                    type: '',
                    release: ''
                }
            }
        },
        components: {
            markdown
        },
        methods: {
            childEventHandler:function(res) {
                // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
                this.msg=res;
            },
        },
        created () {
          this.msg.articleId      = this.$route.params.articleId;
          this.msg.mdValue        = this.$route.params.mdValue;
          this.msg.title          = this.$route.params.title;
          this.msg.categorySelect = this.$route.params.categorySelect;
          this.msg.labelSelect    = this.$route.params.labelSelect;
          this.msg.type           = this.$route.params.type;
          this.msg.release        = this.$route.params.release;
        },
    }
</script>

<style  lang="stylus" scoped> 
.indexContainer 
  width: 100%;
  height: 100%;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
.editorContainer 
  width: 90%;
  height: 90%;
  border: 1px solid #ddd;
</style>