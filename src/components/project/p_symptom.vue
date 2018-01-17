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
      症状名称：<Input v-model="pis.problem" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      症状类型：<Input v-model="pis.symptomType" placeholder="症状类型" style="width: 300px"/>
      <br/>
      <br/>
      处理细节：<Input v-model="pis.handlingDetails" placeholder="处理细节" style="width: 300px"/>
      <br/>
      <br/>
      基础方案：
      <Select v-model="pis.basicProgrammeIds" multiple style="width:260px">
        <Option v-for="item in prds" :value="item.id" :key="item.id">{{ item.projectName }}</Option>
      </Select>
      <br/>
      <br/>
      最优方案：
      <Select v-model="pis.optimalSchemeIds" multiple style="width:260px">
        <Option v-for="item in prds" :value="item.id" :key="item.id">{{ item.projectName }}</Option>
      </Select>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findproblemList, findProjectList, saveproblem, editproblem, deleteproblem} from '../../interface';

  export default {
    name: 'p_symptom',
    created() {
      this.getList(1);
      this.findProjectList(1);
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        pis: {
          id: '',
          storeId:this.$route.params.id,
          problem : '',
          symptomType: '',
          enable: '',
          handlingDetails : '',
          basicProgramme: '',
          basicProgrammeIds: [],
          optimalScheme: '',
          optimalSchemeIds: [],
        },
        columns: [
          {
            title: '症状名称',
            key: 'problem'
          },
          {
            title: '症状类型',
            key: 'symptomType'
          },
          {
            title: '处理细节',
            key: 'handlingDetails'
          },
          {
            title: '基础方案',
            key: 'basicProgramme'
          },
          {
            title: '最优方案',
            key: 'optimalScheme'
          },
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
        prds: [],
        data: [],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          id: '',
          storeId: this.$route.params.id,
          problem : '',
          symptomType: '',
          enable: '',
          handlingDetails : '',
          basicProgramme: '',
          basicProgrammeIds: [],
          optimalScheme: '',
          optimalSchemeIds: [],
        };

      },
      del(data, i) {
        let mess = confirm('确认删除？');
        if (mess) {
          this.$ajax({
            method: 'GET',
            url:deleteproblem()+"?id=" + data.id,
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
          }).then((res) => {
            this.data.splice(i, 1);
            this.$Message.success('删除成功');
          }).catch((error) => {
            this.$Message.error('删除失败');
          });
        }
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findproblemList() + '?page=' + page + '&pageSize=100',
        }).then((res) => {
          this.data = res.data;
        }).catch((error) => {
        });
      },
      findProjectList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList(),
        }).then((res) => {
          this.prds = res.data.results;
        }).catch((error) => {
        });
      },
      ok() {
        let URL = saveproblem();
        if( this.store == '修改') {
          URL = editproblem();
        };
        this.pis.basicProgrammeIds = this.pis.basicProgrammeIds.toString();
        this.pis.optimalSchemeIds = this.pis.optimalSchemeIds.toString();
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
          this.getList(1);
        }).catch((error) => {
        });
      },
      mannger(data) {
        this.pis = data;
        if (typeof data.basicProgrammeIds == 'string') {
          this.pis.basicProgrammeIds = data.basicProgrammeIds.split(',').map( (it, i) => {return +it});
          this.pis.optimalSchemeIds = data.optimalSchemeIds.split(',').map( (it, i) => {return +it});
        }
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>

</style>
