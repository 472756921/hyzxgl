<template>
  <div class="sa4">
    <h3>{{this.manualFee == true ? '已启用':'未启用'}}</h3>
  </div>
</template>

<script>
  export default{
    name: 'sa4',
    data(){
      return{
        manualFee: '',
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore()+'?id='+this.$route.params.id,
        }).then( (res) =>{
          this.manualFee = res.data.manualFee;
        }).catch( (error) =>{

        })
      },
    }
  }
</script>
<style scoped>
  .btn{
    margin: 10px 0 20px 0;
  }
  .sa3{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
