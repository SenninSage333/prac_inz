import buildClient from '../api/build-client';
import Link from 'next/link';

const MainPage = ({ currentUser, videos }) => {
  const cards = [];
  if (videos) {
    for (let video of videos) {
      const url = `watch/${video.id}`;
      const card = (
        <Link href={url}>
          <a className="nav-link" style={{ color: '#ffc107' }}>
            <div
              className="card"
              style={{
                width: '180px',
                border: '2px #ffc107 solid',
                backgroundColor: '#1a1a1a',
                marginBottom: '5%',
              }}
            >
              <img
                className="card-img-top"
                src={video.logo}
                alt={video.title}
              />
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">{video.description}</p>
              </div>
            </div>
          </a>
        </Link>
      );
      cards.push(card);
    }
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
  if (data.currentUser == null) {
    context.res.writeHead(301, { Location: '/' });
    context.res.end();
  }
  const videosData = await client.get('/api/videos');
  const videos = videosData.data.allVideos;
  data.videos = videos;
  for (let video of videos) {
    const logoData = await client.get(
      `/api/videos/get/logo/logoid/${video.id}`
    );
    video.logo = logoData.data;
  }
  return data;
};

export default MainPage;
