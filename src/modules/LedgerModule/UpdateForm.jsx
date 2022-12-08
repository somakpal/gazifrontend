import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

export default function UpdateForm({ config, formElements }) {
  let dtpjrdate;
  const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
  let { entity } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [currentObj, setCurrentObj] = useState(current);
  const [form] = Form.useForm();
  const history = useHistory();

  const handleJrdateChange = (value, e) => {
    dtpjrdate = e;
    setDtjrdate(e);
  };

  const showCurrentRecord = () => {
    form.resetFields();
    setCurrentObj(null);
    dispatch(erp.resetAction({ actionType: 'update' }));
    history.push(`/${entity}/read`);
  };

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~  current.id', currentObj.id);
    const id = currentObj.id;
    // dispatch(crud.update({ entity, id, jsonData: fieldsValue }));
    dispatch(erp.update({ entity, id, jsonData: fieldsValue }));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setCurrentObj(null);
      dispatch(erp.resetAction({ actionType: 'update' }));
      history.push(`/${entity}/read`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (current) {
      setCurrentObj(current);
      let newValues = { ...current };
      // console.log('somak master: ' + JSON.stringify(newValues));
      if (newValues.birthday) {
        newValues = {
          ...newValues,
          birthday: dayjs(newValues['birthday']),
        };
      }
      if (newValues.date) {
        newValues = {
          ...newValues,
          date: dayjs(newValues['date']),
        };
      }
      if (newValues.expiredDate) {
        newValues = {
          ...newValues,
          expiredDate: dayjs(newValues['expiredDate']),
        };
      }
      if (newValues.created) {
        newValues = {
          ...newValues,
          created: dayjs(newValues['created']),
        };
      }
      if (newValues.updated) {
        newValues = {
          ...newValues,
          updated: dayjs(newValues['updated']),
        };
      }
      // console.log('🚀 ~ file: index.jsx ~ line 40 ~ useEffect ~ obj', newValues);
      form.setFieldsValue(newValues);
    }
  }, [current]);

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
            <Form.Item
              style={{
                display: 'inline-block',
                paddingRight: '5px',
              }}
            >
              <Button type="primary" htmlType="submit">
                Update Ledger
            </Button>
            </Form.Item>
            <Form.Item
              style={{
                display: 'inline-block',
                paddingLeft: '5px',
              }}
            >
              <Button onClick={showCurrentRecord}>Cancel</Button>
            </Form.Item>
          </Form>
        </Loading>

      </Content>
    </Layout>
  );
}
