import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';

import {
  // DesktopOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  // BankOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation">
        <div className="logo">
          <img
            src={logoIcon}
            alt="Logo"
          // style={{ margin: "0 auto 40px", display: "block" }}
          />

          {!showLogoApp && (
            <img src={logoText} alt="Logo" style={{ marginTop: '3px', marginLeft: '10px' }} />
          )}
        </div>
        <Menu mode="inline">
          <Menu.Item key={'Dashboard'} icon={<DashboardOutlined />}>
            <Link to={'/'} />
            Dashboard
          </Menu.Item>
          <Menu.Item key={'LedgerCreate'} icon={<CustomerServiceOutlined />}>
            <Link to={'/ledger/create'} />
            Ledger New
          </Menu.Item>
          <Menu.Item key={'LedgerRead'} icon={<FileSyncOutlined />}>
            <Link to={'/ledger/read'} />
            Ledger List
          </Menu.Item>
          <Menu.Item key={'JournalCreate'} icon={<FileTextOutlined />}>
            <Link to={'/journal/create'} />
            Journal New
          </Menu.Item>
          <Menu.Item key={'JournalRead'} icon={<CreditCardOutlined />}>
            <Link to={'/journal/read'} />
            Journal List
          </Menu.Item>
          <Menu.Item key={'SaleCreate'} icon={<UserOutlined />}>
            <Link to={'/sale/create'} />
            Sale New
          </Menu.Item>
          <Menu.Item key={'SaleRead'} icon={<TeamOutlined />}>
            <Link to={'/sale/read'} />
            Sale List
          </Menu.Item>
          <Menu.Item key={'ProductRead'} icon={<TeamOutlined />}>
            <Link to={'/product'} />
            Product List
          </Menu.Item>          
        </Menu>
      </Sider>
    </>
  );
}
