const TweetOperation = ({ tweet, token, likes, dislikes, retweets, comments }) => {
  const handleLike = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/reaction/like/' + tweet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      window.location.reload(false);
    }
  }
  const handleDislike = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/reaction/dislike/' + tweet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      window.location.reload(false);
    }
  }
  const handleRetweet = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/retweet/' + tweet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      window.location.reload(false);
    }
  }
  return (
    <div className="tweet-operation">
      <span className="left-operation">
        <span className="comment">
          <i className="bi bi-chat"></i>
          <span> {comments}</span>
        </span>
        <span className="retweet">
          <i className="bi bi-reply" onClick={handleRetweet}></i>
          <span> {retweets}</span>
        </span>
        <span className="like">
          <i className="bi bi-hand-thumbs-down" onClick={handleDislike}></i>
          <span> {likes - dislikes} </span>
          <i className="bi bi-hand-thumbs-up" onClick={handleLike}></i>
        </span>
      </span>
    </div>
  );
}

export default TweetOperation;