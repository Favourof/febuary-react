import { useState } from "react";
import Button from "./Button";
import { TodoList } from "./TodoList";


function InputValue() {
    const [value, setValue] = useState();
    const [todoArray, setTodoArray] = useState([]);


    // const handleInput = (e) => {
    //     setValue(e.target.value)
    //     // console.log("The input value", value);

    // }

    const displayInput = () => {
        if (!value) return
        setTodoArray(() => [...todoArray, value])
        setValue('')
        // todoArray.push(value)
        console.log(todoArray);

    }

    return (
        <>
            <h1>Input value</h1>
            <input style={{ border: "thin solid black", width: "30%", padding: "20px" }} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <Button text="submit" calculate={displayInput} />

            <TodoList todoList={todoArray} />

        </>
    )
}

export default InputValue