import  React from "react"
import Landing from "../../components/Landing";
import {RouteComponentProps} from "@reach/router";

const Home: React.FC<RouteComponentProps> = () => {
    return (
        <div>
            <Landing />
        </div>
    )
};


export default Home
