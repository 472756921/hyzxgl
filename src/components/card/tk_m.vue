<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">拓客卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" :mask-closable="false" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.extensionName" style="width: 300px"></Input></div>
      <div class='com'>卡扣价格：<Input v-model="addData.bucklePrice" style="width: 276px" @on-keyup="addData.bucklePrice =check2(addData.bucklePrice)" ></Input></div>
      <div class="com">现金价格：<Input v-model="addData.cashPrice" style="width: 276px" @on-keyup="addData.cashPrice=check2(addData.cashPrice)"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.extensionValidity" placeholder="单位天" style="width: 288px" @on-keyup="addData.extensionValidity=check(addData.extensionValidity)"></Input></div>
      <div class='com'>是否计算业绩：<Select v-model="addData.performance" style="width:252px" :transfer=true>
        <Option value="1"> 是</Option>
        <Option value="2"> 否</Option>
      </Select>
        </div>
      <div class='com'>是否计算实操：<Select v-model="addData.actualOperation" style="width:252px" :transfer=true>
        <Option value="1"> 是</Option>
        <Option value="2"> 否</Option>
      </Select>
       </div>
      <div class='com'>是否计算手工：<Select v-model="addData.manualFee" style="width:252px" :transfer=true>
        <Option value="1"> 是</Option>
        <Option value="2"> 否</Option>
      </Select>
        </div>

      <div class="project">
        <h3>拓客项目<Button class="hy_btn" size="small" @click="Addproject">添加</Button></h3>
        <div v-for="item in addData.project" class="projectone">
          <div class='com'>项目：
            <Select v-model="item.projectId" style="width:150px" :transfer=true>
              <Option :value="items.id" :key="items.id" v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
            &nbsp;&nbsp;次数：<Input v-model="item.extensionNumber" style="width: 100px" @on-keyup="item.extensionNumber=check(item.extensionNumber)"></Input>
          </div>
        </div>
      </div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 每周销售 <Input v-model="addData.quantity" style="width: 30px"/> 张，每张奖励<Input v-model="addData.reward" style="width: 50px" @on-keyup="addData.reward=check2(addData.reward)"/> 元，超过每张奖励<Input v-model="addData.exceedReward" @on-keyup="addData.exceedReward=check(addData.exceedReward)" style="width: 50px"/> 元</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {findExtension,saveExtension,editExtension,deleteExtension,findAllProject} from '../../interface'
    export default {
      name: "tk_m",
      data() {
        return {
          columns: [
            { title: '名称', key: 'extensionName',},
            { title: '卡扣价格', key: 'bucklePrice',},
            { title: '现金价格', key: 'cashPrice',},
            { title: '有效期(天)', key: 'extensionValidity',},
            { title: '是否计算业绩', key: 'performance',
              render: (h, params) => {
                return h('div',params.row.performance==1? '是':'否')
              }

            },
            { title: '是否计算实操', key: 'actualOperation',
              render: (h, params) => {
                return h('div',params.row.actualOperation==1? '是':'否')
              }
            },
            { title: '是否计算手工', key: 'manualFee',
              render: (h, params) => {
                return h('div',params.row.manualFee==1? '是':'否')
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
          data: [],
          addF: false,
          addData:{
            actualOperation: "",
            extensionMoney: "",
            extensionName: '',
            extensionValidity: "",
            id: "",
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
            bucklePrice:"",
            cashPrice:"",
            exceedReward:"",
          },
          type: '',
          projectList:[],
        }
      },
      methods: {
        getProject(){
          this.$ajax({
            method:'get',
            url: findAllProject()+'?id='+this.$route.params.id,
          }).then( (res) =>{
            this.projectList = res.data;
          }).catch( (error) =>{

          });
        },
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

          if(this.addData.extensionName == ''){
            this.$Message.warning('名称不能为空');
            return;
          }
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
              bucklePrice:'',
              cashPrice:''
          };
        },
        Addproject(){
          this.addData.project.push({
            extensionNumber: '',
            extensionValidity:'',
            projectId: '',
            projectName: ""
          });

        },
        mannger(data, i) {
          this.type = 0;
          this.addF =true;
          this.addData = JSON.parse(JSON.stringify(data));
          this.addData.performance=this.addData.performance == 1 ? '1': '2';
          this.addData.actualOperation=this.addData.actualOperation== 1 ? '1': '2';
          this.addData.manualFee=this.addData.manualFee== 1 ? '1': '2';

        },
        del(data, i) {
          this.$ajax({
          method: 'get',
          url: deleteExtension()+'?id='+data.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
        },
        check(value){
          return value.replace(/[^\d]/g,'');
        },
        check2(value){
          return value.replace(/[^\d\.]/g,'');
        }
      },
      created(){
        this.getProject();
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
