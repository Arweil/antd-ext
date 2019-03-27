function createUrl(e) {
  if (Object.keys(e).length === 1 && Object.keys(e)[0] === 'url') {
    return e.url;
  }
  var t = (e && e.length, e.url + '?');
  for (var o in e) 'url' != o && null !== e[o] && (t += o + '=' + encodeURIComponent(e[o]) + '&');
  return t.substring(0, t.lastIndexOf('&'));
}

function downLoadFileAPI({
  url,
  methods = 'GET',
  params,
  fileName = '未命名',
  onBeforeDownloadCallback = () => { },
  onDownloadCallback = () => { },
  onAfterDownloadCallback = () => { }
}) {
  function checkFunParamsType() {
    methods = methods.toLocaleUpperCase();

    if (!methods || !['GET', 'POST'].includes(methods)) {
      console.warn(`download failed beacause cannot support method: ${methods}. only support methods GET, POST.`);
      return false;
    }

    const paramsType = Object.prototype.toString.call(params);
    if (methods === 'POST' && paramsType !== '[object FormData]') {
      console.warn(`download failed beacause methods post must has a formData type params`);
      return false;
    }

    if (methods === 'GET' && paramsType !== '[object Object]') {
      console.warn(`download failed beacause methods post must has a object type params`);
      return false;
    }

    return true;
  }

  if (!checkFunParamsType()) {
    return false;
  }

  // 开始下载的回调
  onBeforeDownloadCallback();
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';

  // 模拟触发下载
  function triggerLinkDownload(blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.response.type) {
        // const blob = new Blob([xhr.response], { type: xhr.response.type });
        const blob = new Blob([xhr.response], { type: xhr.response.type });
        triggerLinkDownload(blob);
      } else {
        console.warn('download file failed, beacause response header dont has props [content-type]');
      }

      // 下载完成的回调
      onAfterDownloadCallback();
    }
  };

  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      let percentComplete = event.loaded / event.total;
      onDownloadCallback({ percentComplete, event });
    } else {
      console.warn('onDownloadCallback cannot trigger, beacause resposne header dont has props [content-length]');
    }
  };

  if (methods === 'GET') {
    url = createUrl({ url, ...params });
    xhr.open('GET', url);
    xhr.send();
  }

  if (methods === 'POST') {
    xhr.open('GET', url);
    xhr.send(params);
  }
}

export default downLoadFileAPI;
