import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import JournalForm from '@/forms/JournalForm';
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
  const handleJrdateChange = (value, e) => { setDtjrdate(e); };

  const showCurrentRecord = () => {
    form.resetFields();
    setCurrentObj(null);
    dispatch(erp.resetAction({ actionType: 'update' }));
    history.push(`/${entity}/read`);
  };

  const onSubmit = (fieldsValue) => {
    const id = currentObj.id;
    // const { date, ...data } = fieldsValue;
    const { date, particular } = fieldsValue;
    let year = dtjrdate.slice(6, 10);
    let month = dtjrdate.slice(3, 5);
    let date1 = dtjrdate.slice(0, 2);
    dtpjrdate = dayjs(year + month + date1).format('YYYY-MM-DD');
    fieldsValue = { date: dtpjrdate, particular };
    dispatch(erp.update({ entity, id, jsonData: fieldsValue }));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setCurrentObj(null);
      dispatch(erp.resetAction({ actionType: 'update' }));
      setDtjrdate(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
      history.push(`/${entity}/read`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (current) {
      setCurrentObj(current);
      let newValues = { ...current };
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
        setDtjrdate(dayjs(newValues['date']).subtract(0, 'days').format('DD-MM-YYYY'));
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
      form.setFieldsValue(newValues);
    }
  }, [current]);

  return (
    <Layout className="site-layout">
      <Content className="whiteBox shadow" style={{ padding: '10% 50% 10% 10%', margin: '100px auto', width: '100%', maxWidth: '1100px' }} >

        <Loading isLoading={isLoading}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <JournalForm handleJrdateChange={handleJrdateChange} />
            <Form.Item style={{ display: 'inline-block', paddingRight: '5px' }} >
              <Button type="primary" htmlType="submit">Update Journal</Button>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', paddingLeft: '5px' }} >
              <Button onClick={showCurrentRecord}>Cancel</Button>
            </Form.Item>
          </Form>
        </Loading>

      </Content>
    </Layout>
  );
}
