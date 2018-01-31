<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">产品卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>名称：<Input v-model="addData.productCardName" style="width: 300px"></Input></div>
      <div class='com'>购价：<Input v-model="addData.money" style="width: 300px"></Input></div>
      <div class='com'>金额：<Input v-model="addData.productCardMoney" style="width: 300px"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.productCardValidity" placeholder="单位月" style="width: 300px"></Input></div>

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
          { title: '购价', key: 'money',},
          { title: '金额', key: 'productCardMoney',},
          { title: '有效期', key: 'productCardValidity',},
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
          {p: '300', m: '298'},
          {p: '420', m: '398'},
        ],
        addData:{
          productCardName: '',
          money: '',
          productCardMoney: '',
          productCardValidity: '',
          storeId: this.$route.params.id,
        },
        addF: false,
        type: '',
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
            money: '',
            productCardMoney: '',
            productCardValidity: '',
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
          url: deleteproductCard()+'?id='+data.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
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
