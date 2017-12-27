<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建{{card}}</Button>
      </Col>
    </Row>
    <h3 style="text-align: center;padding: .6rem;">{{card}}</h3>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :title="store" @on-ok="ok">
      <div class="com">
        岗位名称：<Input v-model="p_names" placeholder="岗位名称" style="width: 300px"/>
      </div>
      <div class="com">
        岗位职责：<Input v-model="p_dat" placeholder="岗位职责" style="width: 300px"/>
      </div>
      <div class="com">
        工作流程：<Input v-model="p_dat" placeholder="工作流程" style="width: 300px"/>
      </div>
      <div class="com">
        行为绩效与评分：<Input v-model="p_dat" placeholder="行为绩效与评分" style="width: 264px"/>
      </div>
      <div class="com">
        技术考核：<Input v-model="p_dat" placeholder="技术考核" style="width: 300px"/>
      </div>
      <br/>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'e_index',
    watch:{
      '$route' (to, from) {
        this.getStatus(this.$route.params.type);
      }
    },
    created() {
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        p_names : '',
        p_dat : '',
        id : '',
        columns: [
          {
            title: '序号',
            key: 'id',
          },
          {
            title: '名称',
            key: 'p_names',
          },
          {
            title: '职责',
            key: 'p_jj',
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
            id: 12138,
            p_names: '测试',
          },
          {
            id: 12138,
            p_names: '测试',
          },
        ]
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.p_names = '';
        this.id = '';
      },
      ok() {},
      mannger(data) {
        this.p_names = data.p_names;
        this.id = data.id;
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>
  .com{
    margin: 10px 0;
  }
</style>
