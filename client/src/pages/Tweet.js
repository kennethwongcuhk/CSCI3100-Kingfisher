import { useEffect, useState } from "react";
import { useTweetsContext } from "../hooks/useTweetsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import TweetOperation from "../components/TweetOperation";
import Avatar from "../components/Avatar";

const Tweet = () => {
  const { dispatch } = useTweetsContext();
  const { user } = useAuthContext()
  const params = useParams();
  const [tweet, setTweet] = useState(null)
  const [comments, setComments] = useState(null)
  const navigate = useNavigate();
  const [content, setContent] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await fetch('/api/tweets/'+params.id, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      setTweet(json);
      // console.log(json);

      if (response.ok) {
        setTweet(json);
      }
    }
    const fetchComments = async () => {
      const response = await fetch('/api/comment/tweet/'+params.id, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      setComments(json);
      // console.log(json);

      if (response.ok) {
        setComments(json);
      }
    }


    if (user) {
      fetchTweet()
      fetchComments()
    }
    // const textarea = document.querySelector("textarea");
    // textarea.style.height = 'auto';
    // textarea.style.height = textarea.scrollHeight + 'px';
  }, [params.id, user])



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      // setError('Please log in')
      return 
    }
    const tweet = {content}

    const response = await fetch('/api/comment/' + params.id, {
      method: 'POST',
      body: JSON.stringify(tweet),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      // setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      // setError(null)
      setContent('')
      setEmptyFields([])
      const textarea = document.querySelector("textarea");
      textarea.style.height = '19px';
      window.location.reload(false);
    }
  }

  const handleInput = () => {
    const textarea = document.querySelector("textarea");
    textarea.addEventListener('input', autoResize);
    function autoResize() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    }
  }

  const handleClick = async () => {
    if (!user) {
      return 
    }
    if (!window.confirm('delete?' + tweet.tweet.content.substring(0, 20))) {
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
      navigate("/");
    }
  }

  return ( 

      tweet && 
      (<div className="tweet">
        
        <div className="tweet-header">
          <Link to={`/user/${tweet.tweet.username}`}>
            {/* <Avatar/> */}
          </Link>
          <div className="tweet-info">
            {/* <span>Username</span> */}
            <Link to={`/user/${tweet.tweet.username}`}>
              <span>@{tweet.tweet.username}</span>
            </Link>
          </div>  
          <div className="delete-button">
            {(user.username === tweet.tweet.username || user.isAdmin) && (<span><i onClick={handleClick} className="bi bi-trash"></i></span>)}
          </div>
        </div>
        <div className="tweet-content">
          <p>{tweet.tweet.content}</p>
        </div>
        <Link className="time" to={`/tweet/${tweet.tweet._id}`}>
          <span className="time">{format(new Date(tweet.tweet.createdAt), 'K:m aa · MMM dd, yyyy')}</span>
        </Link>
        <TweetOperation tweet={params.id} token={user.token} likes={tweet.likes} dislikes={tweet.dislikes} retweets={tweet.retweets} comments={tweet.comments}/>
        <div className="new-tweet">
            <div className="new-left">
              {/* <Avatar /> */}
            </div>
            <form className="create" onSubmit={handleSubmit}>
            
                <textarea
                type="text"
                placeholder="Say something!"
                onChange={(e) => {
                  setContent(e.target.value)
                  handleInput()
                }}
                value={content}
                className={''}
                rows={1}
                maxLength={500}
                />
              
              <div className="buttons">          
                {/* <i className="bi bi-image"></i> */}
                {/* <i className="bi bi-0-circle"></i> */}
                <button disabled={!!!content}>Tweet</button>
              </div>
              {/* {error && <div className="error">{error}</div>} */}
            </form>
          </div>
        <div className="comments">
        {comments ? comments.map((comment) => (
          <div className="comment-header">
          <Link to={`/user/${tweet.tweet.username}`}>
            {/* <Avatar/> */}
          </Link>
          <div className="tweet-info">
            {/* <span>Username</span> */}
            <Link to={`/user/${comment.username}`}>
              <span>@{comment.username}</span>
            </Link>
          </div>

          <div className="tweet-content">
            <p>{comment.content}</p>
          </div>
        </div>
          
        )) : <div>No tweet yet</div>}
        </div>
      </div>)

   );
}
 
export default Tweet;