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
      名称：<Input v-model="p_names" placeholder="名称" style="width: 300px"></Input>
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
      const type = this.$route.params.type;
      this.getStatus(type);
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        p_names : '',
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
      getStatus(type) {
        if( type == 1 ) {
          this.card = '技术等级';
        }
        if( type == 2 ) {
          this.card = '行政等级';
        }
        if( type == 3 ) {
          this.card = '员工优先权';
        }
        if( type == 4 ) {
          this.card = '薪酬方式';
        }
      },
    }
  };
</script>

<style scoped>

</style>
