<template>
  <div class="list">
    <h2 style="padding: .6rem;">拓客卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.extensionName" style="width: 300px"></Input></div>
      <div class='com'>价格：<Input v-model="addData.extensionMoney" style="width: 300px"></Input></div>
      <div class='com'>是否计算业绩：<Input v-model="addData.performance" style="width: 300px"></Input></div>
      <div class='com'>是否计算实操：<Input v-model="addData.actualOperation" style="width: 300px"></Input></div>
      <div class='com'>是否计算手工：<Input v-model="addData.manualFee" style="width: 275px"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.extensionValidity" placeholder="单位月" style="width: 288px"></Input></div>
      <div class='com'>项目：
        <Select v-model="addData.project.projectName" style="width:275px" :transfer=true>
          <Option>A</Option>
          <Option>B</Option>
        </Select>
      </div>
      <div class='com'>次数：<Input v-model="addData.project.extensionNumber" style="width: 300px"></Input></div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 每周销售 <Input v-model="addData.quantity" style="width: 30px"/> 张，奖励 <Input v-model="addData.reward" style="width: 30px"/> 元</div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {findExtension,saveExtension,editExtension,deleteExtension} from '../../interface'
  export default {
    name: "tk_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'extensionName',},
          { title: '价格', key: 'extensionMoney',},
          { title: '有效期', key: 'extensionValidity',},
          { title: '是否计算业绩', key: 'performance',},
          { title: '是否计算实操', key: 'actualOperation',},
          { title: '是否计算手工', key: 'manualFee',},
          { title: '项目', key: 'x',},
          { title: '次数', key: 'c',},
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mannger(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.del(params.row, params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        data: [
          {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤', c: '2'},
          {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤，嫩白', c: '8'},
        ],
        addF: false,
        addData:{
          actualOperation: "",
          extensionMoney: "",
          extensionName: '',
          extensionValidity: '',
          id: '',
          manualFee: "",
          performance: "",
          project: [
            {
              extensionNumber: '',
              extensionValidity:'',
              projectId: '',
              projectName: ""
            }
          ],
          quantity: '',
          reward: "",
          storeName: "",
          storeId: this.$route.params.id,
        },
        type: '',
      }
    },
    methods: {
      getData(){
        this.$ajax({
          method:'get',
          url: findExtension()+'?storeId='+this.$route.params.id,
        }).then( (res) =>{
          this.data = res.data;
        }).catch( (error) =>{

        })
      },
      ok() {
        var Surl;
        if(this.type == 1){
          Surl = saveExtension();
        }else{
          Surl = editExtension();
        }
        this.$ajax({
          method: 'post',
          url: Surl,
          data: this.addData,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      Add(){
        this.type = 1;
        this.addF = true;
        this.addData={
          actualOperation: "",
          extensionMoney: "",
          extensionName: '',
          extensionValidity: '',
          id: '',
          manualFee: "",
          performance: "",
          project: [
            {
              extensionNumber: '',
              extensionValidity:'',
              projectId: '',
              projectName: ""
            }
          ],
          quantity: '',
          reward: "",
          storeName: "",
          storeId: this.$route.params.id,
        };
      },
      mannger(data, i) {
        this.type = 0;
        this.addF =true;
        this.addData = data;
      },
      del(data, i) {
        this.$ajax({
          method: 'get',
          url: deleteExtension()+'?id='+data.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
    },
    created(){
      this.getData();
    }
  }
</script>

<style scoped>
  .list{
    padding: 10px;
  }
  .mod{
    line-height: 60px;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }

</style>
