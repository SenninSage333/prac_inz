import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    //on the server
    return axios.create({
      baseURL: 'http://hive-ingress-nginx-controller.default.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    //on the browser
    return axios.create({
      baseURL: '',
    });
  }
};
