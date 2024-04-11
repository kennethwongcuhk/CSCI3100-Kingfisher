import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import TweetPreview from "../components/TweetPreview"
import UserList from "../components/UserList"
// import NewTweet from "../components/NewTweet";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Link, NavLink, useNavigate } from 'react-router-dom';
  
const User = () => {
    const [ users, setUsers] = useState(null)
    const { user } = useAuthContext()
    const params = useParams();

    // console.log(params);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user/' , {
                headers: {
                'authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }



        if (user) {
            fetchUsers()
  
        }
    }, [params.username, user, params.id])


    const handleDelete = async (id) => {
        if (!user) {
            return
        }
        const response = await fetch('/api/user/' + id , {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            window.location.reload(false);
        }
    }



    return ( 
        <div className="allusers">
            {users && users.map((user) => (
                <div className="oneuser">
                    <div>
                        <div>_id: {user._id}</div>
                        <div>email: {user.email}</div>
                        <div>username:
                            <Link to={`/user/${user.username}`}>
                                <span> @{user.username}</span>
                            </Link>
                        </div>
                        <div>status: {user.isAdmin ? 'Admin' : 'Normal'}</div>
                    </div>
                    <button onClick={() =>{handleDelete(user._id)}}>Delete User</button>
                </div>
            ))}
        </div>
    );
}

export default User;