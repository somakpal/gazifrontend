import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, Menu } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems, selectItemById } from '@/redux/erp/selectors';
import uniqueId from '@/utils/uinqueId';
import DataTable from '@/modules/SaleModule/DataTable';
import { useErpContext } from '@/context/erp';
import { Layout } from 'antd';
const { Content } = Layout;
let dbentity = '';

function AddNewItem({ config }) {
  const history = useHistory();
  const { ADD_NEW_ENTITY } = config;
  const handelClick = () => {
    history.push(`/${dbentity}/create`);
  };
  return (
    <Button onClick={handelClick} type="primary">{ADD_NEW_ENTITY}</Button>
  );
}
function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;
  const item = useSelector(selectItemById(row.id));
  const history = useHistory();
  function Edit() {
    // console.log('somak mylog', item, dbentity);
    dispatch(erp.currentAction({ actionType: 'update', data: item }));
    history.push(`/${dbentity}/update`);
  }
  function Delete() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    modal.open();
  }
  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Edit}>Edit</Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Delete}>Delete</Menu.Item>
    </Menu>
  );
}

export default function DataTableDropMenu({ config }) {
  let { entity } = config;
  dbentity = entity;
  return (
    <>
      <Layout className="site-layout">
        <Content className="whiteBox shadow" style={{ padding: '50px 40px', margin: '100px auto', width: '100%', maxWidth: '1100px' }} >
          <DataTable config={config} DropDownRowMenu={DropDownRowMenu} AddNewItem={AddNewItem} />
        </Content>
      </Layout>
    </>
  );
}
