import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, Select, InputNumber } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';
import { useMoney } from '@/settings';

//import { handleJrdateChange } from '@/modules/JournalCrudModule/CreateForm';

export default function JournalForm({ maxAmount = null, isUpdateForm = false, handleJrdateChange = null }) {

    const { TextArea } = Input;
    return (
        <>
            <Form.Item
                name="date"
                label="Date"
                rules={[
                    {
                        required: true,
                        type: 'object',
                    },
                ]}
                initialValue={dayjs().add(30, 'days')}
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

        </>
    );
}
