import buildClient from '../api/build-client';
import MainPage from '../components/main-page';
import MainPageVideos from '../components/main-page-videos';

const LandingPage = ({ currentUser, videos }) => {
  return currentUser ? (
    <MainPageVideos currentUser={currentUser} videos={videos}></MainPageVideos>
  ) : (
    <MainPage></MainPage>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('api/users/currentuser');
  const videosData = await client.get('api/videos');
  const videos = videosData.data.allVideos;
  data.videos = videos;
  console.log(videos);
  return data;
};

export default LandingPage;
