<template>
  <div>
    <Row>
      <Col span="2" style="margin-left:5px;">
        <h3>会员储值</h3>
        <Checkbox v-model="data.preSale">售前</Checkbox>
        <Checkbox v-model="data.aftermarket">售后</Checkbox>
      </Col>
      <Col span="2">
        <h3>美容</h3>
        <Checkbox v-model="data.beautyCash">现金</Checkbox>
        <Checkbox v-model="data.beautyPractice">实操</Checkbox>
      </Col>
      <Col span="2">
        <h3>美发</h3>
        <Checkbox v-model="data.hairdressingCash">现金</Checkbox>
        <Checkbox v-model="data.hairdressingSnap">卡扣</Checkbox>
      </Col>
      <Col span="2">
        <h3>瑜伽</h3>
        <Checkbox v-model="data.yogaCash">现金</Checkbox>
        <Checkbox v-model="data.yogaSnap">卡扣</Checkbox>
      </Col>
      <Col span="2">
        <h3>产品</h3>
        <Checkbox v-model="data.productCash">现金</Checkbox>
        <Checkbox v-model="data.productSnap">卡扣</Checkbox>
      </Col>
      <Col span="2">
        <h3>高端项目</h3>
        <Checkbox v-model="data.projectCash">现金</Checkbox>
        <Checkbox v-model="data.projectSnap">卡扣</Checkbox>
      </Col>
      <Col span="5">
        <h3>客流</h3>
        <Checkbox v-model="data.passenger">客流</Checkbox>
        <Checkbox v-model="data.storeNumber">到店人数</Checkbox>
        <Checkbox v-model="data.firstStoreNumber">首次进店人数</Checkbox>
        <Checkbox v-model="data.firstTransactionNumber">首次成交人数</Checkbox>
        <Checkbox v-model="data.twoTurnover">二次成交人数</Checkbox>
      </Col>
      <Col span="4">
        <h3>其他</h3>
        <Checkbox v-model="data.totalActualExercise">实操总额</Checkbox>
        <Checkbox v-model="data.unitPrice">客单价</Checkbox>
        <Checkbox v-model="data.arrears">欠款</Checkbox>
      </Col>
      <Col span="2">
       <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { findConsultantMonthlyReport ,saveOrUpateConsultantMonthlyReport} from '../../interface';
    export default {
      name: "t1",
      data () {
        return {
          data: {
            aftermarket: false,
            arrears: false,
            beauty: false,
            beautyCash: false,
            beautyPractice: false,
            dateTime: false,
            enable: false,
            hairdressing: false,
            hairdressingCash: false,
            hairdressingSnap: false,
            highEndProjects: false,
            id: 0,
            memberStorageValue: false,
            passenger: false,
            personalPerformance: false,
            preSale: false,
            product: false,
            productCash: false,
            productSnap: false,
            projectCash: false,
            projectSnap: false,
            storeId: 0,
            storeName: '',
            yoga: false,
            yogaCash: false,
            yogaSnap: false,
            unitPrice:false,
            totalActualExercise: false,
            twoTurnover:false,
            firstTransactionNumber: false,
            firstStoreNumber: false,
            storeNumber: false,
            passenger: false,
          },
          model1:''
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
            url: findConsultantMonthlyReport()+"?id="+this.$route.params.id,
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
            url: saveOrUpateConsultantMonthlyReport(),
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
  div{
    padding-bottom: 20px;
  }
</style>
