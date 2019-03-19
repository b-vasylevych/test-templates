import axios from 'axios';

const API = 'http://demo4452328.mockable.io';

export default {
  fetchData: (path) => axios({ method: 'get', url: `${API}/${path}` }).then(response => response.data)
};

