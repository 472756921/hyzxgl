<template>
  <div style="padding: 1rem">
    <h2 style="padding: .6rem;">顾客管理</h2>
    <Button class="hy_btn" @click="save">保存规则</Button>
    <div class="content">
      <Row>
        <h3 class="title">指定顾客管理</h3>
          <Col span="12">
            <h4 class="titleB">指定条件</h4>
             <Checkbox label="1" v-model="data.exclusivePointList">排他性点单</Checkbox>
             <Checkbox label="2" v-model="data.continuousService">某技师连续服务 <input type="text" class="inputext" placeholder="填写" v-model="data.serviceTimes"/> 次</Checkbox>
             <Checkbox label="3" v-model="data.customerIntroduction">有指定的顾客介绍</Checkbox>
             <Checkbox label="4" v-model="data.technician">技师直接拓客</Checkbox>
          </Col>
          <Col span="12">
            <h4 class="titleB">非指定条件</h4>
             <Checkbox label="5" v-model="data.customerComplaint">顾客投诉</Checkbox>
             <Checkbox label="6" v-model="data.establishContact">连续被他人服务<input type="text" class="inputext" placeholder="填写" v-model="data.establishContactN"/> 次</Checkbox>
             <Checkbox label="7" v-model="data.noStore">顾客连续 <input type="text" class="inputext" placeholder="填写" v-model="data.noStoreN"/> 个月不到店</Checkbox>
             <Checkbox label="8" v-model="data.cashPoor">顾客连续 <input type="text" class="inputext" placeholder="填写" v-model="data.cashPoorN"/> 个月无现金</Checkbox>
          </Col>
      </Row>
    </div>
  <div class="content">
      <Row>
        <h3 class="title">顾客到店员工护理顺序</h3>
        <Col span="24">
          <span>第一规则：</span>
          <Select style="width:100px" v-model="RA">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="2">上次服务者</Option>
            <Option value="3" :key="3">服务最多者</Option>
            <Option value="4" :key="4">店长指定</Option>
          </Select>
          <span>第二规则：</span>
          <Select style="width:100px" v-model="RB">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="2">上次服务者</Option>
            <Option value="3" :key="3">服务最多者</Option>
            <Option value="4" :key="4">店长指定</Option>
          </Select>
          <span>第三规则：</span>
          <Select style="width:100px" v-model="RC">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="2">上次服务者</Option>
            <Option value="3" :key="3">服务最多者</Option>
            <Option value="4" :key="4">店长指定</Option>
          </Select>
          <span>第四规则：</span>
          <Select style="width:100px"  v-model="RD">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="2">上次服务者</Option>
            <Option value="3" :key="3">服务最多者</Option>
            <Option value="4" :key="4">店长指定</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">顾客分类
           <Checkbox label="9" v-model="data.customerClassification">激活</Checkbox>
        </h3>
        <Col span="8">
          <h4 class="titleB">客户分级 <Checkbox label="12" v-model="data.classA">启用</Checkbox></h4>
          <div>A类</div>
          <div>B类</div>
          <div>C类</div>
        </Col>
        <Col span="8">
          <h4 class="titleB">消费实力</h4>
           <Checkbox label="13" v-model="data.bigCustomer">大客户（连续<input type="text" class="inputext" placeholder="填写" v-model="data.bigCustomerMonth"/>个月，消费达 <input type="text" class="inputext" placeholder="填写" v-model="data.bigCustomerN"/> 元）</Checkbox>
           <!--<Checkbox label="14" v-model="data.ordinaryCustomer">普通客户（消费不足 <input type="text" class="inputext" placeholder="填写" v-model="data.ordinaryCustomerN"/> 元）</Checkbox>-->
        </Col>
        <Col span="8">
          <h4 class="titleB">客户活跃度</h4>
           <Checkbox label="15" v-model="data.regularCustomers">常到店客户 （连续 <input type="text" class="inputext" placeholder="填写" v-model="data.regularCustomersN"/> 月至少到店<input type="text" class="inputext" placeholder="填写" v-model="data.regularMinCount"/>次）</Checkbox><br/>
           <Checkbox label="15" v-model="data.sleepCustomer">睡眠客户 （连续 <input type="text" class="inputext" placeholder="填写" v-model="data.sleepCustomerN"/> 月以上未到店）</Checkbox><br/>
           <Checkbox label="15" v-model="data.frozenCustomers">冻结客户 （连续 <input type="text" class="inputext" placeholder="填写" v-model="data.frozenCustomersN"/> 月以上未到店）</Checkbox>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">客户分析
           <Checkbox label="16" v-model="data.customerAnalysis">激活</Checkbox>
        </h3>
        <Col span="4">
          <h4 class="titleB">性格分析</h4>
           <Checkbox label="17" v-model="data.bloodType">血型</Checkbox>
           <Checkbox label="18" v-model="data.constellation">星座</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">客户分析</h4>
           <Checkbox label="19" v-model="data.incomeMode">收入方式</Checkbox>
           <Checkbox label="20" v-model="data.annualIncome">年收入</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">愿景目的</h4>
           <Checkbox label="21" v-model="data.objective">到美容院的目的</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">症状问题</h4>
           <Checkbox label="22" v-model="data.face">面部</Checkbox>
           <Checkbox label="23" v-model="data.body">身体</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">原因</h4>
           <Checkbox label="24" v-model="data.internalCause">内因</Checkbox>
           <Checkbox label="25" v-model="data.externalcause">外因</Checkbox>
        </Col>
      </Row>
    </div>

    <Button class="hy_btn" @click="save">保存规则</Button>

  </div>
</template>

<script type="text/ecmascript-6">

  import { findStoreById, editStoreCustomer } from '../../interface';
  import m_index_info_gl from '../store/m_index_info_gl';

  export default {
    name: 'c_index',
    components: {m_index_info_gl},
    data(){
      return {
        RA: '',
        RB: '',
        RC: '',
        RD: '',
        data: {
          xxxx: '',
          id: '',
          regularMinCount: '',
          bigCustomerMonth: '',
          exclusivePointList: false,
          continuousService: false,
          serviceTimes: '',
          customerIntroduction: false,
          technician: false,
          customerComplaint: false,
          establishContact: false,
          noStore: false,
          noStoreN: '',
          cashPoor: false,
          cashPoorN: '',
          classA: false,
          classB: false,
          classC: false,
          bigCustomer: false,
          bigCustomerN: '',
          ordinaryCustomer: false,
          ordinaryCustomerN: '',
          customerClassification: false,
          sleepCustomer: false,
          sleepCustomerN: '',
          regularCustomers: false,
          regularCustomersN: '',
          frozenCustomers: false,
          frozenCustomersN: '',
          customerAnalysis: false,
          bloodType: false,
          constellation: false,
          incomeMode: false,
          annualIncome: false,
          objective: false,
          face: false,
          body: false,
          internalCause: false,
          externalcause: false,
          advisorDesignation: []
        }
      };
    },
    created() {
      this.findStore();
    },
    methods: {
      findStore() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findStoreById()+"?id="+this.$route.params.id,
        }).then((res) => {
         this.getSort(res.data.advisorDesignation);
          this.data = res.data;
        }).catch((error) => {
        });
      },
      save() {
        this.data.advisorDesignation = this.RA+','+this.RB+','+this.RC+','+this.RD,
        this.data.id = this.$route.params.id;
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          data: this.data,
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: editStoreCustomer(),
        }).then((res) => {
          this.$Message.success('保存成功');
          this.findStore();
        }).catch((error) => {
        });
      },
      getSort(data) {
        data.split(',').map( (i, index) => {
          if(index == 0) {
            this.RA = i;
          }
          if(index == 1) {
            this.RB = i;
          }
          if(index == 2) {
            this.RC = i;
          }
          if(index == 3) {
            this.RD = i;
          }
        });
      },
    }
  };
</script>

<style scoped>
  .askText{
    widht:100%;
    word-wrap: break-word;
  }
  .title{
    border-bottom: 1px solid #eee;
    margin: 0 0 10px 0;
    padding-bottom: 10px;
  }
  .titleB{
    padding-bottom: 10px;
  }
  .content{
    border: 1px solid #e3e3e3;
    padding: 1rem;
    margin: 10px 0;
  }
  .inputext{
    width: 80px;
    margin: 0 3px;
    border: 1px solid #ccc;
  }
</style>
