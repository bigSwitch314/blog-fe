<template>
  <div>
    <header class="header">
      <Input v-model="searchData.title" clearable placeholder="标题" style="width: 160px" class="inputSty"/>
      <DatePicker v-model="searchData.time" type="daterange" placement="bottom-start" placeholder="请选择日期" style="width: 200px" class="DatePickerSty"></DatePicker>
      <Select v-model="searchData.category_id" clearable class="selectStyA" placeholder="请选择分类" >
        <Option v-for="item in category" :key="item.id" :value="item.id" >{{item.name}}</Option>
      </Select>
      <Select
        v-model="searchData.label_ids"
        multiple
        filterable
        placeholder="请选择标签"
        class="selectStyB">
        <Option v-for="(item, index) in label" :value="item.id" :key="index">{{item.name}}</Option>
      </Select>
      <Button type="primary" class="btnSty" @click="doSearch">搜索</Button>
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
      <div class="previewContentSty">
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
    import { formatDate } from '@/utils/index.js';
    export default {
      data () {
        return {
          modal: false,
          searchData: {
            page_no: 1,
            page_size: 10,
            title: '',
            time: '',
            category_id: '',
            label_ids: '',
          },
          category: [],
          label: [],
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
                        this.previewArticle(params.row.id)
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
        this.getcategoryList();
        this.getlabelList();
      },
      methods: {
        getList: function() {
          this.loading = true;
          const searchData = this.searchData;
          this.$ajax.post('blog/article/get', {
            page_no: searchData.page_no,
            page_size: searchData.page_size,
            title: this.searchData.title,
            category_id: this.searchData.category_id,
            label_ids: this.searchData.label_ids ? this.searchData.label_ids.toString() : '',
            begin_time: this.searchData.time[0] ? formatDate(this.searchData.time[0], 'yyyy-MM-dd') : '',
            end_time: this.searchData.time[1] ? formatDate(this.searchData.time[1], 'yyyy-MM-dd') : '',
            back_ground: 1
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
        getcategoryList () {
          this.loading = true;
          this.$ajax.post('blog/category/get', {
          })
          .then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.category = res.data.data.list;
            } else {
              this.$Message.error(res.data.errmsg);
            }
          })
          .catch(err => {
            console.log(err);
          }); 
        },
        getlabelList () {
          this.loading = true;
          this.$ajax.post('blog/label/get', {
          })
          .then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.label = res.data.data.list;
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
        previewArticle (id) { 
          this.$ajax
          .post('blog/article/get', {id: id})
          .then(res => {
            if (res.data.errcode === 0) {
              const category = this.category.find(function(value, index, arr) {
                return value.id == res.data.data.category_id
              })
              this.preview.content = res.data.data.content_html;
              this.preview.title = res.data.data.title;
              this.preview.create_time = res.data.data.create_time;
              this.preview.read_number = res.data.data.read_number;
              this.preview.category_name = category.name;
              this.modal = true;
            } else {
              this.$Message.error(res.data.errmsg);
            }
          })
          .catch(err => {
            console.log(err);
          }); 
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
          this.getList();
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
.previewContentSty
  width: 500px
  height: 25px
  margin: 0 auto
  text-align: center
  margin-bottom: 20px
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
  position: relative
  .inputSty
    position: absolute 
    left: 20px
    top: 25px
  .DatePickerSty
    position: absolute
    left: 200px
    top: 25px
  .selectStyA
    position: absolute
    left: 420px
    top: 25px
    width: 100px;
  .selectStyB
    position: absolute
    left: 540px
    top: 25px
    width: 350px
    z-index: 20
  .btnSty
    position: absolute
    left: 910px
    top: 25px
    width: 60px;
    background-color: #19be6b
    border-color: #19be6b
    
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



