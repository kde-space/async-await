// カスタムイベント作成
const event1 = new Event('ev:event1');
const event2 = new Event('ev:event2');

// イベントリスナーの登録
function promiseEvent1() {
  return new Promise(resolve => {
    document.addEventListener('ev:event1', () => {
      console.log('event1 fire');
      resolve(1);
    });
  });
}

function promiseEvent2() {
  return new Promise(resolve => {
    document.addEventListener('ev:event2', () => {
      console.log('event2 fire');
      resolve(2);
    });
  });
}

// イベント終了の監視
async function observeFinishEvent() {
  const result = await Promise.all([promiseEvent1(), promiseEvent2()]);
  return Promise.resolve(result);
}

async function main() {
  const result = await observeFinishEvent();
  console.log(result, 'do something.');
}

// カスタムイベントの発火
setTimeout(() => {
  document.dispatchEvent(event1);
}, Math.random() * 1000);

setTimeout(() => {
  document.dispatchEvent(event2);
}, Math.random() * 1000);

main();
