<template>
  <div class="list">
    <h2 style="padding: .6rem;">拓客卡管理</h2>
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>价格：<Input style="width: 300px"></Input></div>
      <div class='com'>是否计算业绩：<Input style="width: 300px"></Input></div>
      <div class='com'>是否计算实操：<Input style="width: 300px"></Input></div>
      <div class='com'>是否计算手工：<Input style="width: 275px"></Input></div>
      <div class='com'>有效期：<Input placeholder="单位月" style="width: 288px"></Input></div>
      <div class='com'>项目：
        <Select style="width:275px" :transfer=true>
          <Option>A</Option>
          <Option>B</Option>
        </Select>
      </div>
      <div class='com'>次数：<Input style="width: 300px"></Input></div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 每周销售 <Input style="width: 30px"/> 张，奖励 <Input style="width: 30px"/> 元</div>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
      name: "tk_m",
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
            {p: '300', d: "24", yj: '是', sc: '是', sg: '是', x: '足浴，美肤，嫩白', c: '8'},
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
