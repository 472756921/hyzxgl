<template>
  <div class="list">
    <h2 style="padding: .6rem;">活动卡管理</h2>
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.activityName" style="width: 300px"></Input></div>
      <div class='com'>价格：<Input v-model="addData.activityMoney" style="width: 300px"></Input></div>
      <div class='com'>活动有效期：<Input v-model="addData.activityValidity" style="width: 264px"></Input></div>
      <div class='com'>卡有效期：<Input v-model="addData.activityCardValidity" style="width: 276px"></Input></div>
      <div class='group'>
        <h3>返现优惠</h3>
        <div class='com'>返现方式：
          <Select v-model="addData.returnMode" style="width:264px" :transfer=true>
            <Option>卡扣项目</Option>
            <Option>现金项目</Option>
            <Option>产品</Option>
          </Select>
        </div>
        <div class='com'>返现金额：<Input v-model="addData.returnAmount" style="width: 268px" placeholder="单位月" ></Input></div>
        <div class='com'>有效期：<Input v-model="addData.returnValidity" style="width: 280px"></Input></div>
      </div>
      <div class='group'>
        <h3>特价秒杀</h3>
        <div class='com'>秒杀项目：
          <Select v-model="addData.apecialSecondKill.projectName" style="width:264px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>套数：<Input v-model="addData.apecialSecondKill.specialNumber" style="width: 291px" placeholder="单位月" ></Input></div>
        <div class='com'>秒杀价格：<Input v-model="addData.apecialSecondKill.specialMoney" style="width: 268px"></Input></div>
      </div>
      <div class='group'>
        <h3>到店赠送</h3>
        <div class='com'>触发机制：第 <Input v-model="addData.memberDayNtoStore" style="width: 30px"/> 次到店</div>
        <div class='com'>赠送项目：
          <Select v-model="addData.toStoreProject.projectName" style="width:270px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>赠送次数：<Input v-model="addData.toStoreProject.activityNumber" style="width: 273px"></Input></div>
      </div>
      <div class='group'>
        <h3>享受尊享</h3>
        <div class='com'>尊享项目：
          <Select v-model="addData.project.projectName" style="width:270px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>尊享有效期：<Input v-model="addData.project.activityValidity" style="width: 262px"></Input></div>
        <div class='com'>尊享次数：<Input v-model="addData.project.activityNumber" style="width: 275px"></Input></div>
      </div>
      <div class='group'>
        <h3>老带新</h3>
        <div class='com'>赠送项目：
          <Select  style="width:275px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>赠送次数：<Input style="width: 278px"></Input></div>
      </div>
      <div class='group'>
        <h3>产品秒杀</h3>
        <div class='com'>产品：
          <Select v-model="addData.productSecondKill.projectName" style="width:305px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>现金秒杀价格：<Input v-model="addData.productSecondKill.cashSecondPrice" style="width: 260px"></Input></div>
        <div class='com'>卡扣秒杀价格：<Input v-model="addData.productSecondKill.buckleTheSecondPrice" style="width: 260px"></Input></div>
      </div>
      <div class='group'>
        <h3>隐藏显示</h3>
        <div class='com'>疗程组合卡：
          <Select v-model="addData.courseOfActivityCard.treatmentName" style="width:275px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {findactivity,saveactivity,editactivity,deleteactivity} from '../../interface'
  export default {
    name: "hd_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'activityName',},
          { title: '价格', key: 'activityMoney',},
          { title: '有效期', key: 'activityValidity',},
          { title: '是否计算业绩', key: 'yj',},
          { title: '是否计算实操', key: 'sc',},
          { title: '是否计算手工', key: 'sg',},
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
          {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤', c: '8'},
        ],
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
          ]

        },
        type: '',
      }
    },
    methods: {
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
          ]

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
          url: deleteactivity()+'?id='+data.id,
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
