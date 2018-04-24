<template>
  <div>
    <Row :gutter="10">
      <Col span="2" style="padding-top: 40px;margin-left:5px;">
        <Checkbox v-model="data.passenger">客流</Checkbox>
      </Col>
      <Col span="3" >
        <h3>现金业绩</h3>
        <Checkbox v-model="data.storagePerformance">储值业绩</Checkbox>
        <Checkbox v-model="data.cashCourse">现金疗程</Checkbox>
      </Col>
      <Col span="3">
        <h3>面部实操</h3>
        <Checkbox v-model="data.facialPracticeAppoint">指定</Checkbox>
        <Checkbox v-model="data.facialPracticeNonSpecifiedt">非指定</Checkbox>
      </Col>
      <Col span="3">
        <h3>身体实操</h3>
        <Checkbox v-model="data.physicalExerciseAppoint">指定</Checkbox>
        <Checkbox v-model="data.physicalExerciseNonSpecifiedt">非指定</Checkbox>
      </Col>
      <Col span="3">
        <h3>高端项目</h3>
        <Checkbox v-model="data.projectCash">现金</Checkbox>
        <Checkbox v-model="data.projectSnap">卡扣</Checkbox>
      </Col>
      <Col span="3">
        <h3>产品</h3>
        <Checkbox v-model="data.productCash">现金</Checkbox>
        <Checkbox v-model="data.productSnap">卡扣</Checkbox>
      </Col>
      <Col span="5">
        <h3>其他</h3>
        <Checkbox v-model="data.cardPerformance">卡扣疗程业绩</Checkbox>
        <Checkbox v-model="data.giveHandToHand">赠送手工</Checkbox>
        <Checkbox v-model="data.introducePerformance">转介绍业绩</Checkbox>
      </Col>
      <Col span="1">
        <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { findBeauticianMonthlyReport ,saveOrUpateBeauticianMonthlyReport} from '../../interface';

    export default {
      name: "t2",
      data () {
        return {
          data: {
            passenger : false,
            facialPracticeAppoint: false,
            facialPracticeNonSpecifiedt: false,
            physicalExerciseAppoint: false,
            physicalExerciseNonSpecifiedt: false,
            productCash: false,
            productSnap: false,
            projectCash: false,
            projectSnap: false,
            introducePerformance: false,
            giveHandToHand: false,
            storeId: '',
            cardPerformance: false,
            storagePerformance: false,
            cashCourse: false,

          },
          model1:'',
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
            url: findBeauticianMonthlyReport()+"?id="+this.$route.params.id,
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
            url: saveOrUpateBeauticianMonthlyReport(),
            data: this.data,
          }).then((res) => {
            console.log(this.data);
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
