'use strict';

/**
 * fetchをラップした関数
 * @param {String} path 
 */
function fetchData(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        reject(new Error(`エラー発生! ${res.statusText}`));
      })
      .then(resolve)
      .catch(reject);
  });
}

/**
 * 一覧情報取得
 * @param {String} path 
 */
function fetchAllList() {
  return fetchData('https://codegrid-drill-06.netlify.com/list.json');
}

/**
 * 一覧情報から各詳細情報取得
 * @param {Array} list 
 */
function fetchDetails(list) {
  return new Promise((resolve, reject) => {
    const fetchList = list.map(item => fetchDetail(item.id));
    Promise.all(fetchList)
      .then(resolve)
      .catch(reject);
  });
}

/**
 * idから詳細情報取得
 * @param {String} id 
 */
function fetchDetail(id) {
  const templatePath = 'https://codegrid-drill-06.netlify.com/items/{id}.json';
  const path = templatePath.replace(/{id}/i, id);
  return fetchData(path);
}

/**
 * 得た詳細情報を整形してコンソール出力
 * @param {*} detailList 
 */
function formatThenOutput(detailList) {
  const result = detailList.reduce((prev, current, index) => {
    // 最後以外、末尾に改行いれる
    return prev + `${current.name}: ${current.weight}${index === detailList.length - 1 ? '' : '\n'}`;
  }, '');
  console.log(result);
}

function main() {
  fetchAllList()
    .then(fetchDetails)
    .then(formatThenOutput)
    .catch(console.error);
}

main();