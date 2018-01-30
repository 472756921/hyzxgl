<template>
  <div class="list">
    <h2 style="padding: .6rem;">活动卡管理</h2>
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>价格：<Input style="width: 300px"></Input></div>
      <div class='com'>活动有效期：<Input style="width: 264px"></Input></div>
      <div class='com'>卡有效期：<Input style="width: 276px"></Input></div>
      <div class='group'>
        <h3>返现优惠</h3>
        <div class='com'>返现方式：
          <Select style="width:264px" :transfer=true>
            <Option>卡扣项目</Option>
            <Option>现金项目</Option>
            <Option>产品</Option>
          </Select>
        </div>
        <div class='com'>返现金额：<Input style="width: 268px" placeholder="单位月" ></Input></div>
        <div class='com'>有效期：<Input style="width: 280px"></Input></div>
      </div>
      <div class='group'>
        <h3>特价秒杀</h3>
        <div class='com'>秒杀项目：
          <Select style="width:264px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>套数：<Input style="width: 291px" placeholder="单位月" ></Input></div>
        <div class='com'>秒杀价格：<Input style="width: 268px"></Input></div>
      </div>
      <div class='group'>
        <h3>到店赠送</h3>
        <div class='com'>触发机制：第 <Input style="width: 30px"/> 次到店</div>
        <div class='com'>赠送项目：
          <Select style="width:270px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>赠送次数：<Input style="width: 273px"></Input></div>
      </div>
      <div class='group'>
        <h3>享受尊享</h3>
        <div class='com'>尊享项目：
          <Select style="width:270px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>尊享有效期：<Input style="width: 262px"></Input></div>
        <div class='com'>尊享次数：<Input style="width: 275px"></Input></div>
      </div>
      <div class='group'>
        <h3>老带新</h3>
        <div class='com'>赠送项目：
          <Select style="width:275px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>赠送次数：<Input style="width: 278px"></Input></div>
      </div>
      <div class='group'>
        <h3>产品秒杀</h3>
        <div class='com'>产品：
          <Select style="width:305px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
        <div class='com'>现金秒杀价格：<Input style="width: 260px"></Input></div>
        <div class='com'>卡扣秒杀价格：<Input style="width: 260px"></Input></div>
      </div>
      <div class='group'>
        <h3>隐藏显示</h3>
        <div class='com'>疗程组合卡：
          <Select style="width:275px" :transfer=true>
            <Option>A</Option>
            <Option>B</Option>
            <Option>C</Option>
          </Select>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "hd_m",
    data() {
      return {
        columns: [
          { title: '价格', key: 'p',},
          { title: '有效期', key: 'd',},
          { title: '是否计算业绩', key: 'yj',},
          { title: '是否计算实操', key: 'sc',},
          { title: '是否计算手工', key: 'sg',},
          { title: '项目', key: 'x',},
          { title: '次数', key: 'c',},
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mannger(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.del(params.row, params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        data: [
          {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤', c: '2'},
          {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤', c: '8'},
        ],
        addF: false,
      }
    },
    methods: {
      ok() {},
      mannger(data, i) {},
      del(data, i) {},
    }
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
