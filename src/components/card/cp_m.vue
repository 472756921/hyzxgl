<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">产品卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" :mask-closable="false" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.productCardName" style="width: 300px"></Input></div>
      <div class='com'>卡扣价格：<Input v-model="addData.bucklePrice" @on-keyup="addData.bucklePrice=check2(addData.bucklePrice)" style="width: 300px"></Input></div>
      <div class='com'>现金价格：<Input v-model="addData.cashPrice" @on-keyup="addData.cashPrice=check2(addData.cashPrice)" style="width: 300px"></Input></div>
      <div class='com'>金额：<Input v-model="addData.productCardMoney" @on-keyup="addData.productCardMoney=check2(addData.productCardMoney)" style="width: 300px"></Input></div>
           <div class='com'>有效期：<Input v-model="addData.productCardValidity" @on-keyup="addData.productCardValidity=check(addData.productCardValidity)"  placeholder="单位月" style="width: 288px"></Input></div>
      <!--<div class='com'>产品折扣：<Select v-model="discont" style="width:275px"  placeholder="" :transfer=true>
        <Option value="配赠金额"  >配赠金额</Option>
        <Option value="打折" >打折</Option>
      </Select>
      </div>
      <div class="com" v-if="discont=='配赠金额'">配赠金额：<Input v-model="model1" @on-keyup="model1=check2(model1)" style="width: 275px"></Input>
      </div>
      <div class="com" v-if="discont=='打折'">打折： 0.
        <Select v-model="DA" style="width:40px" size="small" placeholder="" :transfer=true>
          <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
        </Select>
        <Select v-model="DB" style="width:40px" size="small" placeholder="" :transfer=true>
          <Option :value="item" :key="item" v-for="item in num" style="height: 18px;line-height: 18px;margin-top: 0; padding-top: 0;" >{{item}}</Option>
        </Select>

      </div>-->
    </Modal>
  </div>
</template>

<script>
  import {findproductCard,saveproductCard,editproductCard,deleteproductCard} from '../../interface'

  export default {
    name: "cp_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'productCardName',},
          { title: '卡扣价格', key: 'bucklePrice',},
          { title: '现金价格', key: 'cashPrice',},
          { title: '金额', key: 'productCardMoney',},
          { title: '有效期(月)', key: 'productCardValidity',},
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
        addData:{
          productCardName: '',
          bucklePrice:'',
          cashPrice :'',
          productCardMoney: '',
          productCardValidity: '',
          storeId: this.$route.params.id,
        },
        addF: false,
        type: '',
        DA:'',
        DB:'',
        num:[0,1,2,3,4,5,6,7,8,9],
        discont:'',
        model1:'',
      }
    },
    methods: {
      getData(){
        this.$ajax({
          method: 'get',
          url:findproductCard()+'?storeId='+this.$route.params.id,
        }).then( (res) =>{
          this.data = res.data;
        }).catch( (error) =>{
        })
      },
      ok() {
        var Surl;
        if(this.addData.productCardName == ''){
          this.$Message.warning('名称不能为空');
          return;
        }
        if(this.type == 1){
          Surl = saveproductCard();
        }else{
          Surl = editproductCard();
        }
        console.log(this.addData);
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
          productCardName: '',
          bucklePrice:'',
          cashPrice :'',
            productCardMoney: '',
            productCardValidity: '',
            storeId: this.$route.params.id,
        };
      },
      mannger(data, i) {
        this.type = 0;
        this.addF =true;
        this.addData = JSON.parse(JSON.stringify(data));
      },
      del(data, i) {
        this.$ajax({
          method: 'get',
          url: deleteproductCard()+'?id='+data.id,
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
