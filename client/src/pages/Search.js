import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import TweetPreview from "../components/TweetPreview"
import UserList from "../components/UserList"
// import NewTweet from "../components/NewTweet";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Link, NavLink, useNavigate } from 'react-router-dom';
  
const Search = () => {
    const [ users, setUsers] = useState(null)
    const { user } = useAuthContext()
    const params = useParams();
    const [ query, setQuery] = useState("");

    // console.log(params);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user/search' , {
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

    const getFilteredUsers = (query, users) => {
        if (!query) {
            return users;
        }
        return users.filter(user => user.username.includes(query));
    } 

    const filteredUsers = getFilteredUsers(query, users);



    return ( 
        <div className="allusers">
            <input className="searchbar" type="text" onChange={e => setQuery(e.target.value)}></input>
            {filteredUsers && filteredUsers.map((user) => (
                <div className="oneuser">
                    <div>
                        <div>
                            <Link to={`/user/${user.username}`}>
                                <span> @{user.username}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Search;