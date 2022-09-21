import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import { custom } from '@/redux/custom/actions';
import { selectListItems } from '@/redux/custom/selectors';

export default function CreateForm({ config, formElements, maxAmount = null }) {
    let { entity, relations = '', ledgerId = '' } = config;
    const { TextArea } = Input;
    let dtpjrdate = dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY');
    const [dtjrdate, setDtjrdate] = useState(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
    const dispatch = useDispatch();
    const { isLoading, isSuccess, result: selectResult } = useSelector(selectCreatedItem);
    const { crudContextAction } = useCrudContext();
    const { panel, collapsedBox, readBox } = crudContextAction;
    const [form] = Form.useForm();
    const { result: listResult } = useSelector(selectListItems);
    const { pagination } = listResult;

    const handleJrdateChange = (value, e) => {
        dtpjrdate = e;
        setDtjrdate(e);
    };
    const onSubmit = (fieldsValue) => {
        const { date, ...data } = fieldsValue;
        console.log('somak create form onbSUBmit: ', dtjrdate);
        let year = dtjrdate.slice(6, 10);
        let month = dtjrdate.slice(3, 5);
        let date1 = dtjrdate.slice(0, 2);
        dtpjrdate = dayjs(year + month + date1).format('YYYY-MM-DD');
        console.log('somak create form onbSUBmit: ', dtpjrdate.toString());
        fieldsValue = { date: dtpjrdate, ...data };
        dispatch(crud.create({ entity, jsonData: fieldsValue }));
        setDtjrdate(dayjs(new Date()).subtract(0, 'days').format('DD-MM-YYYY'));
    };

    useEffect(() => {
        if (isSuccess) {
            dtpjrdate = dayjs(form.getFieldValue("date").$d).format('YYYY-MM-DD');
            const allfieldsvalue = { frmdate: dtpjrdate, todate: dtpjrdate, ledger: form.getFieldValue("ledger") };

            readBox.open();
            collapsedBox.open();
            panel.open();
            form.resetFields();
            dispatch(crud.resetAction({ actionType: 'create' }));
            //const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: '{}' };
            const options = { page: 1, ledgerId: ledgerId, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
            dispatch(crud.list({ entity, options }));
            //dispatch(custom.list({ entity, options }));
            const balanceoptions = { ledgerId: ledgerId, jsonData: '{}' };
            dispatch(custom.balances({ entity, balanceoptions }));
        }
    }, [isSuccess]);

    return (
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
                            message: 'Please select debit or credit!',
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Loading>
    );
}