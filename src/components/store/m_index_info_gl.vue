<template>
    <div>
      <Row :gutter="24" class="option">
        <Col span="2">
         <Button class="hy_btn" @click="newEm">新建</Button>
        </Col>
      </Row>

      <Table :columns="columns" :data="data"></Table>

      <Modal  v-model="storeFlag" :title="store" @on-ok="ok">
        收集：<Input v-model="sjxx" placeholder="收集信息" style="width: 300px"></Input>
      </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm_index_info_gl',
    data() {
      return {
        storeFlag: false,
        store: '添加条目',
        sjxx: '',
        columns: [
          {
            title: '序号',
            key: 'list'
          },
          {
            title: '收集条目',
            key: 'item'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('Button', {
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
              }, '修改');
            }
          }
        ],
        data: [
          {
            list: 1,
            item: '星座',
          },
          {
            list: 2,
            item: '爱好',
          },
        ],
      };
    },
    methods: {
      ok() {},
      mannger(data) {
        this.storeFlag = true;
        this.sjxx = data.item;
        this.store = '修改条目';
      },
      newEm(data) {
        this.storeFlag = true;
        this.sjxx = '';
        this.store = '新建条目';
      },
    }
  };
</script>

<style scoped>

</style>
