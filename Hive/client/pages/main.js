import buildClient from '../api/build-client';
import Router from 'next/router';
import { useEffect } from 'react';

const MainPage = ({ currentUser, videos }) => {
  if (currentUser == null) {
    useEffect(() => {
      Router.push('/');
    }, '');
  }
  const cards = [];

  for (let video of videos) {
    const url = 'https://hive.dev/api/videos/get/logo/logoid/' + video.id;
    const card = (
      <div
        className="card"
        style={{
          width: '180px',
          border: '2px #ffc107 solid',
          backgroundColor: '#1a1a1a',
          marginBottom: '5%',
        }}
      >
        <img className="card-img-top" src={url} alt={video.title} />
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <p className="card-text">{video.description}</p>
        </div>
      </div>
    );
    cards.push(card);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'cursive' }}>
        Welcome back {currentUser.email} !!!
      </h1>
      <div
        className="d-flex flex-row flex-wrap justify-content-around"
        style={{ margin: '5%' }}
      >
        {cards}
      </div>
    </div>
  );
};

MainPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  const videosData = await client.get('/api/videos');
  const videos = videosData.data.allVideos;
  data.videos = videos;
  return data;
};

export default MainPage;
