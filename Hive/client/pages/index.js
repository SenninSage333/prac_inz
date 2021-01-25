import MainPage from '../components/main-page';
import buildClient from '../api/build-client';
import { useEffect } from 'react';
import Router from 'next/router';

const LandingPage = ({ currentUser }) => {
  return <MainPage></MainPage>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  if (data.currentUser != null) {
    context.res.writeHead(301, { Location: '/main' });
    context.res.end();
    return;
  }
  return data;
};

export default LandingPage;
