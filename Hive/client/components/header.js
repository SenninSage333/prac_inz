import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    // !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link text-dark">
              <h4>{label}</h4>
            </a>
          </Link>
        </li>
      );
    });
  const href = currentUser ? '/main' : '/';

  return (
    <nav className="navbar navbar-light bg-warning">
      <Link href={href}>
        <a className="navbar-brand">
          <h2>
            Hive
            <img src="/hive.png" style={{ width: '50px', height: '50px' }} />
          </h2>
        </a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
