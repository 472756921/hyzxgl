<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="3">
        <Button class="hy_btn" @click="got('m_index_set')">会员权益设置</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('c_index')">顾客管理</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="wait">卡项管理</Button>
      </Col>
      <Col span="3">
        <Dropdown @on-click=got>
          <Button class="hy_btn">
            项目管理
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="p_index">项目列表</DropdownItem>
            <DropdownItem name="p_symptom">症状方案管理</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('e_index')">员工管理</Button>
      </Col>
      <Col span="3">
      <Button class="hy_btn" @click="wait">薪资管理</Button>
      </Col>
      <Col span="3">
      <Button class="hy_btn" @click="wait">库存管理</Button>
      </Col>
      <Col span="3">
      <Button class="hy_btn" @click="got('t_index')">报表管理</Button>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 's_datile',
    created() {
      const m_id = this.$route.params.id;
    },
    methods: {
      got(path) {
        this.$router.push({name: path});
      },
      wait() {
        this.$Message.error('暂未开放，敬请期待');
      },
    },
  };
</script>

<style scoped>

</style>
