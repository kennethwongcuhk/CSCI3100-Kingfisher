import { useEffect, useState } from "react";
import { useTweetsContext } from "../hooks/useTweetsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Avatar from "../components/Avatar";


const NewTweet = () => {
  const { dispatch } = useTweetsContext()

  const [content, setContent] = useState('')
  // const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { user } = useAuthContext()

  
  useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      // setError('Please log in')
      return 
    }
    const tweet = {content}

    const response = await fetch('/api/tweets', {
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
      dispatch({type: 'CREATE_TWEET', payload: json})
      const textarea = document.querySelector("textarea");
      textarea.style.height = '19px';
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

  return ( 
    <div className="new-tweet">
      <div className="new-left">
        {/* <Avatar /> */}
      </div>
      <form className="create" onSubmit={handleSubmit}>
       
          <textarea
          type="text"
          placeholder="What is happening?!"
          onChange={(e) => {
            setContent(e.target.value)
            handleInput()
          }}
          value={content}
          className={emptyFields.includes('content') ? 'empty' : ''}
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

   );
}
 
export default NewTweet;