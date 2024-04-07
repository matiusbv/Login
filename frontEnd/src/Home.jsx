import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('')
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true)
                setName(res.data.name)
                
            } else {
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }, [])
    
    const handleLDelete = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            location.reload(true);
        }).catch(err => console.log(err));
    }

    return (
       <div className="container mt-4">
            {
                auth ?
                <div>
                    <h3>You are Atuhorized --- {name}</h3>
                    <button className="btn btn-danger" onClick={handleLDelete}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            }
       </div>
    )
}

export default Home