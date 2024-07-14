import {useDispatch, useSelector} from "react-redux";

const Page1 = () => {
    const {num} = useSelector((state:RootState) => ({
        num: state.num
    }))
    const dispatch = useDispatch();
    const Add = () => {
        dispatch({type: 'add', val: 10})
    }
    const Sub = () => {
        dispatch({type: 'sub', val: 10})
    }
    return (
        <div>
            <p>这是Page1页面内容</p>
            <p> num:{num}</p>
            <button onClick={()=>{Add()}}>增加10</button>
            <button onClick={()=>{Sub()}}>减少10</button>
        </div>

    )
}
export default Page1;
