import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, PageHeader, Table, Row, Col, Space, Form, InputNumber, Select } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
    const [dtfrmdate, setDtfrmdate] = useState(dayjs(new Date()).subtract(60, 'days').format('YYYY-MM-DD'));
    const [dttodate, setDttodate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
    let { entity, relations = '', dataTableColumns, dataTableTitle } = config;
    const [form] = Form.useForm();

    dataTableColumns = [
        ...dataTableColumns,
        {
            title: '',
            render: (row) => (
                <Dropdown overlay={DropDownRowMenu({ row })} trigger={['click']}>
                    <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
                </Dropdown>
            ),
        },
    ];
    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
    const { pagination, items } = listResult;
    const dispatch = useDispatch();

    const onSubmit = (fieldsValue) => {
        const { frmdate, todate, ledger } = fieldsValue;
        const dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        const dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        fieldsValue = { frmdate: dtpfrmdate, todate: dtptodate, ledger };
        const options = { page: 1, relations: relations, jsonData: JSON.stringify(fieldsValue) };
        dispatch(erp.list({ entity, options }));
    };

    const handelDataTableLoad = useCallback((pagination) => {
        const dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        const dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        const allfieldsvalue = { frmdate: dtpfrmdate, todate: dtptodate, ledger: form.getFieldValue("ledger") };
        const options = { page: pagination.current || 1, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
        console.log('start date somak lavi', dtpfrmdate, dtfrmdate);
        dispatch(erp.list({ entity, options }));
    }, []);

    useEffect(() => {
        const options = { page: pagination.current || 1, relations: relations, jsonData: '{}' };
        dispatch(erp.list({ entity, options }));
    }, []);

    return (
        <>
            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={5}><PageHeader title={dataTableTitle} ghost={false} extra={[]} style={{ padding: '20px 0px', }}></PageHeader></Col>
                    <Col span={18}>
                        <Form form={form} layout="inline" onFinish={onSubmit}>
                            <Form.Item name="ledger" style={{ position: 'relative', padding: '0px 20px', width: '29%', float: 'left' }} >
                                <AutoCompleteAsync entity={'ledger'} displayLabels={['name']} searchFields={'code,name'} />
                            </Form.Item>
                            <Form.Item name="frmdate" initialValue={dayjs().subtract(60, 'days')} style={{ width: '19%' }} >
                                <DatePicker onChange={(event) => { setDtfrmdate(event); }} placeholder='From Date' format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item name="todate" initialValue={dayjs().add(0, 'days')} style={{ width: '19%' }}>
                                <DatePicker onChange={(event) => { setDttodate(event); }} placeholder='To Date' format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item><Button type="primary" htmlType="submit">Search</Button></Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

            <Table
                columns={dataTableColumns}
                rowKey={(item) => item.id}
                dataSource={items}
                pagination={pagination}
                loading={listIsLoading}
                onChange={handelDataTableLoad}
            />
        </>
    );
}