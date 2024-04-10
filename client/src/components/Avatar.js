import dummyAvatar from '../image/logo512.png'

const Avatar = () => {
  return ( 
    <div className="avatar">
      <img  src={dummyAvatar} alt="avatar" />
      <span className='shadow'></span>
    </div>
   );
}
 
export default Avatar;