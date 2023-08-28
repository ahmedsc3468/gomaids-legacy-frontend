const initialState=[];

const openChat=(state=initialState,action)=>{

switch(action.type){
    
case "OpenChat": 

return [action.payload];
default:return state;
}

}

export default openChat;