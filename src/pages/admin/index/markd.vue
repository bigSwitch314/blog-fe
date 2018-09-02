<template>
    <div class="indexContainer">
        <div class="editorContainer">
            <markdown 
            :mdValuesP="msg.mdValue"  
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
                    mdValue:'## Vue-markdownEditor22222'
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
        }
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