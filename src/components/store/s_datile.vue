<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="got('m_index_set')">会员权益设置</Button>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="got('m_index_info')">收集会员信息</Button>
      </Col>
      <Col span="2">
        <Dropdown @on-click="got2">
          <Button class="hy_btn">
            项目管理
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">疗程卡</DropdownItem>
            <DropdownItem name="2">疗程组合卡</DropdownItem>
            <DropdownItem name="3">拓客卡</DropdownItem>
            <DropdownItem name="4">体验卡</DropdownItem>
            <DropdownItem name="5">产品卡</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="got('c_index')">客户管理</Button>
      </Col>
      <Col span="2">
        <Dropdown @on-click="got3">
          <Button class="hy_btn">
            员工管理
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">技术等级</DropdownItem>
            <DropdownItem name="2">行政等级</DropdownItem>
            <DropdownItem name="3">员工优先权</DropdownItem>
            <DropdownItem name="4">薪酬方式</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      got2(path) {
        const pa = this.$route.name;
        if(pa != 'p_index') {
          this.$router.push({path: 'p_index/' + path});
        } else {
          this.$router.push({path: '../p_index/' + path});
        }
      },
      got3(path) {
        const pa = this.$route.name;
        if(pa != 'e_index') {
          this.$router.push({path: 'e_index/' + path});
        } else {
          this.$router.push({path: '../e_index/' + path});
        }
      },
    },
  };
</script>

<style scoped>

</style>
