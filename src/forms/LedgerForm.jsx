import React from 'react';
import { Form, Input, Select } from 'antd';

export default function LedgerForm({ isUpdateForm = false }) {
    return (
        <>
            <Form.Item
                name="code"
                label="Ledger Code"
                rules={[
                    {
                        required: true,
                        message: 'Please input Ledger Code!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label="Ledger Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input Ledger Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

        </>
    );
}
