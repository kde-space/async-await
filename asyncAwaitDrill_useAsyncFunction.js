'use strict';

/**
 * fetchをラップした関数
 * @param {String} path 
 */
async function fetchData(path) {
  try {
    const res = await fetch(path);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error(`エラー！ ${res.statusText}`);
  } catch (error) {
    throw error;
  }
}

/**
 * 一覧情報取得
 * @param {String} path 
 */
async function fetchAllList() {
  const allList = await fetchData('https://codegrid-drill-06.netlify.com/list.json');
  return allList;
}

/**
 * 一覧情報から各詳細情報取得
 * @param {Array} list 
 */
async function fetchDetails(list) {
  try {
    const fetchList = list.map(item => fetchDetail(item.id));
    const result = await Promise.all(fetchList);
    return result;
  } catch (error) {
    throw error;
  }
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

async function main() {
  try {
    const allList = await fetchAllList();
    const result = await fetchDetails(allList);
    formatThenOutput(result);
  } catch (error) {
    console.error(error);
  }
}

main();