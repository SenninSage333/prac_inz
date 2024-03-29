import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/main'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container">
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{
                backgroundColor: '#ffc107',
                borderColor: 'black',
                color: 'black',
              }}
            ></input>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              style={{
                backgroundColor: '#ffc107',
                borderColor: 'black',
                color: 'black',
              }}
            ></input>
          </div>
          {errors}
          <button className="btn btn-warning">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
