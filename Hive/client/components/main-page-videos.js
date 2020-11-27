export default ({ currentUser, videos }) => {
  return (
    <div>
      <h1 style={{ fontFamily: 'cursive' }}>
        Welcome back {currentUser.email} !!!
      </h1>
    </div>
  );
};
