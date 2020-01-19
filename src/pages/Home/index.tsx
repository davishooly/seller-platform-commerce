import React, {useEffect} from "react"
import Landing from "components/Landing";
import {useDispatch} from "react-redux";
import { useProducts} from "state/product";

const Home: React.FC<any> = () => {

    const user = useProducts();

    return (
        <div>
            <Landing />
        </div>
    )
};


export default Home
