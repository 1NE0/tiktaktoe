export default function Item(props){

    if(props.owner == "user"){
        return <div className="item-user">
            <span>X</span>
        </div>;
    }else{
        return <div className="item-cpu">
            <span>O</span>
        </div>
    }
    
}