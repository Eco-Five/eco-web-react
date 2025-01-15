import 'react'
import Slide from './Slide';
import Category from './Category';
import MainProduct from './MainProduct';
import DataEnv from './DataEnv';
import Youtube from './Youtube';

const Home = () => {
    return (
        <>
            <Slide />
            <Category />
            <MainProduct />
            <DataEnv />
            <Youtube />
        </>
    )
}

export default Home