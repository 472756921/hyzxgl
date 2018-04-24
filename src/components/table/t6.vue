<template>
  <div>
    <Row :gutter="10">
      <Col span="3" class="col" style="margin-left: 5px;">
        <Checkbox v-model="data.customerName">顾客姓名</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.serviceItems">服务项目或产品</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.cash">现金</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.practicalOperation">实操</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.buckle">卡扣</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.adviser">顾问</Checkbox>
      </Col>
      <Col span="3" class="col">
       <Checkbox v-model="data.serviceDepartment">服务部门</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.servicePersonal">服务人员</Checkbox>
      </Col>
      <Col span="3">
       <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>

    </Row>

  </div>
</template>

<script>
  import { findDailyStoreDesign ,saveOrUpateDailyStoreDesign} from '../../interface';
  export default {
    name: "t6",
    data () {
      return {
        data: {
          adviser: false,
          buckle: false,
          cash: false,
          customerName: false,
          practicalOperation: false,
          serialNumber: false,
          serviceDepartment: false,
          serviceItems: false,
          servicePersonal: false,
          storeId: '',
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
          url: findDailyStoreDesign()+"?id="+this.$route.params.id,
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
          url: saveOrUpateDailyStoreDesign(),
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
