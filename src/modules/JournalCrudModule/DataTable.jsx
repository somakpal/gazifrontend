import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, PageHeader, Table, Row, Col, Space, Form, InputNumber, Select } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
//import { DatePicker } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { custom } from '@/redux/custom/actions';
// import { selectListItems } from '@/redux/custom/selectors';
import { selectBalances } from '@/redux/custom/selectors';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import AutoCompleteAsync from './AutoCompleteAsync';
import uniqueId from '@/utils/uinqueId';
import { useMoney } from '@/settings';
import { useCrudContext } from '@/context/crud';

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
    let dtpfrmdate, dtptodate;
    const [dtfrmdate, setDtfrmdate] = useState(dayjs(new Date()).subtract(60, 'days').format('YYYY-MM-DD'));
    const [dttodate, setDttodate] = useState(dayjs(new Date()).subtract(0, 'days').format('YYYY-MM-DD'));
    const money = useMoney();
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    // const { state, crudContextAction } = useCrudContext();
    // const { result: selectResult } = useSelector((state) => state.custom.current);
    let selectedvalue = '';
    let { entity, relations = '', dataTableColumns, dataTableTitle, ledgerId } = config;
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
    //const { result: listResult, isLoading: listIsLoading } = useSelector((state) => state.crud.list);
    //const crudlist = useSelector((state) => state.custom.list);
    //const { pagination, items, debittotal } = listResult;
    const { pagination, items } = listResult;
    //const debittotalval = { ...debittotal };
    console.log('somak janina keno: ', items, pagination);

    const { result: listBalances } = useSelector(selectBalances);
    // const { debittotal } = listBalances;
    // const debittotalval = { ...debittotal };

    useEffect(() => {
        console.log('somak debit is: ', listBalances);
        //setTotalDebit(listBalances.debitbal);
    }, [items]);
    const dispatch = useDispatch();

    const onSubmit = (fieldsValue) => {
        const { frmdate, todate, ledger } = fieldsValue;
        dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        fieldsValue = { frmdate: dtpfrmdate, todate: dtptodate, ledger };

        console.log('somak ONBUBMIT formfieldsvalue11:', form.getFieldValue("ledger"), form.getFieldsValue());
        const options = { page: 1, ledgerId: ledgerId, relations: relations, jsonData: JSON.stringify(fieldsValue) };
        console.log('🚀 ~ file: DataTable.jsx ~ line 34 ~ onSubmit ~ fieldsValue: ', JSON.stringify(options));
        //dispatch(custom.list({ entity, options }));
        dispatch(crud.list({ entity, options }));
        //const productList = useSelector((state) => state.productList);

        const balanceoptions = { ledgerId: ledgerId, jsonData: JSON.stringify(fieldsValue) };
        //dispatch(custom.balances({ entity, balanceoptions }));
        dispatch(custom.balances({ entity, options }));
    };

    const handelDataTableLoad = useCallback((pagination) => {
        // const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: '{}' };
        dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        const allfieldsvalue = { frmdate: dtpfrmdate, todate: dtptodate, ledger: form.getFieldValue("ledger") };

        console.log('somak HhandelDataTableLoad formfieldsvalue:', form.getFieldValue("frmdate"), JSON.stringify(allfieldsvalue));
        const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
        //dispatch(custom.list({ entity, options }));
        dispatch(crud.list({ entity, options }));

        // const balanceoptions = { ledgerId: ledgerId, jsonData: JSON.stringify(allfieldsvalue) };
        // dispatch(custom.balances({ entity, balanceoptions }));
    }, []);

    useEffect(() => {
        dtpfrmdate = dayjs(dtfrmdate).format('YYYY-MM-DD');
        dtptodate = dayjs(dttodate).format('YYYY-MM-DD');
        const allfieldsvalue = { frmdate: dtpfrmdate, todate: dtptodate, ledger: form.getFieldValue("ledger") };

        const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: '{}' };
        //const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations, jsonData: JSON.stringify(allfieldsvalue) };
        //dispatch(custom.list({ entity, options }));
        dispatch(crud.list({ entity, options }));
        //dispatch(crud.list({ entity }));

        // const balanceoptions = { ledgerId: ledgerId, jsonData: '{}' };
        dispatch(custom.balances({ entity, options }));
        console.log('ifirst hook');

    }, []);

    const handleFrmdateChange = (value, e) => {
        dtpfrmdate = e;
        setDtfrmdate(e);
    };
    const handleTodateChange = (value, e) => {
        dtptodate = e;
        setDttodate(e);
    };

    return (
        <>
            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={5}>
                        <PageHeader
                            onBack={() => window.history.back()}
                            title={dataTableTitle}
                            ghost={false}
                            extra={[

                            ]}
                            style={{
                                padding: '20px 0px',
                            }}
                        ></PageHeader>
                    </Col>
                    <Col span={18}>
                        <Form key={`${uniqueId()}`} form={form}
                            //onValuesChange={(v) => setValuesForm(v)} 
                            layout="inline" onFinish={onSubmit}>
                            <Form.Item
                                name="ledger"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input Ledger Account!',
                                    },
                                ]}
                                style={{ position: 'relative', padding: '0px 20px', width: '29%', float: 'left' }}
                            >
                                <AutoCompleteAsync
                                    entity={'ledger'}
                                    displayLabels={['name']}
                                    searchFields={'code,name'}
                                // onUpdateValue={autoCompleteUpdate}
                                />
                            </Form.Item>
                            <Form.Item
                                name="frmdate"
                                rules={[
                                    {
                                        required: true,
                                        type: 'object',
                                    },
                                ]}
                                initialValue={dayjs().subtract(60, 'days')}
                                style={{ width: '19%' }}
                            >
                                {/* <DatePicker onChange={handleFrmdateChange} placeholder='From Date' format={'MM/DD/YYYY'} /> */}
                                <DatePicker onChange={(event) => {
                                    dtpfrmdate = event;
                                    setDtfrmdate(event);
                                    // selectedvalue = form.getFieldValue('ledger');
                                    // form.resetFields(["ledger"]);
                                    // form.setFieldsValue({ ledger: selectResult });                                        
                                }}
                                    placeholder='From Date' format={'MM/DD/YYYY'} />
                            </Form.Item>
                            <Form.Item
                                name="todate"
                                rules={[
                                    {
                                        required: true,
                                        type: 'object',
                                    },
                                ]}
                                initialValue={dayjs().add(0, 'days')}
                                style={{ width: '19%' }}
                            >
                                <DatePicker onChange={handleTodateChange} placeholder='To Date' format={'MM/DD/YYYY'} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Filter
                                        </Button>
                            </Form.Item>
                            <AddNewItem key={`${uniqueId()}`} config={config} />
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

            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={24}>
                        <div className="line"></div>
                    </Col>
                    <div className="space10"></div>
                    <Col className="gutter-row" span={6}>
                        <p
                            style={{
                                paddingLeft: '1px',
                                paddingTop: '5px',
                            }}
                        >
                            Debit Total :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={listBalances.debitbal}
                            min={0}
                            controls={false}
                            addonAfter={money.currencyPosition === 'after' ? money.currencySymbol : undefined}
                            addonBefore={money.currencyPosition === 'before' ? money.currencySymbol : undefined}
                            formatter={(value) => money.amountFormatter({ amount: value })}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p
                            style={{
                                paddingLeft: '1px',
                                paddingTop: '5px',
                            }}
                        >
                            Credit Total :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={listBalances.creditbal}
                            min={0}
                            controls={false}
                            addonAfter={money.currencyPosition === 'after' ? money.currencySymbol : undefined}
                            addonBefore={money.currencyPosition === 'before' ? money.currencySymbol : undefined}
                            formatter={(value) => money.amountFormatter({ amount: value })}
                        />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p
                            style={{
                                paddingLeft: '1px',
                                paddingTop: '5px',
                            }}
                        >
                            Total Balance :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={listBalances.debitbal - listBalances.creditbal}
                            min={0}
                            controls={false}
                            addonAfter={money.currencyPosition === 'after' ? money.currencySymbol : undefined}
                            addonBefore={money.currencyPosition === 'before' ? money.currencySymbol : undefined}
                            formatter={(value) => money.amountFormatter({ amount: value })}
                        />
                    </Col>
                    <Col className="gutter-row" span={6} offset={0}>
                        <p
                            style={{
                                paddingLeft: '1px',
                                paddingTop: '5px',
                            }}
                        >
                            Net Balance :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={listBalances.netbal}
                            min={0}
                            controls={false}
                            addonAfter={money.currencyPosition === 'after' ? money.currencySymbol : undefined}
                            addonBefore={money.currencyPosition === 'before' ? money.currencySymbol : undefined}
                            formatter={(value) => money.amountFormatter({ amount: value })}
                        />
                    </Col>
                </Row>
            </div>

        </>
    );
}