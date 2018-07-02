<template>
    <!--会员卡-->
    <div class="list">
      <h2 style="margin: .6rem 0;">会员卡管理</h2>
      <Button class="hy_btn" @click="Add">添加</Button>
      <br/>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" :mask-closable="false" @on-ok="ok" class="mod">
        <div class='com'>会员级别名称：<Input v-model="addData.membershipName" style="width: 252px"></Input></div>
        <div class='com'>会员价格：<Input v-model="addData.membershipMoney" placeholder="单位元" style="width: 275px;ime-mode:disabled" @on-keyup="addData.membershipMoney=check2(addData.membershipMoney)" ></Input>
        </div>
        <div class='com'>单次折扣：0.
          <Select v-model="DA" style="width:40px" size="small" placeholder="" :transfer=true>
          <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
        </Select>
          <Select v-model="DB" style="width:40px" size="small" placeholder="" :transfer=true>
            <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品折扣：0.
          <Select v-model="DC" style="width:40px" size="small" placeholder="" :transfer=true>
            <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
          </Select>
          <Select v-model="DD" style="width:40px" size="small" placeholder="" :transfer=true>
            <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
          </Select>
        </div>
        <div class='com'>有效期：<Input v-model="addData.membershipValidity" placeholder="单位月" style="width: 288px;ime-mode:disabled" onpaste="return false;" @on-keyup="addData.membershipValidity=check(addData.membershipValidity)"></Input></div>
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
          <h3>会员尊享<!--<Button class="hy_btn" size="small" @click="Addproject">添加</Button>--></h3>
          <div class="projectone"  v-for="item in addData.enjoy">
            <div class='com'>有效期：<Input v-model="item.enjoyValidity" style="width: 288px" placeholder="单位月" @on-keyup="item.enjoyValidity=check(item.enjoyValidity)"></Input></div>
            <div class='com'>尊享项目：
              <Select v-model="item.projectId" style="width:275px" :transfer=true>
                <Option :value="items.id" :key="items.id"  v-for="items in projectList">{{items.projectName}}</Option>
              </Select>
            </div>
            <div class='com'>尊享次数：<Input v-model="item.enjoyNumber" style="width: 275px" @on-keyup="item.enjoyNumber=check(item.enjoyNumber)"></Input></div>
            <div class='com'><Checkbox v-model="addData.settingTime" size="large">在门店系统选择生效时间</Checkbox></div>
          </div>

        </div>
        <div class='group'>
          <h3>会员日</h3>
          <div class='com'>会员日：每月<Input v-model="addData.memberDay" style="width: 30px"/>日，或 第 <Input v-model="addData.memberDayNtoStore" style="width: 30px"/> 次到店第 <Input v-model="addData.memberDayNProject" style="width: 30px"/> 个项目，折扣0.<Select v-model="DE" style="width:40px" size="small"  :transfer=true>
            <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
          </Select>
            <Select v-model="DF" style="width:40px" size="small"  :transfer=true>
              <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
            </Select></div>
        </div>
        <div class='group'>
          <h3>会员返现</h3>
          <div class='com'> 第 <Input v-model="addData.memberReturnNtoStore" style="width: 30px"/> 次到店第 <Input v-model="addData.memberReturnNProject" style="width: 30px"/> 个项目，返现 <Input v-model="addData.returnAmount" @on-keyup="addData.returnAmount=check2(addData.returnAmount)" style="width: 80px"/>元，有效期 <Input v-model="addData.returnValidity" @on-keyup="addData.returnValidity=check(addData.returnValidity)" style="width: 30px"/> 个月</div>
        </div>
        <div class='com' style="margin-bottom:100px;">
          <span style="float: left;">注意事项：</span>
          <Select v-model="addData.precautions" placeholder="注意事项" :multiple=true style="width:400px;margin-bottom:50px;" :transfer=true >
          <Option :value="1" style="word-wrap: break-word"> ● 会员尊享必须每月到店护理两次以上（每次最少两个项目），<br>第三次到店方可尊享免费项目。</Option>
          <Option :value="2" > ● 会员尊享是从会员充值之日起连续十二个月内有效。</Option>
          <Option :value="3" > ● 会员充值三个月内可补差额升卡，消费超过三个月升卡需全额。</Option>
          <Option :value="4" > ● 会员充值三个月内可补差额升卡，消费超过三个月升卡需全额。</Option>
          <Option :value="5" > ● 会员尊享本月不做不累计，逾期无效。</Option>
          <Option :value="6" > ● 会员尊享须会员本人使用。</Option>
          <Option :value="7" > ● 会员日项目折扣为单次折扣价。</Option>
          <Option :value="8" > ● 会员日为储值会员服务，项目折扣金额为会员卡扣金额，<br>不接受现金支付。</Option>
          <Option :value="9" > ● 会员日权利时限与会员尊享同步。</Option>
          <Option :value="10" > ● 会员当月第五次到店即享受返现日返现。</Option>
          <Option :value="11" > ● 返现现金可购买项目，如购买产品无折扣。</Option>
          <Option :value="12" > ● 返现现金必须当月使用，不得累计，逾期无效。</Option>
          <Option :value="13" > ● 返现日时限与会员尊享同步。</Option>
        </Select>
        </div>
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
              title: '会员级别名称',
              key: 'membershipName',
            },
            {
              title: '会员价格(元)',
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
              title: '升卡原则',
              key: 'liftCardType',
            },
            {
              title: '有效期(月)',
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
            precautions: [],
            productDiscount: "",
            projectDiscount: "",
            returnAmount: "",
            returnValidity: '',
            storeId: this.$route.params.id,
            storeName: "",
            liftCardType: '',
            settingTime:false,
          },
          type: '',
          projectList:[],
          notice:[],
          DA:0,
          DB:0,
          DC:0,
          DD:0,
          DE:0,
          DF:0,
          num:[0,1,2,3,4,5,6,7,8,9],
          model1:'',
          model2:'',
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
            url: findMembership()+'?storeId='+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data;
          }).catch( (error) =>{

          })
        },
        ok() {
          var Surl;
          if(this.addData.membershipName == ''){
            this.$Message.warning('会员级别名称不能为空');
            return;
          }
          if(this.type == 1){
            Surl = saveMembership();
          }else{
            Surl = editMembership();
          }
          this.addData.projectDiscount = parseFloat('0.'+this.DA+this.DB);
          this.addData.productDiscount = parseFloat('0.'+this.DC+this.DD);
          this.addData.memberDayDiscount = parseFloat('0.'+this.DE+this.DF);
          this.addData.precautions = this.addData.precautions.toString();
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
          this.DA =0 ;
          this.DB = 0;
          this.DC = 0;
          this.DD = 0;
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
              precautions: [],
              productDiscount: "",
              projectDiscount: "",
              returnAmount: "",
              returnValidity: '',
              storeId: this.$route.params.id,
              storeName: "",
            settingTime:false,


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
          this.addData = JSON.parse(JSON.stringify(data));
          if (typeof data.precautions == 'string') {
            this.addData.precautions = data.precautions.split(',').map( (it, i) => {return +it});
          }
          this.DA = this.splitNum(data.projectDiscount)[0];
          this.DB = this.splitNum(data.projectDiscount)[1];
          this.DC = this.splitNum(data.productDiscount)[0];
          this.DD = this.splitNum(data.productDiscount)[1];
          this.DE = this.splitNum(data.memberDayDiscount)[0];
          this.DF = this.splitNum(data.memberDayDiscount)[1];
          this.addData.settingTime = data.settingTime=='true' ? true:false;

        },
        del(data, i) {
          var c = confirm('确认删除？');
          if(!c) {
            return false;
          }
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
        check(value){
          return value.replace(/[^\d]/g,'');
        },
        check2(value){
          return value.replace(/[^\d\.]/g,'');
        },
        checkNum(value){
          if(value.match(/[\d]+[\%]/g) == null) return true;
          else return false;
        },
        splitNum(num){
          if(typeof num !='string'){
            num.toString();
          }
          if(num == '0'){
            num = '0.00';
          }
          var arr = num.split('.')[1];
          var arr2 = arr.split('');
          for(var i=0;i<arr2.length;i++){
            arr2[i]=parseInt(arr2[i]);
          }
          if(arr2.length<2){
            arr2[1]=0;
          }
          return arr2;
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
