<template>
  <div>
    <Row :gutter="10">
      <Col span="2" class="col" style="margin-left:5px;">
       <Checkbox v-model="data.shopPerformance">全店业绩</Checkbox>
      </Col>

      <Col span="2" class="col">
       <Checkbox v-model="data.shopPassenger">全店客流</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.fullShopPractice">全店实操</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.fullStoreNumber">全店到店人数</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.highEndProject">高端项目</Checkbox>
      </Col>

      <Col span="2" class="col">
       <Checkbox v-model="data.buckleProject">卡扣项目</Checkbox>
      </Col>

      <Col span="2" class="col">
       <Checkbox v-model="data.product">卡扣产品</Checkbox>
      </Col>

      <Col span="3" class="col">
        <Checkbox v-model="data.recordTheStoreManager">是否记录店长个人业绩</Checkbox>
      </Col>

      <Col span="2" class="col">
       <Checkbox v-model="data.remarks">备注</Checkbox>
      </Col>

      <Col span="2">
       <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>

    </Row>

  </div>
</template>

<script>
  import { findManagerOfTheMonthlyReport ,saveOrUpateManagerOfTheMonthlyReport} from '../../interface';
    export default {
      name: "t4",
      data () {
        return {
          data: {
            product: false,
            remarks: false,
            shopPassenger: false,
            shopPerformance: false,
            storeId: '',
            fullShopPractice: false,
            fullStoreNumber:false,
            highEndProject: false,
            buckleProject: false,
            recordTheStoreManager: false,
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
            url: findManagerOfTheMonthlyReport()+"?id="+this.$route.params.id,
          }).then((res) => {
            for( let item in res.data){
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
            url: saveOrUpateManagerOfTheMonthlyReport(),
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
  .col{
    padding-top: 40px;


  }
  .btn{
    margin-top: 25px;
  }

</style>
