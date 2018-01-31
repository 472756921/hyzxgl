<template>
    <!--会员卡-->
    <div class="list">
      <h2 style="margin: .6rem 0;">会员卡管理</h2>
      <Button class="hy_btn" @click="Add">添加</Button>
      <br/>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
        <div class='com'>名称级别：<Input v-model="addData.membershipName" style="width: 300px"></Input></div>
        <div class='com'>金额：<Input v-model="addData.membershipMoney" style="width: 300px"></Input></div>
        <div class='com'>单次折扣：<Input v-model="addData.projectDiscount" style="width: 275px"></Input></div>
        <div class='com'>产品折扣：<Input v-model="addData.productDiscount" style="width: 275px"></Input></div>
        <div class='com'>有效期：<Input v-model="addData.membershipValidity" placeholder="单位月" style="width: 288px"></Input></div>
        <div class='com'>升卡原则：
          <Select v-model="addData.liftCardType" style="width:275px" :transfer=true>
            <Option value="累计现金">累计现金</Option>
            <Option value="累计充值">累计充值</Option>
            <Option value="增量充值">增量充值</Option>
            <Option value="单次充值">单次充值</Option>
            <Option value="充值金额">充值金额</Option>
          </Select>
        </div>
        <div class='group'>
          <h3>会员尊享<Button class="hy_btn" size="small" @click="Addproject">添加</Button></h3>
          <div class="projectone"  v-for="item in addData.enjoy">
            <div class='com'>有效期：<Input v-model="item.enjoyValidity" style="width: 288px" placeholder="单位月" ></Input></div>
            <div class='com'>尊享项目：
              <Select v-model="item.projectId" style="width:275px" :transfer=true>
                <Option :value="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
              </Select>
            </div>
            <div class='com'>尊享次数：<Input v-model="item.enjoyNumber" style="width: 275px"></Input></div>
            <div class='com' style="margin-bottom: 15px;">时效类型：
              <Select v-model="item.agingType" style="width:275px" :transfer=true>
                <Option value="时间">时间</Option>
                <Option value="次数">次数</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class='group'>
          <h3>会员日</h3>
          <div class='com'>会员日：<DatePicker v-model="addData.memberDay" type="date" placeholder="Select date" style="width: 100px"></DatePicker> 第 <Input v-model="addData.memberDayNtoStore" style="width: 30px"/> 次到店第 <Input v-model="addData.memberDayNProject" style="width: 30px"/> 个项目，折扣 <Input v-model="addData.memberDayDiscount" style="width: 30px"/></div>
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
import {findMembership,saveMembership,editMembership,deleteMembership,findAllProject} from '../../interface'
    export default {
      name: "cr_m",
      data() {
        return {
          columns: [
            {
              title: '名称级别',
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
          data: [],
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
            storeName: "",
            liftCardType: '',

          },
          type: '',
          projectList:[],
        }
      },
      created() {

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
        Addproject(){
          this.addData.enjoy.push({
            agingType: "",
            enjoyNumber: '',
            enjoyValidity: "",
            id: '',
            projectId: '',
            projectName: ""
          });

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
