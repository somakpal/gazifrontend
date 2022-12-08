import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, Select, InputNumber } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
export default function JournalForm({ maxAmount = null, isUpdateForm = false, handleJrdateChange = null }) {
    const { TextArea } = Input;
    return (
        <>
            <Form.Item name="date" label="Date" initialValue={dayjs().add(0, 'days')} style={{ width: '50%' }} >
                <DatePicker onChange={handleJrdateChange} format={'DD/MM/YYYY'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="ledger" label="Ledger" rules={[{ required: true, message: 'Please Input Ledger Account!' }]} >
                <AutoCompleteAsync entity={'ledger'} displayLabels={['name']} searchFields={'code,name'} />
            </Form.Item>
            <Form.Item name="jrtype" label="Dr/Cr" rules={[{ required: true, message: 'Please Select Transaction Type!' }]} >
                <Select>
                    <Select.Option value="debit">DEBIT</Select.Option>
                    <Select.Option value="credit">CREDIT</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Amount Is Required' }]} >
                <InputNumber style={{ width: '100%' }} min={0} max={maxAmount}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                />
            </Form.Item>
            <Form.Item label="Particular" name="particular"><TextArea /></Form.Item>
        </>
    );
}
