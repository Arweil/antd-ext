import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import RoutesConf from '@site/routes/RoutesConf';

import './style.scss';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

interface IAppLayoutState {
  collapsed: boolean;
}

export default class AppLayout extends PureComponent<{}, IAppLayoutState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, .2)' }}>
            {/* <h1>antd-ext</h1> */}
          </div>
          <Menu theme="dark" mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="smile" />
                  <span>Menu</span>
                </span>
              }
            >
              <Menu.Item key="A">
                <Link to="/FormExt">FormExt</Link>
              </Menu.Item>
              <Menu.Item key="B">
                <Link to="/BatchEditModal">BatchEditModal</Link>
              </Menu.Item>
              <Menu.Item key="C">
                <Link to="/TableExt">TableExt</Link>
              </Menu.Item>
              <Menu.Item key="D">
                <Link to="/TestA">Test A</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <div style={{ overflowY: 'auto' }}>
            <div className="main">
              <Content style={{ padding: 20 }}>
                <RoutesConf />
              </Content>
            </div>
          </div>
        </Layout>
      </Layout>
    );
  }
}
