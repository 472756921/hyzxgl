<template>
  <div class="list">
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
          { title: '价格', key: 'projectName',},
          { title: '有效期', key: 'projectName',},
          { title: '是否显示', key: 'projectName',},
          { title: '项目', key: 'projectName',},
          { title: '次数', key: 'projectName',},
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
        data: [],
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
