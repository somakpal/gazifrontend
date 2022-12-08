import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Dropdown, Button, PageHeader, Table, Row, Col, Space, Form, InputNumber, Select } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useMoney } from '@/settings';

export default function DataTable({ config, }) {
    let totalqty, averagerate, totalamount;
    let { entity, dataTableColumns, dataTableTitle } = config;
    const money = useMoney();
    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
    const { pagination, items } = listResult;
    
    if(items.length == 11){
        // const { totqty } = items[8]; 
        // totalqty = totqty;
        averagerate = items.pop();
        const { totamt } = items.pop();
        const { totqty } = items.pop();
        totalqty = totqty; totalamount = totamt;
    }
    const productitems = items;
    console.log('somak darun korechis: ',items.length, items);
    // console.log('somak darun :', totalqty, totalamount, averagerate);

    const dispatch = useDispatch();

    const handelDataTableLoad = useCallback((pagination) => {
        const options = { page: pagination.current || 1, };
        dispatch(erp.list({ entity, options }));
    }, []);

    useEffect(() => {
        const options = { page: 1, };
        dispatch(erp.list({ entity, options }));
    }, []);

    return (
        <>
            <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
                <Row gutter={[12, -5]}>
                    <Col span={5}><PageHeader title={dataTableTitle} ghost={false} extra={[]} style={{ padding: '20px 0px', }}></PageHeader></Col>
                </Row>
            </div>

            <Table
                columns={dataTableColumns}
                rowKey={(item) => item.id}
                dataSource={items}
                pagination={false}
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
                            Total Qty :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={totalqty}
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
                            Total Amount :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={totalamount}
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
                            Avg Rate :
                        </p>
                        <InputNumber
                            readOnly
                            className="moneyInput"
                            value={averagerate}
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