import { Link, useNavigate } from "react-router-dom";
import { useTweetsContext } from "../hooks/useTweetsContext";
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import Avatar from "./Avatar";
import TweetOperation from "./TweetOperation";

const TweetPreview = ({ tweet }) => {
  const { dispatch } = useTweetsContext();
  const { user } = useAuthContext()
  // console.log(user);
  const navigate = useNavigate();


  const handleClick = async () => {
    if (!user) {
      return
    }
    if (!window.confirm('delete?' + tweet.content.substring(0, 20))) {
      return
    }
    const response = await fetch('/api/tweets/' + tweet._id, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TWEET', payload: json })
    }
  }
  // console.log(tweet);
  return (
    <div className="tweet-preview" key={tweet._id} >
      <div className="preview-left">
          <Link to={`/user/${tweet.username}`}>
            {/* <Avatar/> */}
          </Link>
      </div>
      <div className="preview-middle">
        <div className="tweet-info">
          <Link to={`/user/${tweet.username}`}>
            <span>@{tweet.username}</span>
          </Link>
          <span className="seperator">·</span>
          <Link to={`/tweet/${tweet._id}`}>
            <span className="time">{formatDistanceToNowStrict(new Date(tweet.createdAt))}</span>
          </Link>
          <div className="delete-button">
            {(user.username === tweet.username || !!!user.isAdmin) && (<span><i onClick={handleClick} className="bi bi-trash"></i></span>)}
          </div>
        </div>
        <div className="tweet-content"
          onClick={(e) => {
            e.preventDefault()
            const selection = window.getSelection();
            // console.log(selection);
            if (selection.type !== 'Range') {
              navigate(`/tweet/${tweet._id}`)
            }
          }}
        >
        <p>{tweet.content.length < 500 ? tweet.content : tweet.content.substring(0, 500) + ' ...'}</p>
        {/* <TweetOperation /> */}

        </div>

      </div>



      
    </div>

  );
}

export default TweetPreview;