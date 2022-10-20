import { styles } from './style';
import './style.css';

function Post(props) {
  const {
    id,
    reply,
    replyImage,
    status,
    avatar,
    name,
    message,
    setUniqueReadPost,
    time,
    linkItem,
  } = props;
  const statusStyle = status ? styles.readPost : styles.unreadPost;

  return (
    <div
      className="post"
      onClick={() => setUniqueReadPost(props)}
      style={statusStyle}
    >
      <div className="avatar">
        <img
          src={avatar}
          width={50}
          height={50}
          className="imageAvatar"
          alt="Profile "
        />
      </div>
      <div className="contentPost">
        <div className="message">
          <a href="/" alt="Link de acesso ">
            {name}{' '}
          </a>
          {message}
          <a href="/" alt="Link de acesso ">
            {linkItem}
          </a>
          <div>{time} </div>
        </div>
        <div>
          {replyImage ? (
            <img src={replyImage} width={50} height={50} alt="Reply " />
          ) : (
            <></>
          )}
        </div>
        <div className="details"></div>
      </div>
      {reply ? <div className="reply">{reply}</div> : <></>}
    </div>
  );
}

export default Post;
