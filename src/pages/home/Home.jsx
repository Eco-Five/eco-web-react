import 'react'
import Slide from './Slide';
import Category from './Category';
import MainProduct from './MainProduct';
import DataEnv from './DataEnv';
import { useSelector } from 'react-redux';
// import Youtube from './Youtube';

const Home = () => {
    const userInfo = useSelector((state) => state.sessionInfo)
    console.log("userInfo: ", userInfo)

    return (
        <>
            <Slide />
            <Category />
            <MainProduct />
            <DataEnv />
            {/* <Youtube /> */}
        </>
    )
}

export default Home