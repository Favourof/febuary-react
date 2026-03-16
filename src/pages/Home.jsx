import React, { useEffect, useState } from 'react'

export const Home = () => {
    // intail rendering
    const [count, setCount] = useState(1);
    useEffect(() => {
        console.log('Home render');

    }, [])

    // state rendering
    useEffect(() => {
        console.log('hello use dependency array to monitor');

    }, [count])


    // unmounted effect with empty array
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         console.log("Timer", "unmounted effect with empty array");
    //         // setCount(count + 1)


    //     }, 1000);

    //     return (() => {
    //         clearInterval(timer)
    //     })
    // }, [])

    // unmounted effect without empty array 
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         console.log("Timer", " unmounted effect without empty array ");
    //         setCount(count + 1)


    //     }, 1000);

    //     return (() => {
    //         clearInterval(timer)
    //     })
    // })



    return (
        <div>Home
            <h1>This is our home page</h1>
            <p>Count {count}</p>
            <button onClick={() => setCount(count + 1)}>increase</button>
        </div>
    )
}
