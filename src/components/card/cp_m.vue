<template>
  <div class="list">
    <h2 style="padding: .6rem;">产品卡管理</h2>
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" @on-ok="ok" class="mod">
      <div class='com'>购价：<Input style="width: 300px"></Input></div>
      <div class='com'>金额：<Input style="width: 300px"></Input></div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "cp_m",
    data() {
      return {
        columns: [
          { title: '购价', key: 'p',},
          { title: '金额', key: 'm',},
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
          {p: '300', m: '298'},
          {p: '420', m: '398'},
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
