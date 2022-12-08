import React from 'react';
import dayjs from 'dayjs';
import { ErpContextProvider } from '@/context/erp';
import SaleModule from '@/modules/SaleModule';
import SaleForm from '@/modules/SaleModule/SaleForm';

export default function Sale({ match }) {
    const mode = match.params.mode ? match.params.mode : 'read';
    const entity = 'sale';
    const relations = 'product';
    const dataTableTitle = 'Sales';
    const entityDisplayLabels = ['date', 'product.name', 'chlnNo', 'unit', 'qtyPieces', 'amount'];

    const dataTableColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => {
                return dayjs(date).format('DD/MM/YYYY');
            },
        },
        { title: 'Chalan', dataIndex: 'chlnNo' },
        { title: "Product", dataIndex: ['product', 'name'] },
        { title: 'Unit', dataIndex: 'unit' },
        { title: 'CFT', dataIndex: 'qtyCFT' },
        { title: 'PIECES', dataIndex: 'qtyPieces' },
        { title: 'Rate', dataIndex: 'rate' },
        { title: 'Amount', dataIndex: 'amount' },
    ];
    const ADD_NEW_ENTITY = 'Add';
    const DATATABLE_TITLE = 'Sales List';
    const ENTITY_NAME = 'Sale';
    const CREATE_ENTITY = 'Create Sale';
    const UPDATE_ENTITY = 'Update Sale';

    const config = {
        entity,
        relations,
        dataTableTitle,
        entityDisplayLabels,
        ENTITY_NAME,
        CREATE_ENTITY,
        ADD_NEW_ENTITY,
        UPDATE_ENTITY,
        DATATABLE_TITLE,
        dataTableColumns,
        mode,
    };

    return (
        <ErpContextProvider>
            <SaleModule
                createForm={<SaleForm />}
                updateForm={<SaleForm isUpdateForm={true} />}
                config={config}
            />
        </ErpContextProvider>
    );


}
