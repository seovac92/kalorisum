export default function checkDifferenceBetweenArrays(oldArray,newArray){
    if(oldArray.length===0){
      for(let i=0;i<newArray.length;i++){
        oldArray.push(newArray[i])
      }
      return
    }
    if(oldArray.length>newArray.length){
      for(let i=0;i<oldArray.length;i++){
        let existStatus
        for(let j=0;j<newArray.length;j++){
          if(oldArray[i].id===newArray[j].id){
            existStatus=true
            break
          }
          else{
            existStatus=false
          }
        }
        if(!existStatus){
          oldArray.splice(i,1)
          i--
        }
      }
      return
    }
    if(oldArray.length<newArray.length){
      for(let i=0;i<newArray.length;i++){
        let existStatus
        for(let j=0;j<oldArray.length;j++){
          if(newArray[i].id===oldArray[j].id){
            existStatus=true
            break
          }
          else{
            existStatus=false
          }
        }
        if(!existStatus){
          oldArray.push(newArray[i])
        }
      }
      return
    }
}