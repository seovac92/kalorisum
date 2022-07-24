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
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            nutritious:[]
        }
    },
    methods:{//NASTAVITI SA STILIZACIJOM TABELE I FUNKCIONALNOSTI...PRVO MOBILNI!!!
        async getTenNutritious(){
            try {
                let result= await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/getTenNutritious")
                this.nutritious=result.data.res
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
    margin: 20px auto;
    border-collapse: collapse;
}
.row-1{
    background-color: #212529;
    color: whitesmoke;
}
.column-1,.column-2,.column-3{
    width: 33%;
    padding: 15px;
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
</style>