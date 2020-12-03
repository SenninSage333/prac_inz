import { useRouter } from 'next/router';
import buildClient from '../../api/build-client';

const StreamPage = ({ video }) => {
  const url = `https://hive.dev/api/videos/${video.id}/stream`;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>{video.title}</h1>
      <video controls width="80%" style={{ marginBottom: '2%' }}>
        <source src={url} type="video/mp4"></source>
      </video>
      <p>{video.description}</p>
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
