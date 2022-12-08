import React from 'react';
import { ErpContextProvider } from '@/context/erp';
import LedgerModule from '@/modules/LedgerModule';
import LedgerForm from '@/forms/LedgerForm';

export default function Ledger({ match }) {
    const mode = match.params.mode ? match.params.mode : 'read';
    const entity = 'ledger';
    const searchConfig = {
        displayLabels: ['name'],
        searchFields: 'code,name',
        outputValue: 'id',
    };

    const PANEL_TITLE = 'Ledger Panel';
    const dataTableTitle = 'Ledgers List';
    const entityDisplayLabels = ['name'];

    const readColumns = [
        { title: 'Code', dataIndex: 'code' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Balance', dataIndex: 'balance' }
    ];
    const linkval = '/journal';
    const dataTableColumns = [
        { title: 'Code', dataIndex: 'code' },
        { title: 'Ledger', dataIndex: 'name' },
        { title: 'Debit', dataIndex: 'debitTotal' },
        { title: 'Credit', dataIndex: 'creditTotal' },
        {
            dataIndex: "balance",
            title: "Balance",
            render: (text, record) => {
                return {
                    props: {
                        style: { color: parseInt(text) >= 0 ? "black" : "red" }
                    },
                    children: <div>{text}</div>
                };
            }
        },
    ];
    const ADD_NEW_ENTITY = 'Add new Ledger';
    const DATATABLE_TITLE = 'Ledgers List';
    const ENTITY_NAME = 'Ledger';
    const CREATE_ENTITY = 'Create Ledger';
    const UPDATE_ENTITY = 'Update Ledger';

    const config = {
        entity,
        PANEL_TITLE,
        dataTableTitle,
        ENTITY_NAME,
        CREATE_ENTITY,
        ADD_NEW_ENTITY,
        UPDATE_ENTITY,
        DATATABLE_TITLE,
        readColumns,
        dataTableColumns,
        searchConfig,
        entityDisplayLabels,
        mode,
    };
    return (
        <ErpContextProvider>
            <LedgerModule
                createForm={<LedgerForm />}
                updateForm={<LedgerForm isUpdateForm={true} />}
                config={config}
            />
        </ErpContextProvider>
    );
}
