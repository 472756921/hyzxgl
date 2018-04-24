<template>
  <div>
    <Row :gutter="10">
      <Col span="9" style="padding-top: 40px;">
        <Checkbox v-model="data.passenger">客流</Checkbox>
        <Checkbox v-model="data.totalPerformance">总业绩</Checkbox>
        <Checkbox v-model="data.theTotalOperation">总实操</Checkbox>
        <Checkbox v-model="data.cashPerformance">现金业绩（不含产品）</Checkbox>
      </Col>
      <Col span="4">
      <h3>实操</h3>
        <Checkbox v-model="data.practicalOperationAppoint">指定</Checkbox>
        <Checkbox v-model="data.practicalOperationNonSpecifiedt">非指定</Checkbox>
      </Col>
      <Col span="4">
        <h3>产品</h3>
        <Checkbox v-model="data.productCash">现金</Checkbox>
        <Checkbox v-model="data.productSnap">卡扣</Checkbox>
      </Col>
      <Col span="5">
        <h3>其他</h3>
        <Checkbox v-model="data.giveHandToHand">赠送手工</Checkbox>
        <Checkbox v-model="data.introducePerformance">转介绍业绩</Checkbox>
      </Col>
      <Col span="2">
       <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { findHairTechnicianMonthlyReport ,saveOrUpateHairTechnicianMonthlyReport} from '../../interface';

  export default {
    name: "t3",
    data () {
      return {
        data: {
          cashPerformance: false,
          giveHandToHand: false,
          introducePerformance: false,
          passenger: false,
          practicalOperation: false,
          practicalOperationAppoint: false,
          practicalOperationNonSpecifiedt: false,
          product: false,
          productCash: false,
          productSnap: false,
          storeId: '',
          theTotalOperation: false,
          totalPerformance: false
        },
      }
    },
    created() {
      this.getData();
    },
    methods: {
      check(val){
        if(val == null){
          val = false;
          return val;
        }else {
          return val;
        }
      },
      getData() {
        this.$ajax({
          method: 'get',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          url: findHairTechnicianMonthlyReport()+"?id="+this.$route.params.id,
        }).then((res) => {
          for( var item in res.data){
            res.data[item] = this.check(res.data[item]);
          }
          this.data= res.data;
        }).catch((error) => {
          this.$Message.error('网络错误');
        });
      },
      saveData(){
        this.$ajax({
          method: 'post',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          url: saveOrUpateHairTechnicianMonthlyReport(),
          data: this.data,
        }).then((res) => {
          this.$Message.success('保存成功');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })

      }
    }
  }
</script>

<style scoped>
  h3{
    margin: 10px 0;
  }
  .btn{
    margin-top: 25px;
  }
</style>
