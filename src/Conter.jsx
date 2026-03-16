import { useState } from "react";
import Button from "./Button";

function Counter() {
    const [count, setCount] = useState(0)
    // const styled = { padding: "10px 20px", borderRadius: "10px" }
    // let count = 0

    const increment = () => {
        setCount(count + 1)
        // count++
        console.log(count + 1)

    }
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }

    }
    return (
        <div style={{ border: "thin solid red", margin: "auto", padding: '30px' }}>
            <p>{count}</p>

            <Button text="increment" calculate={increment} backgroundColor="green" />
            <Button text="Decrement" calculate={decrement} backgroundColor="red" />
            {/* <button onClick={increment} style={styled}>Increment</button>
            <button style={styled}>Decrement</button> */}
        </div>
    )
}

export default Counter