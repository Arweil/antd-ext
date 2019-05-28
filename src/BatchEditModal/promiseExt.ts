/**
 * 包装promise能够支持取消promise的执行
 * @param {Promise} promise 被包装的promise
 */
export function makeCancelablePromise(promise: Promise<any>) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) => {
      hasCanceled ? reject({ isCanceled: true }) : resolve(val);
    });
    promise.catch((error) => {
      hasCanceled ? reject({ isCanceled: true }) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}

/**
 * 处理Promise队列，按照顺序依次处理Promise
 * exp:
 *  const promiseQueue = handlePromiseQueue();
 *  promiseQueue.push(promiseA);
 *  promiseQueue.push(promiseB);
 * @param {boolean} runOnlyLast 如果设置为true, 当队列中第一个Promise执行完毕会直接执行最后一个Promise
 */
export function handlePromiseQueue(runOnlyLast: boolean = false) {
  let queue: Array<() => Promise<any>> = [];
  let status = Promise.resolve();
  function execPromise(): Promise<any> {
    // https://github.com/Microsoft/TypeScript/issues/26963
    if (queue.length > 0) {
      // @ts-ignore
      return queue.shift()();
    }
    return Promise.resolve();
  }
  return {
    push: (promise: () => Promise<any>) => {
      runOnlyLast ? queue = [promise] : queue.push(promise);
      if (queue.length > 0) {
        status = status.then(execPromise);
      }
    },
    length: queue.length,
  };
}

/**
 * 执行Promise，只返回最后一个Promsie的结果
 * exp:
 *  const instance = getLastPromise();
 *  instance.run(promiseA);
 *  instance.run(promiseB);
 */
export function getLastPromise() {
  let lastPromiseId = 0;

  return {
    run: async <T>(promise: () => Promise<T>): Promise<{ cancel: true } | { cancel: false; result: T; }> => {
      lastPromiseId++;
      const promiseId = lastPromiseId;
      const res = await promise();
      if (lastPromiseId !== promiseId) {
        return {
          cancel: true,
        }
      }
      return {
        cancel: false,
        result: res,
      };
    }
  }
}
