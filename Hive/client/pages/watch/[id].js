import axios from 'axios';
import { useEffect, useState } from 'react';
import buildClient from '../../api/build-client';

const StreamPage = ({ currentUser, video }) => {
  const url = `https://hive.dev/api/videos/${video.id}/stream`;
  const liked = { color: '#1a1a1a', backgroundColor: '#ffc107' };
  const unliked = { color: '#ffc107', border: '1px solid #ffc107' };
  var [like, setLike] = useState(false);
  var style = like ? liked : unliked;

  const sendLike = async (like) => {
    await axios.post(`/api/likes/${video.id}`, {
      like,
      id: currentUser.id,
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <video controls width="80%" style={{ marginBottom: '2%' }}>
        <source src={url} type="video/mp4"></source>
      </video>
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <p>Likes: {video.likes.length}</p>
        <button
          className="btn"
          style={style}
          onClick={() => {
            setLike(!like);
            sendLike(!like);
          }}
        >
          LIKE
        </button>
      </div>
    </div>
  );
};

StreamPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  if (data.currentUser == null) {
    context.res.writeHead(301, { Location: '/' });
    context.res.end();
  }
  const videoData = await client.get(`/api/videos/${context.query.id}`);
  const video = videoData.data;
  data.video = video;
  return data;
};

export default StreamPage;
