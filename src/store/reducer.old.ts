// 定义初始默认值
const defaultState= {
    num:20
}
let reducerOld = (state = defaultState, action:{type:string,val:number}) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'add':
            newState.num += action.val;
            break;
        case 'sub':
            newState.num -= action.val;
            break;
        default:
          break;
    }
    return newState
}
export default reducerOld
