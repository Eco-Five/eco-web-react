import 'react'
import Slide from './Slide';
import Category from './Category';
import MainProduct from './MainProduct';
import DataEnv from './DataEnv';


const Home = () => {
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