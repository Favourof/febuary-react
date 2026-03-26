import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { publicIntance } from '../api/api';


export const Product = () => {
    const [product, setProduct] = useState(null);
    const [monitor, setMonitor] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()


    const fetchProduct = async () => {
        setLoading(true)
        try {
            const res = await publicIntance.get("/product")
            console.log(res.data);



            if (res) {
                setProduct(res.data?.product)
                console.log(product);


            }
        } catch (error) {
            setProduct(null)
            setErrorMessage("failed to fetch product")
            console.log(error);

        } finally {
            setLoading(false)
        }





    }

    useEffect(() => {
        fetchProduct()
    }, [monitor])
    return (
        <div>Product
            <h1>This is our Product page</h1>

            {loading && <p>Product is loading......</p>}

            {errorMessage && !loading && !product && <h1>{errorMessage}</h1>}
            {!product && !loading && <button onClick={() => setMonitor(!monitor)} >Refetch PRoduct</button>}


            {product && product.length > 0 && <div>
                {product.map((item, i) => (

                    <ul style={{ border: "thin solid black", margin: "20px", padding: "20px" }} key={i}>
                        <li>{item.title}</li>
                        <li>{item.description.slice(0, 110)}</li>
                        <li><img src={item.image} alt="" width={200} height={200} /></li>
                        <button onClick={() => navigate(`/productDetail/${item._id}`)} style={{ marginLeft: "20px", padding: "20px" }}>more details</button>
                    </ul>


                ))}

            </div>}
        </div>
    )
}
