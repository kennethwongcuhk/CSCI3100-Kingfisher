import { useEffect } from "react";
import { useTweetsContext } from "../hooks/useTweetsContext"
import { useAuthContext } from "../hooks/useAuthContext";
// components
import TweetPreview from "../components/TweetPreview"
import NewTweet from "../components/NewTweet";

const Home = () => {
  const { tweets, dispatch } = useTweetsContext()
  const { user } = useAuthContext()

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('/api/tweets/recommended', {
        headers: {
          'authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.statusText === 'Unauthorized') {
        alert('Please log in again')
      }
      if (response.ok) {
        dispatch({type: 'SET_TWEETS', payload: json})
      }
    }

    if (user) {
      fetchTweets()
    }
  }, [dispatch, user])

  return ( 
    <div className="home">
      <div className="following">
        <span>Following</span>
        <span className="scroll"><i onClick={goToTop} className="bi bi-arrow-up"></i></span>
      </div>
      <div className="tweets">
      <NewTweet />
        {tweets ? tweets.map((tweet) => (
          <TweetPreview key={tweet._id} tweet={tweet}/>
          
        )) : <div>No tweet yet</div>}
      </div>
    </div>
   );
}
 
export default Home;