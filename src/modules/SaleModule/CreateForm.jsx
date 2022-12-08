import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import SaleForm from '@/modules/SaleModule/SaleForm';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;
export default function CreateForm({ config, formElements }) {
  let dtpjrdate;
  const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const handleJrdateChange = (value, e) => { setDtjrdate(e); console.log('smak yahi', dtjrdate); };

  const onSubmit = (fieldsValue) => {
    const { date, ...data } = fieldsValue;
    let year = dtjrdate.slice(6, 10);
    let month = dtjrdate.slice(3, 5);
    let date1 = dtjrdate.slice(0, 2);
    dtpjrdate = dayjs(year + month + date1).format('YYYY-MM-DD');
    fieldsValue = { date: dtpjrdate, ...data };
    dispatch(erp.create({ entity, jsonData: fieldsValue }));
  };

  useEffect(() => {
    if (isSuccess) {
      setDtjrdate(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
    }
  }, [isSuccess]);

  return (
    <Layout className="site-layout">
      <Content className="whiteBox shadow" style={{ padding: '10% 50% 10% 10%', margin: '100px auto', width: '100%', maxWidth: '1100px' }} >

        <Loading isLoading={isLoading}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <SaleForm handleJrdateChange={handleJrdateChange} />
            <Form.Item>
              <Button type="primary" htmlType="submit">Save Sale</Button>
            </Form.Item>
          </Form>
        </Loading>

      </Content>
    </Layout>
  );
}
