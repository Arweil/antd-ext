import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

interface NotificationRedirectProps extends ArgsProps {
  goFun: () => void;
}

export function notificationRedirect(params: NotificationRedirectProps): void {
  const key = `${new Date().getTime()}${Math.random().toString().slice(-6)}`;
  const { goFun, ...notificationProps } = params;

  let timer = 0;

  // 清除计时器
  function goToDeskWrapper(): void {
    if (timer) {
      clearTimeout(timer);
    }

    goFun();
  }

  timer = setTimeout(() => {
    notification.close(key);
    goToDeskWrapper();
  }, notificationProps.duration);

  notification.open({
    key,
    duration: 0,
    ...notificationProps,
    onClick: () => {
      notificationProps.onClick && notificationProps.onClick();
      goToDeskWrapper();
    },
  });
}
