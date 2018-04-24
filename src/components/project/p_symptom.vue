<template>
  <div>
    <h2 style="padding: .6rem;">症状管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :mask-closable="false" :title="store" @on-ok="ok">
      症状名称：<Input v-model="pis.problem" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      症状类型：<Select v-model="pis.symptomType" style="width:300px" :transfer=true>
      <Option value="1">身体类</Option>
      <Option value="2">面护类</Option>
    </Select>
      <br/>
      <br/>
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
          basicProgrammeIds: '',
          optimalScheme: '',
          optimalSchemeIds: '',
          schemeName:'',
        },
        columns: [
          {
            title: '症状名称',
            key: 'problem'
          },
          {
            title: '症状类型',
            key: 'symptomType',
            render: (h, params) => {
              return h('span', params.row.symptomType == '1' ? '身体类': '面护类')
            }
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
          basicProgrammeIds: '',
          optimalScheme: '',
          optimalSchemeIds: '',
          schemeName:'',
          enable: true,
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
          url: findproblemList() + '?id='+this.$route.params.id+'&page=' + page + '&pageSize=100',
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
          url: findProjectList()+'?id='+this.$route.params.id,
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
        if(this.pis.problem == ''||this.pis.symptomType=='' ){
          this.$Message.warning('请填写完整信息');
          return;
        }
        console.log(this.pis);
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
          this.$Message.error('操作失败');
        });
      },
      mannger(data) {
        this.pis = JSON.parse(JSON.stringify(data));
        this.storeFlag = true;
        this.store = '修改';
        console.log(this.pis);
      },
    }
  };
</script>

<style scoped>

</style>
