<template>
  <div class="list">
    <h2 style="padding: .6rem;">疗程卡管理</h2>
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>价格：<Input style="width: 300px"></Input></div>
      <div class='com'>有效期：<Input style="width: 288px"></Input></div>
      <div class='com'>是否显示：
        <Select style="width:273px" :transfer=true>
          <Option>是</Option>
          <Option>否</Option>
        </Select>
      </div>
      <div class='com'>项目：
        <Select style="width:297px" :transfer=true>
          <Option>A</Option>
          <Option>B</Option>
        </Select>
      </div>
      <div class='com'>次数：<Input style="width: 300px"></Input></div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "lc_m",
    data() {
      return {
        columns: [
          { title: '价格', key: 'p',},
          { title: '有效期', key: 'd',},
          { title: '是否显示', key: 'sc',},
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
