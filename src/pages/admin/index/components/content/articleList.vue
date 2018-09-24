<template>
  <div>
    <header class="header">
    
    </header>
    <Table stripe :columns="columns" :data="data" @on-selection-change="handleSelect"></Table>
    <footer class="footer">
      <Button type="success" class="btn" to="/admin/index/articleAdd">添加文章</Button>
      <Dropdown placement="top" @on-click="otherCase" class="dropDownSty">
        <a href="javascript:void(0)">
          其他操作
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="0">批量删除</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Page :total="pageTotal" show-total show-sizer :postData="searchData" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" class="pag"></Page>
    </footer> 
    <Spin fix v-if="loading" size="large" class = "positionSty">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <Modal
      v-model="modal"
      title="文章预览"
      width="900" 
      scrollable
      footer-hide>
      <div style="font-size:26px;text-align:center;margin:10px ">{{preview.title}}</div>
      <div style="width:500px;height:25px;margin:0 auto;text-align:center;margin-bottom:20px;">
        <ul>
          <li>发表于{{preview.create_time}}</li>
          <li>|</li>
          <li>分类于{{preview.category_name}}</li> 
          <li>|</li>       
          <li>阅读次数：{{preview.read_number}}</li> 
          <li>|</li>    
          <li>复制次数：0</li> 
	      </ul>
      </div>
      <div v-html="preview.content" class="markdown-body blockquote markdown-body dl markdown-body ol markdown-body p markdown-body pre markdown-body table markdown-body ul"></div>
      
    </Modal>
  </div>
    
</template>
<script>
    export default {
      data () {
        return {
          modal: false,
          searchData: {
            page_no: 1,
            page_size: 10
          },
          pageTotal: 0,
          columns: [
            {
              type: 'selection',
              width: 50,
              align: 'center'
            },
            {
              title: '#',
              width: 50,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('strong', params.row._index + 1 + (this.searchData.page_no-1)*this.searchData.page_size)
                ]);
              }
            },
            {
              title: '标题',
              key: 'title',
            },
            {
              title: '分类',
              key: 'category_name',
              width: 100,
            },
            {
              title: '标签',
              key: 'label_name',
              width: 200,
            },
            {
              title: '阅读次数',
              key: 'read_number',
              width: 100,
            },
            {
              title: '是否发布',
              key: 'release',
              render: (h, params) => {
                return h('div', [
                  h('i-switch', { //数据库1是已处理，0是未处理
                    props: {
                      type: 'primary',
                      value: params.row.release === 1  //控制开关的打开或关闭状态，官网文档属性是value
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-change': (value) => {//触发事件是on-change,用双引号括起来，//参数value是回调值，并没有使用到
                        this.switch(params.row.id, value) //params.index是拿到table的行序列，可以取到对应的表格值
                      }
                    }
                  })
                ]);
              },
               width: 100
            },
            {
              title: '更新时间',
              key: 'edit_time',
              width: 100
            },
            {
              title: '创建时间',
              key: 'create_time',
              width: 100
            },
            {
              title: '操作', 
              key: 'action',
              align: 'center',
              width: 140,
              render: (h, params) => {
                return h('div', [
                  h('button', {
                    style: {
                      marginRight: '10px',
                      color: '#229f24',
                      cursor: 'pointer',
                      background: 'none',
                      fontsize: '14x'
                    },
                    on: {
                      click: () => {
                        this.previewArticle(params.index)
                      }
                    }
                  }, '预览'),
                  h('button', {
                    style: {
                      marginRight: '10px',
                      color: 'rgb(30, 144, 255)',
                      cursor: 'pointer',
                      background: 'none',
                      fontsize: '14x'
                    },
                    on: {
                      click: () => {
                        this.editArticle(params.row.id)
                      }
                    }
                  }, '编辑'),
                  h('button', {
                    style: {
                      color: '#d9544f',
                      cursor: 'pointer',
                      background: 'none'
                    },
                    on: {
                      click: () => {
                        this.delArticle(params.row.id)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data: [],
          loading: false,
          selection: [],
          preview: {}
        }
      },
      created () {
        this.getList();
      },
      methods: {
        getList: function() {
          this.loading = true;
          const searchData = this.searchData;
          this.$ajax.post('blog/article/get', {
            page_no: searchData.page_no,
            page_size: searchData.page_size
          })
          .then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.data = res.data.data.list;
              this.pageTotal = res.data.data.count;
            } else {
              this.$Message.error(res.data.errmsg);
            }
          })
          .catch(err => {
            console.log(err);
          }); 
        },
        confirmDel: function(id) {
          this.$ajax.post('blog/article/delete', {
            id: id
          }).then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.getList();
              this.$Message.success('删除成功');
            } else {
              this.$Message.error(res.data.errmsg);
            }
          }) 
          this.loading = true;
        },
        remove (index) {
          this.data6.splice(index, 1);
        },
        switch (id, release) {
          this.loading = true;
          this.$ajax.post('blog/article/changeReleaseStatus', {
            id: id,
            release: true == release ? 1 : 0
          }).then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.getList();
            } else {
              this.$Message.error(res.data.errmsg);
            }
          }) 
        },
        previewArticle (index) { 
          this.preview.content = this.data[index].content_html;
          this.preview.title = this.data[index].title;
          this.preview.create_time = this.data[index].create_time;
          this.preview.category_name = this.data[index].category_name;
          this.preview.read_number = this.data[index].read_number;
          //this.preview.copy_number = this.data[index].copy_number;
          this.modal = true;
        },
        editArticle (id) {
          this.$router.push('/admin/index/articleEdit?id='+id);
        },
        delArticle (id) { 
          let account = this.data.filter(item => {
            return item.id === id;
          });
          this.$Modal.confirm({
            title: '提示',
            content: `确定要删除该文章么?`,
            onOk: () => {
              this.confirmDel(id);
            }
          });
        },
        handleSelect(items) {
          this.selection = items.map(item => {
          return item.id;});
        },
        async otherCase (val) {
          if (val === '0') {
            this.deleteSeleted();
          }
        },
        deleteSeleted () {
          if (!this.selection.length) return this.$Message.error('请选择删除项');
          this.$Modal.confirm({
            title: '提示',
            content: `您确定要删除已选中的文章吗？`,
            onOk: () => {
              this.confirmDel(this.selection.toString());
            }
          });
        },
        pageChange (page_no) {
          this.searchData.page_no = page_no;
          this.getList();
        },
        pageSizeChange (page_size) {
          this.searchData.page_size = page_size;
          this.getList();
        },
        doSearch () {
          alert(1);
        }
      }
    }
</script>


<style>
    .ivu-spin-fix {
      background-color: transparent
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
    }
    .positionSty{
      width: 85%;
      height: 350px;
      position: fix;
    }
    .ivu-switch-checked {
      border-color: #5cb85c;
      background-color: #4cae4c;
    }
   .ivu-btn-success {
      color: #fff;
      background-color: #4cae4c;
      border-color:  #5cb85c;
    }
   .ivu-dropdown-rel {
    position: relative;
    border: 1px solid #ccc;
    width: 103px;
    height: 35px;
    left: 65px;
    top: 23px;
    line-height: 33px;
    text-align: center;
    border-radius:4px;
    font-size: 13px;
    color: #999;
    transition: border 0.8s;
    }
   .dropDownSty a {
     color:#999;
     font-size: 13px;
   } 
   .dropDownSty  :hover{
     border-color: #1e90ff;
     transition: border-color 0.8s;
   }
   .ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
}

    
</style>

<style lang="stylus">
.ivu-table 
  width: inherit
  height: 100%
  max-width: 100%
  overflow: hidden
  color: #515a6e
  font-size: 14px
  background-color: #fff
  box-sizing: border-box
</style>

<style lang="stylus" scoped>
ul
  margin: 0 auto
  display:inline-block
li
  float: left
  text-decoration: none
  list-style: none
  margin-left: 5px
  margin-right: 5px
  font-size: 14px
.header
  background: #fff
  width: 100%
  height: 80px
  border-right: 1px solid #eaeaea
  border-left: 1px solid #eaeaea
  border-top: 1px solid #eaeaea
.footer
  background: #fff
  width: 100%
  height: 80px
  margin-bottom: 40px
  border-right: 1px solid #eaeaea
  border-left: 1px solid #eaeaea
  border-bottom: 1px solid #eaeaea
  .btn
    left: 38px
    top: 24px
    position: relative
    font-size: 14px
    .link
      color: #fff
      width: 100%
      height: 100%
      display: block
  .pag
    float: right 
    right: 38px
    top: 24px
    position: relative

</style>



