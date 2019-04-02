import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN'; // 语言包
import Root from '@site/routes/Root';

const render = () => {
  ReactDOM.render(
    <LocaleProvider locale={zhCN}>
      <Root />
    </LocaleProvider>,
    document.getElementById('app')
  );
};

render();
