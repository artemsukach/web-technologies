import FetchRequest from './FetchRequest';

export default class AuthService {
  static async register(username, password) {
    const registerResponse = await FetchRequest.request({
      method: 'POST',
      body: {
        username,
        password,
      },
      path: '/create',
    });

    return registerResponse;
  }

  static async login(username, password) {
    const loginResponse = await FetchRequest.request({
      method: 'POST',
      body: {
        username,
        password,
      },
      path: '/login',
    });

    return loginResponse;
  }
}
