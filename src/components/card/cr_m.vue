<template>
  <!--会员卡-->
  <div class="list">
    <h2 style="padding: .6rem;">会员卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>
    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>级别：<Input v-model="addData.membershipName" style="width: 300px"></Input></div>
      <div class='com'>名称：<Input style="width: 300px"></Input></div>
      <div class='com'>金额：<Input v-model="addData.membershipMoney" style="width: 300px"></Input></div>
      <div class='com'>单次折扣：<Input v-model="addData.projectDiscount" style="width: 275px"></Input></div>
      <div class='com'>产品折扣：<Input v-model="addData.productDiscount" style="width: 275px"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.membershipValidity" placeholder="单位月" style="width: 288px"></Input></div>
      <div class='com'>升卡原则：
        <Select style="width:275px" :transfer=true>
          <Option>累计现金</Option>
          <Option>累计充值</Option>
          <Option>增量充值</Option>
          <Option>单次充值</Option>
          <Option>充值金额</Option>
        </Select>
      </div>
      <div class='group'>
        <h3>会员尊享</h3>
        <div class='com'>有效期：<Input v-model="addData.enjoy.enjoyValidity" style="width: 288px" placeholder="单位月" ></Input></div>
        <div class='com'>尊享项目：
          <Select v-model="addData.enjoy.projectName" style="width:275px" :transfer=true>
            <Option>项目A</Option>
            <Option>项目B</Option>
          </Select>
        </div>
        <div class='com'>尊享次数：<Input v-model="addData.enjoy.enjoyNumber" style="width: 275px"></Input></div>
        <div class='com'>时效类型：
          <Select v-model="addData.enjoy.agingType" style="width:275px" :transfer=true>
            <Option>时间</Option>
            <Option>次数</Option>
          </Select>
        </div>
      </div>
      <div class='group'>
        <h3>会员日</h3>
        <div class='com'> 第 <Input v-model="addData.memberDayNtoStore" style="width: 30px"/> 次到店第 <Input v-model="addData.memberDayNProject" style="width: 30px"/> 个项目，折扣 <Input v-model="addData.memberDayDiscount" style="width: 30px"/></div>
      </div>
      <div class='group'>
        <h3>会员返现</h3>
        <div class='com'> 第 <Input v-model="addData.memberReturnNtoStore" style="width: 30px"/> 次到店第 <Input v-model="addData.memberReturnNProject" style="width: 30px"/> 个项目，返现 <Input v-model="addData.returnAmount" style="width: 30px"/> 有效期 <Input v-model="addData.returnValidity" style="width: 30px"/> 个月</div>
      </div>
      <div class='com'>注意事项：<Input v-model="addData.precautions" style="width: 275px"></Input></div>
    </Modal>
  </div>
</template>

<script>
  import {findMembership,saveMembership,editMembership,deleteMembership} from '../../interface'
  export default {
    name: "cr_m",
    data() {
      return {
        columns: [
          {
            title: '名称',
            key: 'name',
          },
          {
            title: '级别',
            key: 'membershipName',
          },
          {
            title: '金额',
            key: 'membershipMoney',
          },
          {
            title: '项目单次折扣',
            key: 'projectDiscount',
          },
          {
            title: '产品折扣',
            key: 'productDiscount',
          },
          {
            title: '有效期',
            key: 'membershipValidity',
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
          {name: '会员卡', cless: '一级', money: '300', zk: '0.9', pzk: '0.85', yxq: '24'},
          {name: '会员卡', cless: '二级', money: '800', zk: '0.85', pzk: '0.8', yxq: '24'},
          {name: '会员卡', cless: '三级', money: '1300', zk: '0.8', pzk: '0.75', yxq: '48'},
        ],
        addF: false,
        addData: {
          enjoy: [
            {
              agingType: "",
              enjoyNumber: '',
              enjoyValidity: "",
              id: '',
              projectId: '',
              projectName: ""
            }
          ],
          id: '',
          memberDay: "",
          memberDayDiscount: '',
          memberDayNProject: '',
          memberDayNtoStore: '',
          memberReturnNProject: '',
          memberReturnNtoStore: '',
          membershipMoney: "",
          membershipName: "",
          membershipValidity: '',
          precautions: "",
          productDiscount: "",
          projectDiscount: "",
          returnAmount: "",
          returnValidity: '',
          storeId: this.$route.params.id,
          storeName: ""

        },
        type: '',
      }
    },
    created() {

    },
    methods: {
      getData(){
        this.$ajax({
          method:'get',
          url: findMembership()+'?storeId='+this.$route.params.id,
        }).then( (res) =>{
          this.data = res.data;
        }).catch( (error) =>{

        })
      },
      ok() {
        var Surl;
        if(this.type == 1){
          Surl = saveMembership();
        }else{
          Surl = editMembership();
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
          enjoy: [
            {
              agingType: "",
              enjoyNumber: '',
              enjoyValidity: "",
              id: '',
              projectId: '',
              projectName: ""
            }
          ],
          id: '',
          memberDay: "",
          memberDayDiscount: '',
          memberDayNProject: '',
          memberDayNtoStore: '',
          memberReturnNProject: '',
          memberReturnNtoStore: '',
          membershipMoney: "",
          membershipName: "",
          membershipValidity: '',
          precautions: "",
          productDiscount: "",
          projectDiscount: "",
          returnAmount: "",
          returnValidity: '',
          storeId: this.$route.params.id,
          storeName: ""

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
          url: deleteMembership()+'?id='+data.id,
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
