import { Menu } from "antd";
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";


const AdminPage = () => {
  const items = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'Người dùng',
      onTitleClick: () => setKeySelected('user'),
    },
    {
      key: 'product',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
      onTitleClick: () => setKeySelected('product'),
    },
  ];

  const [stateOpenKeys, setStateOpenKeys] = useState(['user', 'product']);
  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      default:
        return <></>
    }
  }

  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  console.log("keySelected", keySelected);

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['user']}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '115vh'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
