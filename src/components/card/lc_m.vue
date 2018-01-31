<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">疗程组合卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.treatmentName" style="width: 300px"></Input></div>
      <div class='com'>价格：<Input v-model="addData.treatmentMoney" style="width: 300px"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.treatmentCardValidity" placeholder="单位月" style="width: 288px"></Input></div>
      <div  class='com'>是否显示：
        <Select v-model="displays"  style="width:273px" :transfer=true>
          <Option value="1">是</Option>
          <Option value="0">否</Option>
        </Select>
      </div>
      <div class="project">
        <h3>项目组合 <Button class="hy_btn" size="small" @click="Addproject">添加</Button></h3>
        <div v-for="item in addData.project" class="projectone">
          <div class='com'>项目：
            <Select v-model="item.projectId" style="width:297px" :transfer=true>
              <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
          </div>
          <div class='com'>次数：<Input v-model="item.extensionNumber" style="width: 300px"></Input></div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {findTreatment,saveTreatment,editTreatment,deleteTreatment,findAllProject} from '../../interface'
  export default {
    name: "lc_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'treatmentName',},
          { title: '价格', key: 'treatmentMoney',},
          { title: '有效期', key: 'treatmentCardValidity',},
          { title: '是否显示', key: 'display',
            render: (h, params) => {
            if(params.row.display == true){
              return h('div', [
                h('span', {
                }, '是'),
              ]);
            }else{
              return h('div', [
                h('span', {
                }, '否'),
              ]);
            }

            }
          },
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
        displays: '',
        addF: false,
        addData:{
          display: '',
          id: '',
          project: [
            {
              extensionNumber: '',
              extensionValidity: '',
              projectId: '',
              projectName: ""
            }
          ],
          storeName: "",
          treatmentCardValidity: '',
          treatmentMoney: "",
          treatmentName: "",
          storeId: this.$route.params.id,
        },
        type:'',
        projectList:[],
      }
    },
    methods: {
      getProject(){
        this.$ajax({
          method:'get',
          url: findAllProject(),
        }).then( (res) =>{
          this.projectList = res.data;
        }).catch( (error) =>{

        });
      },
      getData(){
        this.$ajax({
          method: 'get',
          url: findTreatment()+'?storeId='+this.$route.params.id,
        }).then( (res)=>{
          this.data = res.data;
          this.displays = (this.data.display==true? '1':'0');
        }).catch( (error)=>{

        })
      },
      ok() {
        var Surl;
        if(this.type == 1){
          Surl = saveTreatment();
        }else{
          Surl = editTreatment();
        }
        this.addData.display = (this.displays=='1'?true:false);
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
        this.displays = '';
        this.addData={
          display: '',
            id: '',
            project: [
            {
              extensionNumber: '',
              extensionValidity: '',
              projectId: '',
              projectName: ""
            }
          ],
            storeName: "",
            treatmentCardValidity: '',
            treatmentMoney: "",
            treatmentName: "",
            storeId: this.$route.params.id,
        };
      },
      Addproject(){
        this.addData.project.push({
          extensionNumber: '',
          extensionValidity: '',
          projectId: '',
          projectName: ""
        });

      },
      mannger(data, i) {
        this.type = 0;
        this.addF =true;
        this.addData = data;
        this.displays =(data.display==true? '1':'0');
      },
      del(data, i) {
         this.$ajax({
          method: 'get',
          url: deleteTreatment()+'?id='+data.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
    },
    created(){
      this.getProject();
      this.getData();
    },
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
