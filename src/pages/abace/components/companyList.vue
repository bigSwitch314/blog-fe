<template>
  <div class="container">
    <div class="top">
      <span class="title" @click="doBack">CompanyList</span>
    </div>
    <header>
      
    </header>
    <Table stripe :columns="columns" :data="data" @on-selection-change="handleSelect" ref="table"></Table>
    <footer class="footer">
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
          searchData: {
            page_no: 1,
            page_size: 10
          },
          pageTotal: 0,
          columns: [
            {
              title: '#',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('strong', params.row._index + 1 + (this.searchData.page_no-1)*this.searchData.page_size)
                ]);
              }
            },
            {
              title: 'Id',
              key: 'id'
            },
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'CreateTime',
              key: 'create_time'
            },
          ],
          data: [],
          loading: false,
        }
      },
      created () {
        this.getList();
      },
      methods: {
        getList: function() {
          this.loading = true;
          const searchData = this.searchData;
          this.$ajax.post('abace/Customer/getCompanyList', {
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
        pageChange (page_no) {
          this.searchData.page_no = page_no;
          this.getList();
        },
        pageSizeChange (page_size) {
          this.searchData.page_size = page_size;
          this.getList();
        },
        doBack () {
          this.$router.back();
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
      color: #57a3f3
      cursor: pointer
  .footer
    background: #fff
    width: 100%
    height: 80px
    margin-bottom: 40px
    border-right: 1px solid #eaeaea
    border-left: 1px solid #eaeaea
    border-bottom: 1px solid #eaeaea
    .pag
      float: right 
      right: 38px
      top: 24px
      position: relative

</style>



