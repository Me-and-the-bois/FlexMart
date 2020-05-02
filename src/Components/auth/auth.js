class Auth {
  constructor() {
    this.IsLogged = false;
  }

  login(cb) {
    this.IsLogged = true;
    cb();
  }
  logout(cb) {
    this.IsLogged = false;
    cb();
  }
}

export default new Auth();
