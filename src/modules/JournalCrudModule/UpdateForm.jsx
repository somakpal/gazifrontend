import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { isDate } from '@/utils/helpers';
import { selectCurrentItem } from '@/redux/crud/selectors';

import Loading from '@/components/Loading';

import { custom } from '@/redux/custom/actions';
import { selectListItems } from '@/redux/custom/selectors';

export default function UpdateForm({ config, formElements, maxAmount = null }) {
    let { entity, relations = '', ledgerId = '' } = config;
    const { TextArea } = Input;
    let dtpjrdate;
    const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
    const dispatch = useDispatch();
    const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
    const { state, crudContextAction } = useCrudContext();
    const { panel, collapsedBox, readBox } = crudContextAction;
    const [form] = Form.useForm();
    const { result: listResult } = useSelector(selectListItems);
    const { pagination } = listResult;

    const handleJrdateChange = (value, e) => {
        dtpjrdate = e;
        setDtjrdate(e);
    };

    const showCurrentRecord = () => {
        readBox.open();
    };

    const onSubmit = (fieldsValue) => {
        console.log('🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~  current.id', current.id);
        const id = current.id;
        const { date, ...data } = fieldsValue;
        let year = dtjrdate.slice(6, 10);
        let month = dtjrdate.slice(3, 5);
        let date1 = dtjrdate.slice(0, 2);
        dtpjrdate = dayjs(year + month + date1).format('YYYY-MM-DD');
        console.log('somak ONSUBMIT date222 update form', dtjrdate, dtpjrdate);
        //setDtjrdate(dtpjrdate);
        fieldsValue = { date: dtpjrdate, ...data };
        dispatch(crud.update({ entity, id, jsonData: fieldsValue }));
    };
    useEffect(() => {
        if (current) {
            let newValues = { ...current };
            console.log('somak master: ' + JSON.stringify(newValues));
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
            console.log('🚀 ~ file: index.jsx ~ line 40 ~ useEffect ~ obj', newValues);
            //setDtjrdate(dayjs(newValues['date']));
            form.resetFields();
            form.setFieldsValue(newValues);
        }
    }, [current]);

    useEffect(() => {
        if (isSuccess) {
            dtpjrdate = dayjs(form.getFieldValue("date").$d).format('YYYY-MM-DD');
            const allfieldsvalue = { frmdate: dtpjrdate, todate: dtpjrdate, ledger: form.getFieldValue("ledger") };

            readBox.open();
            collapsedBox.open();
            panel.open();
            form.resetFields();
            dispatch(crud.resetAction({ actionType: 'update' }));
            //dispatch(crud.list({ entity }));
            //const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: '{}' };
            const options = { page: 1, ledgerId: ledgerId, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
            dispatch(crud.list({ entity, options }));
            //dispatch(custom.list({ entity, options }));
            const balanceoptions = { ledgerId: ledgerId, jsonData: '{}' };
            dispatch(custom.balances({ entity, balanceoptions }));
        }
    }, [isSuccess]);

    const { isEditBoxOpen } = state;

    const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
    return (
        <div style={show}>
            <Loading isLoading={isLoading}>
                <Form form={form} layout="vertical" onFinish={onSubmit}>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                            {
                                required: true,
                                type: 'object',
                            },
                        ]}
                        initialValue={dayjs().add(0, 'days')}
                        style={{ width: '50%' }}
                    >
                        <DatePicker onChange={handleJrdateChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
                    </Form.Item>


                    <Form.Item
                        name="ledger"
                        label="Ledger"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Ledger Account!',
                            },
                        ]}
                    >
                        <AutoCompleteAsync
                            entity={'ledger'}
                            displayLabels={['name']}
                            searchFields={'code,name'}
                        // onUpdateValue={autoCompleteUpdate}
                        />
                    </Form.Item>

                    <Form.Item
                        name="jrtype"
                        label="Dr/Cr"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="debit">DEBIT</Select.Option>
                            <Select.Option value="credit">CREDIT</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Amount is required' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            max={maxAmount}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        />
                    </Form.Item>
                    <Form.Item label="Particular" name="particular">
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        style={{
                            display: 'inline-block',
                            paddingRight: '5px',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Save
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
        </div>
    );
}
