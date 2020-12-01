import MainPage from '../components/main-page';
import buildClient from '../api/build-client';
import { useEffect } from 'react';
import Router from 'next/router';

const LandingPage = ({ currentUser }) => {
  if (currentUser != null) {
    useEffect(() => {
      Router.push('/main');
    }, '');
  }
  return <MainPage></MainPage>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
