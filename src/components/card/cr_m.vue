<template>
    <div>
      <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    export default {
      name: "cr_m",
      data() {
        return {
          columns: [
            {
              title: '名称',
              key: 'projectName',
            },
            {
              title: '金额',
              key: 'projectName',
            },
            {
              title: '项目单次折扣',
              key: 'projectName',
            },
            {
              title: '产品折扣',
              key: 'projectName',
            },
            {
              title: '有效期',
              key: 'projectName',
            },
          ],
          data: [],
        }
      },
      created() {

      },
      methods: {},
    }
</script>

<style scoped>

</style>
