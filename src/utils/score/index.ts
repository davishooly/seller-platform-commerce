export const calculateScore = ( value: string, type: string ) => {
    let score = 0;
    if(type === "description"){
     score  = ( value.split(' ')).length
    }
    return score >= 20
  };
