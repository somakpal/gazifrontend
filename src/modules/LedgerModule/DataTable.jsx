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
        console.log('dokomoto', fieldsValue);
        const options = { page: 1, relations: relations, jsonData: JSON.stringify(fieldsValue) };
        dispatch(erp.list({ entity, options }));
    };

    const handelDataTableLoad = useCallback((pagination) => {
        const options = { page: pagination.current || 1, relations: relations, jsonData: '{}' };
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