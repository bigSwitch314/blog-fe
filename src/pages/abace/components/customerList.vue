<template>
  <div class="container">
    <div class="top">
      <span class="title">CustomerList</span>
    </div>
    <header class="header">
        <Input v-model="keyword" search enter-button placeholder="Enter something..." class="inputSty"  @on-search="doSearch" />
        <Select v-model="selected" class="selectSty">
          <Option :value=1 >by Cat</Option>
          <Option :value=2 >by Title</Option>
          <Option :value=3 >by Industry</Option>
          <Option :value=4 >by Tag</Option>
        </Select>
        <span class="list">
          <a href="" style="margin-left: 15px;">TagList</a>
          <a href="" style="margin-left: 15px;">CompanyList</a>
        </span>
    </header>
    <Table stripe :columns="columns" :data="data" @on-selection-change="handleSelect" ref="table"></Table>
    <footer class="footer">
      <Button type="success" class="btn" to="/abace/index/customerAdd">Add</Button>
      <Dropdown placement="top" @on-click="otherCase" class="dropDownSty">
        <a href="javascript:void(0)">	
          Other
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="0">BatchDelete</DropdownItem>
          <DropdownItem name="1">Export</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Page :total="pageTotal" show-total show-sizer :postData="searchData" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" class="pag"></Page>
    </footer> 
    <Spin fix v-if="loading" size="large" class = "positionSty">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
    
</template>
<script>
// Page组件用英文显示
import Vue from 'vue';
import { locale, Page } from 'iview';
import lang from 'iview/dist/locale/en-US';
locale(lang);
Vue.component('Page', Page);

    export default {
      data () {
        return {
          selected: 1,
          keyword: 'cat-100010',
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
              title: 'Cat',
              key: 'cat',
            },
            {
              title: 'FirstName',
              key: 'first_name',
            },
            {
              title: 'Title',
              key: 'title',
            },
            {
              title: 'Company',
              key: 'company',
              width: 150,
            },
            {
              title: 'Address',
              key: 'address',
            },
            {
              title: 'Instudry',
              key: 'instrudy',
            },
            {
              title: 'Tag',
              key: 'tag',
            },
            {
              title: 'CreateTime',
              key: 'create_time',
              width: 100
            },
            {
              title: 'Operation', 
              key: 'action',
              align: 'center',
              width: 140,
              render: (h, params) => {
                return h('div', [
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
                        this.editCustomer(params.row.id)
                      }
                    }
                  }, 'edit'),
                  h('button', {
                    style: {
                      color: '#d9544f',
                      cursor: 'pointer',
                      background: 'none'
                    },
                    on: {
                      click: () => {
                        this.delCustomer(params.row.id)
                      }
                    }
                  }, 'delete')
                ]);
              }
            }
          ],
          data: [
            {
              cat: 'cat-00000001',
              first_name: 'Arthur',
              title: 'Psychiatry',
              company: 'company-00000001',
              address: 'address-00000001',
              instrudy: '-',
              tag: 'tag-00000001',
              create_time: '2018-9-12'
            }
          ],
          loading: false,
          selection: []
        }
      },
      created () {
        this.selected = parseInt(this.$route.query.type) ? parseInt(this.$route.query.type) : 1;
        this.keyword = this.$route.query.keyword ? this.$route.query.keyword: 'cat-100001';
        this.getList();
      },
      methods: {
        getList: function() {
          this.loading = true;
          const searchData = this.searchData;
          this.$ajax.post('abace/Customer/get', {
            page_no: searchData.page_no,
            page_size: searchData.page_size,
            type: this.selected,
            keyword: this.keyword
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
          this.$ajax.post('abace/customer/delete', {
            id: id
          }).then(res => {
            this.loading = false;
            if (res.data.errcode === 0) {
              this.getList();
              this.$Message.success('delete success!');
            } else {
              this.$Message.error(res.data.errmsg);
            }
          }) 
          this.loading = true;
        },
        remove (index) {
          this.data6.splice(index, 1);
        },
        editCustomer (id) {
          this.$router.push('/abace/index/customerEdit?id='+id);
        },
        delCustomer (id) { 
          let account = this.data.filter(item => {
            return item.id === id;
          });
          this.$Modal.confirm({
            title: 'Notice',
            content: 'Do you comfirm to delete?',
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
          if (val === '1') {
            this.$refs.table.exportCsv({
              filename: 'The original data',
              columns: [
                {title: 'id',key: 'id'},
                {title: 'cat',key: 'cat'},
                {title: 'firstName',key: 'first_name'},
                {title: 'middleName',key: 'middle_name'},
                {title: 'lastName',key: 'last_name'},
                {title: 'name',key: 'name'},
                {title: 'title',key: 'title'},
                {title: 'company',key: 'company'},
                {title: 'address',key: 'address'},
                {title: 'phone',key: 'phone'},
                {title: 'industry',key: 'industry'},
                {title: 'tag',key: 'tag'}
              ],
              data: this.data,
              quoted: true
            });
          }
        },
        deleteSeleted () {
          if (!this.selection.length) return this.$Message.error('Please choose delete item');
          this.$Modal.confirm({
            title: 'Notice',
            content: 'Do you comfirm to delete?',
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
.container
    background: #ffffff
    width: 100%
    height: 100%
    position: absolute
    overflow:auto
    padding-top: 45px
    padding-left: 60px
    padding-right: 60px
  .top 
    height: 40px
    margin-top: 10px
    position: relative
    .title
      position: absolute
      font-size: 14px
      top: 10px
      left: 8px
      color: #333
      font-weight: blod
  .header
    background: #fff
    width: 100%
    height: 100px
    border-right: 1px solid #eaeaea
    border-left: 1px solid #eaeaea
    border-top: 1px solid #eaeaea
    .inputSty
      width: 500px
      position: relative
      left: 400px
      top: 32px
    .selectSty
      position: relative
      width: 100px
      left: 300px
      top: 0px
    .list
      position: relative
      width: 100px
      left: 900px
      top: 0px
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



