import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;
export default function CreateForm({ config, formElements }) {
  let dtpjrdate;
  const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();

  const handleJrdateChange = (value, e) => {
    form.setFieldsValue({ date: e });
    dtpjrdate = e;
    setDtjrdate(e);
  };

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ file: index.jsx ~ line 19 ~ onSubmit ~ fieldsValue', fieldsValue);
    dispatch(erp.create({ entity, jsonData: fieldsValue }));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
      dispatch(erp.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Layout className="site-layout">
      <Content
        className="whiteBox shadow"
        style={{
          padding: '10% 50% 10% 10%',
          margin: '100px auto',
          width: '100%',
          maxWidth: '1100px',
        }}
      >

        <Loading isLoading={isLoading}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            {formElements}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Ledger
              </Button>
            </Form.Item>
          </Form>
        </Loading>

      </Content>
    </Layout>
  );
}
