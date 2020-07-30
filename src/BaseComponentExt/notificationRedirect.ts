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
  function nextStep(): void {
    if (timer) {
      clearTimeout(timer);
    }

    goFun();
  }

  timer = notificationProps.duration !== null ? setTimeout(() => {
    notification.close(key);
    nextStep();
  }, notificationProps.duration) : 0;

  notification.open({
    key,
    ...notificationProps,
    onClick: () => {
      notificationProps.onClick && notificationProps.onClick();
      nextStep();
    },
  });
}
