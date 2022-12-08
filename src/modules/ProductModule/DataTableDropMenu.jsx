import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, Menu } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems, selectItemById } from '@/redux/erp/selectors';
import uniqueId from '@/utils/uinqueId';
import DataTable from '@/modules/ProductModule/DataTable';
import { useErpContext } from '@/context/erp';
import { Layout } from 'antd';
const { Content } = Layout;

export default function DataTableDropMenu({ config }) {  
  return (
    <>
      <Layout className="site-layout">
        <Content className="whiteBox shadow" style={{ padding: '50px 40px', margin: '100px auto', width: '100%', maxWidth: '1100px' }} >
          <DataTable config={config} />
        </Content>
      </Layout>
    </>
  );
}
