import React from 'react'

export const TodoList = (props) => {
    return (
        <div>
            <ul>
                {props.todoList.map((todo, i) => (
                    <li key={i}>{todo}</li>
                ))}
            </ul>
        </div>
    )
}
