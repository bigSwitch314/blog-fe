<template>
  <div>
    <!-- leftBar -->
    <div class="leftBar">
      <ul class="ul_style">
        <li v-for="item in items" :key="item.id">
            {{ item.name }}
            <ul>
              <li v-for="son in item.son" :key="son.name" v-on:click="doAjax(son.url)" class="li_style">
                 {{ son.name }}
              </li>
            </ul>
        </li>
      </ul>
    </div>
    <!-- midileBody -->
    <div class="middleBody">
    <table cellspacing="0">
            <tbody>
                <tr >
                    <th>编号</th>
                    <th>名称</th>
                    <th>节点</th>
                    <th>等级</th>
                    <th>状态</th>
                    <th>排序</th>
                    <th>菜单</th>
                    <th>父节点</th>
                    <th>组</th>
                    <th>操作</th>
                </tr>
                <tr v-for="node in nodes" :key="node.id">
                    <td>{{node.id}}</td>
                    <td>{{node.title}}</td>
                    <td>{{node.name}}</td>
                    <td>{{node.level}}</td>
                    <td>{{node.status}}</td>
                    <td>{{node.sort}}</td>
                    <td>{{node.menu}}</td>
                    <td>{{node.pid}}</td>
                    <td>{{node.gid}}</td>
                    <td> 编辑 删除 查看</td>
                </tr>
                 <tr>
                    <!--合并列-->
                    <td colspan="10">
                      <button class="button_style">
                        添加
                      </button>
                        <router-link to='/a'> 列表页 </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



    
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: '',
      nodes: ''
    }
  },
  created() {
    this.$ajax.post('admin/menu/get', {

    }).then(res => {
      this.items = res.data.data
    })
  },
  methods: {
    doAjax: function(url) {
        this.$ajax.post(url, {

        }).then(res => {
          this.nodes = res.data.data
        })
    }, 
  }
}
</script>



<style >

*{margin:0; padding:0;}
/* leftBar */
.leftBar{width:140px; height:100%; text-align:center; background:#b2bbce;height:100%; position: absolute;left: 0px;right: 0px;}
.ul_style {list-style-type:none; line-height:40px;}
.li_style {font-size:14px; line-height:30px; text-indent: 50px; cursor: pointer}

/* middleBody */
.middleBody{background:rgb(243, 243, 243);position: absolute;left:140px;width: 100%;height: 100%;}
table{margin: 0; position:relative;left: 80px;top:100px;}
th,td{border: 1px solid rgb(214, 212, 212);font: 16px "微软雅黑";text-align: center;padding: 5px 10px 5px 10px;}
tr:nth-child(odd){background: #fff;}
.button_style{width:60px;height:25px;font-size:16px;margin:5px;background:#4CAF50;color:#fff;border-radius:.3em;position:relative;left: -280px;}
</style>
