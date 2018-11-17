/**
 * https://jsprimer.net/basic/async/#callback-and-async-function
 * ↑のサンプルをAsync Functionを使わずに通常のPromiseで実装した例
 */
 
class  {
  constructor() {
    this.dataMap = new Map();
  }
  save(key, value) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.dataMap.set(key, value);
        resolve();
      }, 100);
    });
  }
  load(key) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.dataMap.get(key));
      }, 50);
    })
  }
}

const storage = new AsyncStorage();

function saveUsers(users) {
  return new Promise(resolve => {
    Promise.all(users.map(user => storage.save(user.id, user)))
      .then(() => resolve());
  });
}

function loadUser(userId) {
  return new Promise(resolve => {
    storage.load(userId)
      .then(value => resolve(value));
  });
}


function main() {
  const users = [{ id: 1, name: "John" }, { id: 5, name: "Smith" }, { id: 7, name: "Ayo" }];
  saveUsers(users)
    .then(() => loadUser(5))
    .then(value => console.log(value));
}

main();
