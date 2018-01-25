<template>
    <!--会员卡-->
    <div class="list">
      <Button class="hy_btn" @click="addF=true">添加</Button>
      <br/>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
        <div class='com'>级别：<Input style="width: 300px"></Input></div>
        <div class='com'>名称：<Input style="width: 300px"></Input></div>
        <div class='com'>金额：<Input style="width: 300px"></Input></div>
        <div class='com'>单次折扣：<Input style="width: 275px"></Input></div>
        <div class='com'>产品折扣：<Input style="width: 275px"></Input></div>
        <div class='com'>有效期：<Input placeholder="单位月" style="width: 288px"></Input></div>
        <div class='com'>升卡原则：
          <Select style="width:275px">
            <Option>累计现金</Option>
            <Option>累计充值</Option>
            <Option>增量充值</Option>
            <Option>单次充值</Option>
            <Option>充值金额</Option>
          </Select>
        </div>
        <div class='group'>
          <h3>会员尊享</h3>
          <div class='com'>有效期：<Input style="width: 288px" placeholder="单位月" ></Input></div>
          <div class='com'>尊享项目：
            <Select style="width:275px">
              <Option>项目A</Option>
              <Option>项目B</Option>
            </Select>
          </div>
          <div class='com'>尊享次数：<Input style="width: 275px"></Input></div>
          <div class='com'>时效类型：
            <Select style="width:275px">
              <Option>时间</Option>
              <Option>次数</Option>
            </Select>
          </div>
        </div>
        <div class='group'>
          <h3>会员日</h3>
          <div class='com'> 第 <Input style="width: 30px"/> 次到店第 <Input style="width: 30px"/> 个项目，折扣 <Input style="width: 30px"/></div>
        </div>
        <div class='group'>
          <h3>会员返现</h3>
          <div class='com'> 第 <Input style="width: 30px"/> 次到店第 <Input style="width: 30px"/> 个项目，返现 <Input style="width: 30px"/> 有效期 <Input style="width: 30px"/> 个月</div>
        </div>
        <div class='com'>注意事项：<Input style="width: 275px"></Input></div>
      </Modal>
    </div>
</template>

<script>
    export default {
      name: "cr_m",
      data() {
        return {
          columns: [
            {
              title: '名称',
              key: 'projectName',
            },
            {
              title: '级别',
              key: 'projectName',
            },
            {
              title: '金额',
              key: 'projectName',
            },
            {
              title: '项目单次折扣',
              key: 'projectName',
            },
            {
              title: '产品折扣',
              key: 'projectName',
            },
            {
              title: '有效期',
              key: 'projectName',
            },
          ],
          data: [],
          addF: false,
          addData: {

          },
        }
      },
      created() {

      },
      methods: {
        ok() {},
        mannger(data, i) {},
        del(data, i) {},
      },
    }
</script>

<style scoped>
  .list{
    padding: 10px;
  }
  .mod{
    line-height: 60px;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }
</style>
