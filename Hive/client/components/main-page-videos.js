export default ({ currentUser, videos }) => {
  for (let video of videos) {
    console.log(video);
  }
  return (
    <div>
      <h1 style={{ fontFamily: 'cursive' }}>
        Welcome back {currentUser.email} !!!
      </h1>
    </div>
  );
};
