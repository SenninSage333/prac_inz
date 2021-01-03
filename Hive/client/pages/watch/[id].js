import axios from 'axios';
import { useState } from 'react';
import buildClient from '../../api/build-client';

const StreamPage = ({ currentUser, video, isliked, videocomments }) => {
  const createComments = (comments) => {
    return comments.map((comment) => {
      let deleteButton = null;
      if (comment.useremail === currentUser.email) {
        deleteButton = (
          <button
            className="btn btn-danger"
            onClick={(event) => {
              event.preventDefault();
              removeComment(comment.id, video.id);
            }}
          >
            Delete
          </button>
        );
      }
      return (
        <div
          key={comment.id}
          style={{
            width: '100%',
            margin: '1%',
            padding: '1%',
            backgroundColor: '#ffc107',
            borderRadius: '5px',
            fontSize: 'large',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {deleteButton}
          <span style={{ fontSize: 'x-small' }}>{comment.date}</span>
          <h2>{comment.useremail}</h2>
          <span>{comment.content}</span>
        </div>
      );
    });
  };

  const url = `https://hive.dev/api/videos/${video.id}/stream`;

  const liked = { color: '#1a1a1a', backgroundColor: '#ffc107' };

  const unliked = { color: '#ffc107', border: '1px solid #ffc107' };

  var [like, setLike] = useState(isliked);

  var style = like ? liked : unliked;

  const sendLike = async (like) => {
    await axios.post(`/api/likes/${video.id}`, {
      like,
      email: currentUser.email,
    });
  };

  var [likes, setLikes] = useState(video.likes.length);

  const updateLikes = async () => {
    let { data } = await axios.get(`/api/videos/${video.id}`);
    return data.likes.length;
  };

  var [comments, setComments] = useState(createComments(videocomments));

  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setContent('');
    let date = new Date().toUTCString();
    const comment = {
      videoid: video.id,
      useremail: currentUser.email,
      content,
      date,
    };
    await axios.post('/api/comments/add/', comment);
    let { data } = await axios.get(`/api/comments/${video.id}`);
    setComments(createComments(data));
  };

  const removeComment = async (commentid, videoid) => {
    await axios.post(`/api/comments/remove/${commentid}`);
    const { data } = await axios.get(`/api/comments/${videoid}`);
    setComments(createComments(data));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={video.logo} style={{ width: '50%' }}></img>
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
      <form onSubmit={onSubmit} style={{ width: '50%', margin: '3%' }}>
        <div
          className="form-group"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              backgroundColor: '#ffc107',
              borderColor: 'black',
              color: 'black',
            }}
            autoComplete="off"
            placeholder="Write a comment"
            required
          ></input>
          <button className="btn btn-warning" style={{ margin: '3%' }}>
            Add comment
          </button>
        </div>
      </form>
      <div
        style={{
          margin: '5%',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#1a1a1a',
        }}
      >
        {comments}
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
  const logoData = await client.get(`/api/videos/get/logo/logoid/${video.id}`);
  video.logo = logoData.data;
  data.video = video;
  if (video.likes.includes(data.currentUser.email)) {
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
