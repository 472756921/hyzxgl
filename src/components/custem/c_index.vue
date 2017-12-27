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
           <Checkbox label="2">某技师连续服务 <input type="text" class="inputext" placeholder="填写"/> 次</Checkbox>
           <Checkbox label="3">有联系的顾客介绍</Checkbox>
           <Checkbox label="4">技师直接拓客</Checkbox>
        </Col>
        <Col span="12">
          <h4 class="titleB">失去联系的因素</h4>
           <Checkbox label="5">顾客投诉</Checkbox>
           <Checkbox label="6">其他技师建立联系</Checkbox>
           <Checkbox label="7">顾客联系 <input type="text" class="inputext" placeholder="填写"/> 个月不到店</Checkbox>
           <Checkbox label="8">顾客连续 <input type="text" class="inputext" placeholder="填写"/> 月无现金</Checkbox>
        </Col>
        </CheckboxGroup>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">顾客到店员工护理顺序</h3>
        <Col span="24">
          <span>第一规则：</span>
          <Select style="width:100px">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="1">上次服务者</Option>
            <Option value="3" :key="1">服务最多者</Option>
            <Option value="4" :key="1">店长指定</Option>
          </Select>
          <span>第二规则：</span>
          <Select style="width:100px">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="1">上次服务者</Option>
            <Option value="3" :key="1">服务最多者</Option>
            <Option value="4" :key="1">店长指定</Option>
          </Select>
          <span>第三规则：</span>
          <Select style="width:100px">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="1">上次服务者</Option>
            <Option value="3" :key="1">服务最多者</Option>
            <Option value="4" :key="1">店长指定</Option>
          </Select>
          <span>第四规则：</span>
          <Select style="width:100px">
            <Option value="1" :key="1">指定技师</Option>
            <Option value="2" :key="1">上次服务者</Option>
            <Option value="3" :key="1">服务最多者</Option>
            <Option value="4" :key="1">店长指定</Option>
          </Select>
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
           <Checkbox label="13">大客户（消费达 <input type="text" class="inputext" placeholder="填写"/> 元）</Checkbox>
           <Checkbox label="14">普通客户（消费不足 <input type="text" class="inputext" placeholder="填写"/> 元）</Checkbox>
        </Col>
        <Col span="8">
          <h4 class="titleB">客户活跃度</h4>
           <Checkbox label="15">常到店客户 （连续 <input type="text" class="inputext" placeholder="填写"/> 月至少到店一次）</Checkbox>
           <Checkbox label="15">睡眠客户 （连续 <input type="text" class="inputext" placeholder="填写"/> 月以上未到店）</Checkbox>
           <Checkbox label="15">冻结客户 （连续 <input type="text" class="inputext" placeholder="填写"/> 月以上未到店）</Checkbox>
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
      <Row :gutter="16">
        <h3 class="title">问题列表
           <Checkbox label="16">激活</Checkbox>
          <Button class="hy_btn" @click="setQue(false)">添加问题</Button>
        </h3>
        <Col span="12">
          <h4 class="titleB">问题1</h4>
          <div class="askText">问题描述：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
          <br/>
          <br/>
          <div class="askText">解决方案：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
          <br/>
          <br/>
          <Button class="hy_btn" @click="setQue(true)">设置解决方案</Button>
        </Col>
        <Col span="12">
          <h4 class="titleB">问题2</h4>
          <div class="askText">问题描述：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
          <br/>
          <br/>
          <div class="askText">解决方案：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
          <br/>
          <br/>
          <Button class="hy_btn" @click="setQue(true)">设置解决方案</Button>
        </Col>
      </Row>
    </div>

    <Modal v-model="f_jj" title="解决方案" @on-ok="ok">
      <div>问题描述：</div>
      <Input v-model="ques" type="textarea" :rows="4" :disabled="setType" placeholder="请输入问题描述"/>
      <br/>
      <br/>
      <div>解决方案：</div>
      <Input v-model="plan" type="textarea" :rows="4" placeholder="请输入解决方案"/>
    </Modal>



  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'c_index',
    data(){
      return {
        indeterminate: true,
        checkAll: false,
        f_jj: false,
        plan: '',
        ques: '',
        setType: false,
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
      setQue(type) {
        this.setType = type;
        this.f_jj = true;
      },
      ok(){},
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
    width: 30px;
    margin: 0 3px;
    border: 1px solid #ccc;
  }
</style>
