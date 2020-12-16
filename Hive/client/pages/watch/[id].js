import axios from 'axios';
import { useEffect, useState } from 'react';
import buildClient from '../../api/build-client';

const StreamPage = ({ currentUser, video, isliked, videocomments }) => {
  const url = `https://hive.dev/api/videos/${video.id}/stream`;
  const liked = { color: '#1a1a1a', backgroundColor: '#ffc107' };
  const unliked = { color: '#ffc107', border: '1px solid #ffc107' };
  var [like, setLike] = useState(isliked);
  var style = like ? liked : unliked;

  const sendLike = async (like) => {
    await axios.post(`/api/likes/${video.id}`, {
      like,
      id: currentUser.id,
    });
  };
  var [likes, setLikes] = useState(video.likes.length);
  const updateLikes = async () => {
    let { data } = await axios.get(`/api/videos/${video.id}`);
    return data.likes.length;
  };

  var [comments, setComments] = useState(videocomments);
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
        <h3>Likes: {likes}</h3>
        <button
          className="btn"
          style={style}
          onClick={async () => {
            setLike(!like);
            await sendLike(!like);
            setLikes(await updateLikes());
          }}
        >
          <h3>LIKE</h3>
        </button>
      </div>
      <div
        style={{
          margin: '5%',
          width: '50%',
          backgroundColor: '#ffc107',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          color: '#1a1a1a',
        }}
      ></div>
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
  if (video.likes.includes(data.currentUser.id)) {
    data.isliked = true;
  } else {
    data.isliked = false;
  }
  const commentsData = await client.get(`/api/comments/${video.id}`);
  const comments = commentsData.data;
  data.videocomments = comments;
  return data;
};

export default StreamPage;
