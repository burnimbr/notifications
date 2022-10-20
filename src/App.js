import { useEffect, useState } from 'react';
import './App.css';
import Post from './components/posts/Post';
import { api } from './api/api';

function App(props) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState();

  useEffect(() => {
    async function fetchData() {
      await api
        .get('/posts')
        .then(({ data }) => {
          setData(data);
          const unreadMessages = data.filter((post) => post.status === false);
          setUnreadMessages(unreadMessages.length);
        })
        .catch((err) => console.log(err))
        .finally(setLoading(false));
    }
    fetchData();
  }, [loading]);

  async function setAllReadPosts() {
    for (let i = 0; i < data.length; i++) {
      setLoading(true);
      await api

        .put(`posts/${data[i].id}`, { ...data[i], status: true })
        .then((res) => console.log(res.statusText))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }

  async function setUniqueReadPost(post) {
    setLoading(true);
    const { id, status } = post;
    const newStatus = status === true ? false : true;
    await api
      .put(`posts/${id}`, { ...post, status: newStatus })
      .then((res) => console.log(res.statusText))
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <div className="notification">
            <h3>Notifications</h3>
            <div className="square">
              {unreadMessages ? unreadMessages.toString() : 0}
            </div>
          </div>
          <div
            className="markRead"
            onClick={() => setAllReadPosts()}
            style={{ cursor: 'pointer' }}
          >
            Mark all as read
          </div>
        </div>
        <div className="posts">
          {data ? (
            data.map((post, i) => {
              return (
                <Post
                  key={i}
                  id={post.id}
                  avatar={post.avatar}
                  message={post.message}
                  name={post.name}
                  status={post.status}
                  time={post.time}
                  reply={post.reply}
                  replyImage={post.replyImage}
                  setUniqueReadPost={setUniqueReadPost}
                  linkItem={post.linkItem}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
