import React from 'react';
import dayjs from 'dayjs';
import { ErpContextProvider } from '@/context/erp';
import JournalModule from '@/modules/JournalModule';
import JournalForm from '@/forms/JournalForm';

export default function Journal({ match }) {
    const mode = match.params.mode ? match.params.mode : 'read';
    // const ledgerId = match.params.id ? match.params.id : '';
    //match.params.id || '';
    // console.log('somak bhai: ' + ledgerId);
    const entity = 'journal';
    const relations = 'ledger';
    //date,ledger.name,jrtype,amount
    const searchConfig = {
        displayLabels: ['date', 'ledgercd', 'jrtype', 'amount'],
        searchFields: 'ledger.name,ledger.code',
        outputValue: 'id',
    };

    const PANEL_TITLE = 'Journal Panel';
    const dataTableTitle = 'Journals';
    const entityDisplayLabels = ['date', 'ledger.name', 'jrtype', 'amount'];

    const readColumns = [
        { title: 'Date', dataIndex: 'date', isDate: true },
        { title: 'Ledger', dataIndex: 'ledger.name' },
        { title: 'Dr/Cr', dataIndex: 'jrtype' },
        { title: 'Particular', dataIndex: 'particular' },
        { title: 'Amount', dataIndex: 'amount' }
    ];

    const dataTableColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => {
                return dayjs(date).format('DD/MM/YYYY');
            },
        },
        { title: "Code", dataIndex: ['ledger', 'code'] },
        { title: "Ledger", dataIndex: ['ledger', 'name'] },
        { title: 'Cr/Dr', dataIndex: 'jrtype' },
        { title: 'Amount', dataIndex: 'amount' },
    ];
    const ADD_NEW_ENTITY = 'Add';
    const DATATABLE_TITLE = 'Journals List';
    const ENTITY_NAME = 'Journal';
    const CREATE_ENTITY = 'Create Journal';
    const UPDATE_ENTITY = 'Update Journal';

    const config = {
        entity,
        relations,
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
            <JournalModule
                createForm={<JournalForm />}
                updateForm={<JournalForm isUpdateForm={true} />}
                config={config}
            />
        </ErpContextProvider>
    );


}
