export const firebaseLooper=(snapshot)=>{
    const data = [];

    snapshot.forEach((childsnapshop)=>{
        data.push({
            ...childsnapshop.val(),
            id:childsnapshop.key
        });
    });
    return data;
}

export const reverseArray =(actualArray)=>{

    let reverseArray = [];

    for(let i=actualArray.length-1;i>=0;i--){
        reverseArray.push(actualArray[i]);
    }
    return reverseArray;

}