<template>
  <div>
    <Row :gutter="10">
      <Col span="9" style="margin-left: 5px;padding-top: 40px;">
        <Checkbox v-model="data.customerName">顾客姓名</Checkbox>
        <Checkbox v-model="data.serviceItems">服务项目</Checkbox>
        <Checkbox v-model="data.cashPerformance">现金业绩</Checkbox>
        <Checkbox v-model="data.highEndProjects">高端项目</Checkbox>
        <Checkbox v-model="data.adviser">顾问</Checkbox>
      </Col>
      <Col span="3">
        <h3>面部</h3>
        <Checkbox v-model="data.facialPracticeAppoint">指定</Checkbox>
        <Checkbox v-model="data.facialPracticeNonSpecifiedt">非指定</Checkbox>
      </Col>
      <Col span="3">
        <h3>身体</h3>
        <Checkbox v-model="data.physicalExerciseAppoint">指定</Checkbox>
        <Checkbox v-model="data.physicalExerciseNonSpecifiedt">非指定</Checkbox>
      </Col>
      <Col span="4">
        <h3>产品</h3>
        <Checkbox v-model="data.productCash">现金</Checkbox>
        <Checkbox v-model="data.superDiscount">超折</Checkbox>
        <Checkbox v-model="data.productSnap">卡扣</Checkbox>
      </Col>
      <Col span="3">
        <h3>卡扣疗程</h3>
        <Checkbox v-model="data.claspCourseName">名称</Checkbox>
        <Checkbox v-model="data.claspCourseMoney">金额</Checkbox>
      </Col>
      <Col span="1">
       <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>

    </Row>
  </div>
</template>

<script>
  import { findShopDailyDetails ,saveOrUpateShopDailyDetails} from '../../interface';
  export default {
    name: "t7",
    data () {
      return {
        data: {
          adviser: false,
          cashPerformance: false,
          claspCourse: false,
          claspCourseMoney: false,
          claspCourseName: false,
          customerName: false,
          employeeName: false,
          facialPractice: false,
          facialPracticeAppoint: false,
          facialPracticeNonSpecifiedt: false,
          highEndProjects: false,
          physicalExercise: false,
          physicalExerciseAppoint: false,
          physicalExerciseNonSpecifiedt: false,
          product: false,
          productCash: false,
          productSnap: false,
          serviceItems: false,
          storeId: '',
          superDiscount: false
        }
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
          url: findShopDailyDetails()+"?id="+this.$route.params.id,
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
          url: saveOrUpateShopDailyDetails(),
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
