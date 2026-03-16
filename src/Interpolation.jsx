function Interpolation() {
    // const name = 'Ayo'
    // const age = '29'
    const userInfo = {
        firstname: "Ayo",
        lastname: "John",
        age: 39,
        gender: 'male'

    }

    const users = [
        {
            firstname: "Ayo",
            lastname: "John",
            age: 39,
            gender: 'male'

        },
        {
            firstname: "bola",
            lastname: "bala",
            age: 10,
            gender: 'female'

        },
        {
            firstname: "Layo",
            lastname: "luff",
            age: 21,
            gender: 'male'

        }
    ]
    return (
        <div>
            <h1>React Interpolation</h1>
            <p>Name: {userInfo.age}</p>
            {/* <p>Age: {age}</p> */}
            <p>name: {userInfo.firstname} {userInfo.lastname}</p>
            <p>Age: {userInfo.age}</p>
            <p>Gender: {userInfo.gender}</p>

            <div>
                {users.map((user, i) => (
                    <div key={i}>
                        <p>{i + 1}</p>
                        <ul style={{
                            border: "thin solid black",
                            margin: "10px"
                        }} >

                            <li>{user.firstname}</li>
                            <li>{user.lastname}</li>
                            <li>{user.gender}</li>
                            <li>{user.age}</li>
                        </ul>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Interpolation