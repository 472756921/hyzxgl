<template>
  <div style="padding: 1rem">
    <div class="content">
      <Row>
        <h3 class="title">客户与员工关系
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
        </h3>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Col span="12">
          <h4 class="titleB">建立联系的方式</h4>
           <Checkbox label="1">排他性点单</Checkbox>
           <Checkbox label="2">某技师连续服务N次</Checkbox>
           <Checkbox label="3">有联系的顾客介绍</Checkbox>
           <Checkbox label="4">技师直接拓客</Checkbox>
        </Col>
        <Col span="12">
          <h4 class="titleB">失去联系的因素</h4>
           <Checkbox label="5">顾客投诉</Checkbox>
           <Checkbox label="6">其他技师建立联系</Checkbox>
           <Checkbox label="7">顾客联系<input type="text" class="inputext" placeholder="填写"/> 个月不到店</Checkbox>
           <Checkbox label="8">顾客连续N月无现金</Checkbox>
        </Col>
        </CheckboxGroup>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">顾客到店员工护理顺序</h3>
          <Col span="12">
          <Checkbox label="1">指定技师</Checkbox>
          <Checkbox label="2">上次服务者</Checkbox>
          <Checkbox label="3">服务最多者</Checkbox>
          <Checkbox label="4">店长顾问指定</Checkbox>
          </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">顾客分类
           <Checkbox label="9">激活</Checkbox>
        </h3>
        <Col span="8">
          <h4 class="titleB">客户分级</h4>
           <Checkbox label="10">A类（高信任度）</Checkbox>
           <Checkbox label="11">B类（中信任度）</Checkbox>
           <Checkbox label="12">C类（不熟悉）</Checkbox>
        </Col>
        <Col span="8">
          <h4 class="titleB">消费实力</h4>
           <Checkbox label="13">大客户（消费达N元）</Checkbox>
           <Checkbox label="14">普通客户（消费不足N元）</Checkbox>
        </Col>
        <Col span="8">
          <h4 class="titleB">睡眠客户</h4>
           <Checkbox label="15">睡眠客户</Checkbox>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">客户分析
           <Checkbox label="16">激活</Checkbox>
        </h3>
        <Col span="4">
          <h4 class="titleB">性格分析</h4>
           <Checkbox label="17">血型</Checkbox>
           <Checkbox label="18">星座</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">客户分析</h4>
           <Checkbox label="19">收入方式</Checkbox>
           <Checkbox label="20">年收入</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">愿景目的</h4>
           <Checkbox label="21">到美容院的目的</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">症状问题</h4>
           <Checkbox label="22">面部</Checkbox>
           <Checkbox label="23">身体</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">原因</h4>
           <Checkbox label="24">内因</Checkbox>
           <Checkbox label="25">外因</Checkbox>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">问题列表
           <Checkbox label="16">激活</Checkbox>
        </h3>
        <Col span="12">
          <h4 class="titleB">问题1</h4>
          <span>问题描述：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <br/>
          <br/>
          <span>解决方案：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <br/>
          <br/>
          <Button class="hy_btn" @click="setQue">设置解决方案</Button>
        </Col>
        <Col span="12">
          <h4 class="titleB">问题2</h4>
          <span>问题描述：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <br/>
          <br/>
          <span>解决方案：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <br/>
          <br/>
          <Button class="hy_btn" @click="setQue">设置解决方案</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'c_index',
    data(){
      return {
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
      };
    },
    methods: {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup = ['1', '2', '3', '4', '5', '6', '7', '8'];
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length === 3) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      setQue() {

      },
    }
  };
</script>

<style scoped>
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
    overflow: auto;
    margin: 10px 0;
  }
  .inputext{
    width: 30px;
    margin: 0 3px;
    border: 1px solid #ccc;
  }
</style>
