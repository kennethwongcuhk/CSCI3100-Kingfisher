import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import TweetPreview from "../components/TweetPreview"
import UserList from "../components/UserList"
// import NewTweet from "../components/NewTweet";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const User = () => {
  const [tweets, setTweets] = useState(null)
  const { user } = useAuthContext()
  const params = useParams();
  const [ userInfo, setUserInfo ] = useState(null)
  const [follower, setFollower] = useState(null)
  const [following, setFollowing] = useState(null)
  // console.log(params);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user/info/' + params.username, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setUserInfo(json)
      }
    }

    const fetchTweets = async () => {
      const response = await fetch('/api/tweets/user/' + params.username , {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        // console.log(json);
        setTweets(json)
      }
    }


    const fetchFollower = async () => {
      const response = await fetch('/api/relation/follower/' + params.username, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setFollower(json)
      }
    }

    const fetchFollowing = async () => {
      const response = await fetch('/api/relation/following/' + params.username, {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setFollowing(json)
      }
    }



    if (user) {
      fetchUser()
      fetchTweets()
      fetchFollower()
      fetchFollowing()
    }
  }, [params.username, user, params.id])


  const handleFollow = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/relation/follow/' + params.username, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      window.location.reload(false);
    }
  }
  
  const handleUnfollow = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/relation/unfollow/' + params.username, {
      method: 'POST',
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
    <div className="user">
      <div className="user-info">

          <div>
          <h3>@{params.username}</h3>
          {userInfo &&<p>Follower:{userInfo.follower}</p>}
          {follower && follower.map((user) => (
            <UserList user={user}/>
          ))}
          {userInfo &&<p>Following:{userInfo.following}</p>}
          {following && following.map((user) => (
            <UserList user={user}/>
          ))}
          </div>
          <button onClick={handleFollow}>Follow</button>
          <button onClick={handleUnfollow}>Unfollow</button>

      </div>
      <div className="tweets">
        {userInfo &&<h4>All tweets by @{params.username}</h4>}
        {!userInfo && <p>This user does not exist</p>}
        {tweets && tweets.map((tweet) => (
          <TweetPreview key={tweet._id} tweet={tweet}/>
        ))}
      </div>
      {/* <NewTweet /> */}
    </div>
   );
}
 
export default User;