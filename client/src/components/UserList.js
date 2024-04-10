import { Link, useNavigate } from "react-router-dom";

const UserList = ({user}) => {
    return (
        <span className="tweet-info">
        <Link to={`/user/${user.username}`}>
          <span>@{user.username}</span>
        </Link>
        </span>
    )
}

export default UserList;