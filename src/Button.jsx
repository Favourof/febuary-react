import buttonStyle from "./button.module.css"
function Button(props) {
    return (
        <div className={buttonStyle.contain} >
            <button onClick={props.calculate} style={{ backgroundColor: props.backgroundColor, color: props.color }} className={buttonStyle.but}>{props.text}</button>
        </div>
    )
}

export default Button