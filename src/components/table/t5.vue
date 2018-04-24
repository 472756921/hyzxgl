<template>
  <div>
    <Row :gutter="10">
      <Col span="3" class="col" style="margin-left: 5px;"><Checkbox v-model="data.cashPerformance">现金业绩</Checkbox></Col>
      <Col span="2" class="col"><Checkbox v-model="data.passengerFlow">客流</Checkbox></Col>
      <Col span="2" class="col">
       <Checkbox v-model="data.practicalOperation">实操</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.cashProducts">现金产品</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.buckleProduct">卡扣产品</Checkbox>
      </Col>
      <Col span="2" class="col">
        <Checkbox v-model="data.realConsumption">实耗</Checkbox>
      </Col>
      <Col span="3" class="col">
        <Checkbox v-model="data.highEndProjectCash">高端项目现金</Checkbox>
      </Col>
      <Col span="2" class="col">
       <Checkbox v-model="data.remarks">备注</Checkbox>
      </Col>
      <Col span="3">
        <Button class="hy_btn btn" @click="saveData()">保存</Button>
      </Col>
    </Row>

  </div>
</template>

<script>
  import {findShopMonthlyReport, saveOrUpateShopMonthlyReport} from '../../interface';

  export default {
    name: "t5",
    data() {
      return {
        data: {
          buckleProduct: false,
          cashPerformance: false,
          cashProducts: false,
          highEndProjectCash: false,
          passengerFlow: false,
          practicalOperation: false,
          realConsumption: false,
          remarks: false,
          storeId: '',
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      check(val) {
        if (val == null) {
          val = false;
          return val;
        } else {
          return val;
        }
      },
      getData() {
        this.$ajax({
          method: 'get',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          url: findShopMonthlyReport() + "?id=" + this.$route.params.id,
        }).then((res) => {
          for (var item in res.data) {
            res.data[item] = this.check(res.data[item]);
          }
          this.data = res.data;
        }).catch((error) => {
          this.$Message.error('网络错误');
        });
      },
      saveData() {
        this.$ajax({
          method: 'post',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          url: saveOrUpateShopMonthlyReport(),
          data: this.data,
        }).then((res) => {
          this.$Message.success('保存成功');
        }).catch((error) => {
          this.$Message.error('保存失败');
        })

      }
    }
  }
</script>

<style scoped>
  .col {
    padding-top: 40px;
  }

  .btn {
    margin-top: 25px;
  }

</style>
