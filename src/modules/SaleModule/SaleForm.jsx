import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, Select, InputNumber } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
export default function SaleForm({ maxAmount = null, isUpdateForm = false, handleJrdateChange = null }) {
    const { TextArea } = Input;
    return (
        <>
            <Form.Item name="date" label="Date" initialValue={dayjs().add(0, 'days')} style={{ width: '50%' }} >
                <DatePicker onChange={handleJrdateChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="chlnNo" label="Chalan No" rules={[{ required: true, message: 'Please Input Chalan!' }]} ><Input /></Form.Item>
            <Form.Item name="product" label="Product" rules={[{ required: true, message: 'Please Select Product!' }]} >
                <Select>
                    <Select.Option value="1">1 NO P</Select.Option><Select.Option value="2">2 NO P</Select.Option>
                    <Select.Option value="3">2 NO B</Select.Option><Select.Option value="4">3 NO P</Select.Option>
                    <Select.Option value="5">3 NO B</Select.Option><Select.Option value="6">4 NO P</Select.Option>
                    <Select.Option value="7">4 NO B</Select.Option><Select.Option value="8">GHAMA</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="unit" label="Unit" rules={[{ required: true, message: 'Please Select Unit!' }]} >
                <Select>
                    <Select.Option value="cft">CFT</Select.Option>
                    <Select.Option value="pieces">PIECES</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Quantity" name="qty" rules={[{ required: true, message: 'Quantity Is Required' }]} >
                <InputNumber style={{ width: '100%' }} min={0} max={maxAmount}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                />
            </Form.Item>
            <Form.Item label="Rate" name="rate" rules={[{ required: true, message: 'Rate Is Required' }]} >
                <InputNumber style={{ width: '100%' }} min={0} max={maxAmount}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                />
            </Form.Item>
        </>
    );
}
