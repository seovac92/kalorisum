<template>
  <div class="wrapper">
      <table class="table-nutritious">
        <thead>
          <tr class="row-1">
            <th class="column-1" colspan="2">
              Namirnica (100 g)
            </th>
            <th class="column-2" colspan="2">
              kCal
            </th>
            <th class="column-3" colspan="2">
              Vrsta
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="one in nutritious" :key="one.ntr_id">
            <td class="column-1" colspan="2">{{one.ntr_name}}</td>
            <td class="column-2" colspan="2">{{one.ntr_kcal}}</td>
            <td class="column-3" colspan="2">{{one.ntt_name}}</td>
          </tr>
        </tbody>
      </table>
      <div class="navigate-wrapper">
        <div class="btn-back-wrapper" @click="getPreviousTen()" v-if="currentPage">
          <font-awesome-icon class="btn-back" icon="fa-solid fa-angle-left" />  
        </div>
        <div class="btn-next-wrapper" @click="getNextTen()" v-if="nutritious.length===10">
          <font-awesome-icon class="btn-next" icon="fa-solid fa-angle-right" />
        </div>  
      </div>  
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return{
          nutritious:[],
          currentPage:null
        }
    },
    methods:{
        async getTenNutritious(){
          try {
              let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/getTenNutritious",{
                "page":0
              })
              this.nutritious=result.data.res.nutritious
              this.currentPage=result.data.res.page
          } catch (error) {
              console.log(error)
          }
        },
        async getNextTen(){
          try {
            let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/getTenNutritious",{
              "page":this.currentPage+10
            })
            this.nutritious=result.data.res.nutritious
            this.currentPage=result.data.res.page
          } catch (error) {
            console.log(error)
          }
        },
        async getPreviousTen(){
          try {
            let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/getTenNutritious",{
              "page":this.currentPage-10
            })
            this.nutritious=result.data.res.nutritious
            this.currentPage=result.data.res.page
          } catch (error) {
            console.log(error)
          }
        }
    },
    mounted(){
        this.getTenNutritious()
    }
}
</script>

<style scoped>
.table-nutritious{
  width: 100vw;
  margin: 20px 0;
  border-collapse: collapse;
}
.row-1{
  background-color: #212529;
  color: whitesmoke;
}
.column-1,.column-2,.column-3{
  width: 30vw;
  padding: 15px;
  font-size: 1.3em;
  overflow: hidden;
}
.row{
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.row .column-1{
  font-weight: 600;
  color: #5B5BE4;
}
.row .column-1:hover{
  color: #000;
}
.row:hover{
  background-color: #eee;
}
.navigate-wrapper{
  display: flex;
  width: 70px;
  margin: 0 auto;
  justify-content: space-between;
}
.btn-back-wrapper,
.btn-next-wrapper{
  padding: 5px;
  background-color: #5B5BE4;
  border-radius: 15px;
}
.btn-next-wrapper{
  margin-left: auto;
}
.btn-back,
.btn-next{
  font-size: 30px;
  color: whitesmoke;
}
@media screen and (min-width: 768px){
    .table-nutritious{
        width: 90%;
    }
}
@media screen and (min-width: 992px){
    .table-nutritious{
        width: 50%;
    }
}
@media screen and (min-width: 1200px){
    .table-nutritious{
        width: 35%;
    }
}
</style>