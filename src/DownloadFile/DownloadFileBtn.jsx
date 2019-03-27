import { notification } from 'antd';
import downLoadFileAPI from './downLoadFileAPI';

export default ({
  url,
  methods = 'GET',
  params,
  fileName = '未命名',
  onBeforeDownloadCallback = () => { },
  onDownloadCallback = () => { },
  onAfterDownloadCallback = () => { }
}) => {
  const key = 'notificationDownloadFile';

  const completedDownload = () => {
    notification.open({
      key,
      duration: 3,
      message: `下载完成 ${fileName}`,
      description: '下载完成',
    });
  };

  const beginDownload = () => {
    notification.open({
      key,
      duration: null,
      message: `正在下载文件 ${fileName}`,
      description: '正在下载',
    });

    downLoadFileAPI({
      url,
      params,
      onBeforeDownloadCallback() {
        console.log(`onBeforeDownloadCallback`);
      },
      onDownloadCallback({ percentComplete }) {
        console.log(percentComplete);
      },
      onAfterDownloadCallback() {
        completedDownload();
      }
    });
  };

  return {
    start: beginDownload,
  };
};
