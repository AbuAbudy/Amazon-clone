import React, {useContext, useEffect} from 'react'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { useNavigate } from 'react-router-dom';

const protectedRoute = ({children, msg, redirect}) => {
    const [{user}, dispatch] = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/auth", {state: {msg, redirect}});
        }
    }, [user]) 

    return children;
}


export default protectedRoute
