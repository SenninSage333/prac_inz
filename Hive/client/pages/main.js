import buildClient from '../api/build-client';
import Router from 'next/router';
import { useEffect } from 'react';

const MainPage = ({ currentUser, videos }) => {
  if (currentUser == null) {
    useEffect(() => {
      Router.push('/');
    }, '');
  }
  return (
    <div>
      <h1 style={{ fontFamily: 'cursive' }}>
        Welcome back {currentUser.email} !!!
      </h1>
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
