import React, {useEffect} from "react"
import Landing from "components/Landing";
import {RouteComponentProps} from "@reach/router";
import {useDispatch} from "react-redux";
import { useProducts} from "state/product";

const Home: React.FC<RouteComponentProps> = () => {

    const user = useProducts();

    return (
        <div>
            <Landing />
        </div>
    )
};


export default Home
