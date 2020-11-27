import Link from 'next/link';

export default () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: '#ffc107',
          color: 'black',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '5%',
          fontFamily: 'fantasy',
        }}
      >
        <div className="p-2">
          <h1>Welcome to Hive!</h1>
        </div>
        <div className="p-2">
          <h3>Hive is a video streaming service</h3>
        </div>
        <div className="p-2">
          <h3>where I upload videos from my games</h3>
        </div>
        <div className="p-2">
          <h3>You can easily watch all the content</h3>
        </div>
        <div className="p-2">
          <h3>All it takes is to</h3>
        </div>
        <div className="p-2">
          <Link href="/auth/signup">
            <a className="nav-link bg-dark text-warning">
              <h1>Sign Up!</h1>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
