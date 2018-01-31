<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">活动卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.activityName" style="width: 300px"></Input></div>
      <div class='com'>价格：<Input v-model="addData.activityMoney" style="width: 300px"></Input></div>
      <div class='com'>活动有效期：<Input v-model="addData.activityValidity" placeholder="单位月" style="width: 264px"></Input></div>
      <div class='com'>卡有效期：<Input v-model="addData.activityCardValidity" placeholder="单位月" style="width: 276px"></Input></div>
      <div class='group'>
        <h3>返现优惠</h3>
        <div class='com'>返现方式：
          <Select v-model="addData.returnMode" style="width:264px" :transfer=true>
            <Option value="卡扣项目">卡扣项目</Option>
            <Option value="现金项目">现金项目</Option>
            <Option value="产品">产品</Option>
          </Select>
        </div>
        <div class='com'>返现金额：<Input v-model="addData.returnAmount" style="width: 268px"  ></Input></div>
        <div class='com'>有效期：<Input v-model="addData.returnValidity" placeholder="单位月" style="width: 280px"></Input></div>
      </div>
      <div class='group'>
        <h3>特价秒杀<Button class="hy_btn" size="small" @click="AddapecialSecondKill">添加</Button></h3>
        <div class="projectone" v-for="item in addData.apecialSecondKill">
          <div class='com'>秒杀项目：
            <Select v-model="item.projectId" style="width:264px" :transfer=true>
              <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
          </div>
          <div class='com'>套数：<Input v-model="item.specialNumber" style="width: 291px"  ></Input></div>
          <div class='com'>秒杀价格：<Input v-model="item.specialMoney" style="width: 268px"></Input></div>
        </div>
      </div>
      <div class='group'>
        <h3>到店赠送<Button class="hy_btn" size="small" @click="AddtoStoreProject">添加</Button></h3>
        <div class='com'>触发机制：第 <Input v-model="addData.memberDayNtoStore" style="width: 30px"/> 次到店,赠送 </div>
          <div class="projectone" v-for="item in addData.toStoreProject">
            <div class='com'>赠送项目：
              <Select v-model="item.projectId" style="width:270px" :transfer=true>
                <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
              </Select>
            </div>
            <div class='com'>赠送次数：<Input v-model="item.activityNumber" style="width: 273px"></Input></div>
          </div>
      </div>
      <div class='group'>
        <h3>享受尊享<Button class="hy_btn" size="small" @click="Addproject">添加</Button></h3>
        <div class="projectone" v-for="item in addData.project">
          <div class='com'>尊享项目：
            <Select v-model="item.projectId" style="width:270px" :transfer=true>
              <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
          </div>
          <div class='com'>尊享有效期：<Input v-model="item.activityValidity" placeholder="单位月" style="width: 262px"></Input></div>
          <div class='com'>尊享次数：<Input v-model="item.activityNumber" style="width: 275px"></Input></div>
        </div>
      </div>

      <div class='group'>
        <h3>老带新<Button class="hy_btn" size="small" @click="AddnewCustomerParticipation">添加</Button></h3>
        <div class='projectone' v-for="item in addData.newCustomerParticipation">
          <div class='com'>赠送项目：
          <Select v-model="item.projectId" style="width:275px" :transfer=true>
            <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
          </Select>
        </div>
        <div class='com'>赠送次数：<Input v-model="item.activityNumber" style="width: 278px"></Input></div>
        </div>
      </div>
      <div class='group'>
        <h3>产品秒杀<Button class="hy_btn" size="small" @click="AddproductSecondKill">添加</Button></h3>
        <div class="projectone" v-for="item in addData.productSecondKill">
          <div class='com'>产品：
            <Select v-model="item.projectId" style="width:305px" :transfer=true>
              <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
          </div>
          <div class='com'>现金秒杀价格：<Input v-model="item.cashSecondPrice" style="width: 260px"></Input></div>
          <div class='com'>卡扣秒杀价格：<Input v-model="item.buckleTheSecondPrice" style="width: 260px"></Input></div>
        </div>
      </div>
      <div class='group'>
        <h3>隐藏显示</h3>
        <div class='com'>疗程组合卡：
          <span class="projectone" v-for="item in addData.courseOfActivityCard">
            <Select v-model="item.treatmentId"style="width:100px" :transfer=true>
               <Option :value="items.id" v-for="items in projectList">{{items.projectName}}</Option>
            </Select>
          </span>
          <Button class="hy_btn" size="small" @click="AddcourseOfActivityCard">添加</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {findactivity,saveactivity,editactivity,deleteactivity,findAllProject} from '../../interface'
  export default {
    name: "hd_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'activityName',},
          { title: '价格', key: 'activityMoney',},
          { title: '活动有效期', key: 'activityValidity',},
          { title: '卡有效期', key: 'activityCardValidity',},
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
          activityCardValidity: '',
          activityMoney: "",
          activityName: "",
          activityValidity: '',
          apecialSecondKill: [
            {
              projectId: '',
              projectName: "",
              specialMoney: "",
              specialNumber: ''
            }
          ],
          courseOfActivityCard: [
            {
              treatmentId: '',
              treatmentName: ""
            }
          ],
          id: '',
          memberDayNtoStore: '',
          productSecondKill: [
            {
              buckleTheSecondPrice: "",
              cashSecondPrice: "",
              projectId: '',
              projectName: ""
            }
          ],
          project: [
            {
              activityNumber: '',
              activityValidity: '',
              projectId: '',
              projectName: ""
            }
          ],
          returnAmount: "",
          returnMode: "",
          returnValidity: "",
          storeId: this.$route.params.id,
          storeName: "",
          toStoreProject: [
            {
              activityNumber: '',
              projectId: '',
              projectName: ""
            }
          ],
          newCustomerParticipation:[
          {
            activityNumber:'',
            activityValidity:'',
            id :'',
            projectId: '',
            projectName: ''

          }
          ]

        },
        type: '',
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
            method:'get',
            url: findactivity()+'?storeId='+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data;
          }).catch( (error) =>{

          })
      },
      ok() {
        var Surl;
        if(this.type == 1){
          Surl = saveactivity();
        }else{
          Surl = editactivity();
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
          activityCardValidity: '',
            activityMoney: "",
            activityName: "",
            activityValidity: '',
            apecialSecondKill: [
            {
              projectId: '',
              projectName: "",
              specialMoney: "",
              specialNumber: ''
            }
          ],
            courseOfActivityCard: [
            {
              treatmentId: '',
              treatmentName: ""
            }
          ],
            id: '',
            memberDayNtoStore: '',
            productSecondKill: [
            {
              buckleTheSecondPrice: "",
              cashSecondPrice: "",
              projectId: '',
              projectName: ""
            }
          ],
            project: [
            {
              activityNumber: '',
              activityValidity: '',
              projectId: '',
              projectName: ""
            }
          ],
            returnAmount: "",
            returnMode: "",
            returnValidity: "",
            storeId: this.$route.params.id,
            storeName: "",
            toStoreProject: [
            {
              activityNumber: '',
              projectId: '',
              projectName: ""
            }
          ],
           newCustomerParticipation:[
          {
            activityNumber:'',
            activityValidity:'',
            id :'',
            projectId: '',
            projectName: ''

          }
          ]

        };
      },
      AddapecialSecondKill(){
        this.addData.apecialSecondKill.push(
          {
            projectId: '',
            projectName: "",
            specialMoney: "",
            specialNumber: ''
          });
      },
      AddtoStoreProject(){
        this.addData.toStoreProject.push(
          {
            activityNumber: '',
            projectId: '',
            projectName: ""
          });

      },
      Addproject(){
        this.addData. project.push(
          {
            activityNumber: '',
            activityValidity: '',
            projectId: '',
            projectName: ""
          });
      },
      AddproductSecondKill(){
        this.addData.productSecondKill.push(
          {
            buckleTheSecondPrice: "",
            cashSecondPrice: "",
            projectId: '',
            projectName: ""
          });
      },
      AddcourseOfActivityCard(){
        this.addData.courseOfActivityCard.push(
          {
            treatmentId: '',
            treatmentName: ""
          });
      },
      AddnewCustomerParticipation(){
        this.addData.newCustomerParticipation.push({
          activityNumber:'',
            activityValidity:'',
            id :'',
            projectId: '',
            projectName: ''
        })
      },
      mannger(data, i) {
      this.type = 0;
          this.addF =true;
          this.addData = data;

      },
      del(data, i) {
      this.$ajax({
          method: 'get',
          url: deleteactivity()+'?id='+data.id,
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
