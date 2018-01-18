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
      方案名称：<Input v-model="pis.projectName" placeholder="方案名称" style="width: 300px"/>
      <br/>
      <br/>
      基础解决方案：<Input v-model="pis.frequency" placeholder="基础解决方案" style="width: 300px"/>
      <br/>
      <br/>
      最优解决方案：<Input v-model="pis.intervalTime" placeholder="最优解决方案" style="width: 300px"/>
      <br/>
      <br/>
      症状：<Input v-model="pis.courseMoney" placeholder="症状" style="width: 300px"/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectsave} from '../../interface';

  export default {
    name: 'p_program',
    created() {
      this.getList();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        pis: {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
        },
        columns: [
          {
            title: '方案名称',
            key: 'projectName'
          },
          {
            title: '基础解决方案',
            key: 'frequency'
          },
          {
            title: '最优解决方案',
            key: 'intervalTime'
          },
          {
            title: '症状',
            key: 'courseMoney'
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
        data: [],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          projectName:'',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          p_zsxm : '',
          p_pzzx : '',
          p_xjq : '',
          p_jsfl : '',
          p_xffl : '',
        };
      },
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList(),
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      ok() {
        let URL = projectsave();
        if( this.store == '修改') {
          URL = projectedit();
        };
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.pis,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
        }).catch((error) => {
        });
      },
      mannger(data) {
        this.pis = data;
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>

</style>
