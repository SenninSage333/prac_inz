import buildClient from '../api/build-client';
import Link from 'next/link';
import { useState } from 'react';

const MainPage = ({ currentUser, videos }) => {
  const createVideoCards = (videos) => {
    let mcards = [];
    for (let video of videos) {
      let url = `watch/${video.id}`;
      let card = (
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
      mcards.push(card);
    }
    return mcards;
  };
  var cards = [];
  if (videos) {
    cards = createVideoCards(videos);
  }

  const [searchVideo, setSearchVideo] = useState(false);
  const [searchVideoCards, setSearchVideoCards] = useState([]);
  const [searchVideoName, setSearchVideoName] = useState('');

  return (
    <div>
      <h1 style={{ fontFamily: 'cursive' }}>
        Welcome back {currentUser.email} !!!
      </h1>
      <input
        type="text"
        autoComplete="off"
        className="form-control"
        placeholder="Search for video"
        value={searchVideoName}
        onChange={(e) => {
          if (e.target.value === '') {
            setSearchVideo(false);
          } else {
            setSearchVideo(true);
          }
          setSearchVideoName(e.target.value);
          let scards = [];
          for (let video of videos) {
            if (
              video.title.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
              scards.push(video);
            }
          }
          setSearchVideoCards(createVideoCards(scards));
        }}
        style={{
          width: '20%',
          backgroundColor: '#ffc107',
          borderColor: 'black',
          color: 'black',
          fontFamily: 'cursive',
          fontSize: 'x-large',
        }}
      ></input>
      {searchVideo && <h1>Found videos:</h1>}
      {searchVideo && searchVideoCards.length > 0 && (
        <div
          className="d-flex flex-row flex-wrap justify-content-around"
          style={{ margin: '5%' }}
        >
          {searchVideoCards}
        </div>
      )}
      {searchVideo && searchVideoCards.length == 0 && <h2>Not found any</h2>}
      {searchVideo && <h1>All videos:</h1>}
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
