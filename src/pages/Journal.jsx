import React from 'react';
import dayjs from 'dayjs';
// import CrudModule from '@/modules/CrudModule';
import JournalCrudModule from '@/modules/JournalCrudModule';
import JournalForm from '@/forms/JournalForm';

export default function Journal({ match }) {
    const ledgerId = match.params.id ? match.params.id : '';
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
        ledgerId
    };
    // return (
    //     <CrudModule
    //         createForm={<JournalForm />}
    //         updateForm={<JournalForm isUpdateForm={true} />}
    //         config={config}
    //     />
    // );

    return (
        <JournalCrudModule
            createForm={<JournalForm />}
            updateForm={<JournalForm isUpdateForm={true} />}
            config={config}
        />
    );


}
