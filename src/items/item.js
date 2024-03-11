export default function Item(props){

    if(props.owner == "user"){
        return <>
            X
        </>
    }else{
        return <>
            O
        </>
    }
    
}