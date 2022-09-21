import React from 'react';

import CrudModule from '@/modules/CrudModule';
import LedgerForm from '@/forms/LedgerForm';

export default function Ledger() {
    const entity = 'ledger';
    const searchConfig = {
        displayLabels: ['name'],
        searchFields: 'code,name',
        outputValue: 'id',
    };

    const PANEL_TITLE = 'Ledger Panel';
    const dataTableTitle = 'Ledger Lists';
    const entityDisplayLabels = ['name'];

    const readColumns = [
        { title: 'Code', dataIndex: 'code' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Balance', dataIndex: 'balance' }
    ];
    const linkval = '/journal';
    const dataTableColumns = [
        {
            dataIndex: "id",
            title: "",
            render: (Value) => {
                return (
                    <a
                        onClick={(event) => event.stopPropagation()}
                        href={linkval + '/' + Value}
                    >
                        Journals
                    </a>
                );
            }
        },
        { title: 'Code', dataIndex: 'code' },
        { title: 'Ledger', dataIndex: 'name' },
        { title: 'Balance', dataIndex: 'balance' },
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
    };
    return (
        <CrudModule
            createForm={<LedgerForm />}
            updateForm={<LedgerForm isUpdateForm={true} />}
            config={config}
        />
    );
}
