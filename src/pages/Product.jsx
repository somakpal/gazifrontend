import React from 'react';
import dayjs from 'dayjs';
import { ErpContextProvider } from '@/context/erp';
import ProductModule from '@/modules/ProductModule';
// import SaleForm from '@/modules/SaleModule/SaleForm';

export default function Product({ match }) {
    // const mode = match.params.mode ? match.params.mode : 'read';
    const entity = 'product';
    // const relations = '';
    const dataTableTitle = 'Products';
    // const entityDisplayLabels = ['date', 'product.name', 'chlnNo', 'unit', 'qtyPieces', 'amount'];

    const dataTableColumns = [        
        { title: 'Name', dataIndex: 'name' },
        { title: "Sale Qty", dataIndex: 'saleQty' },
        { title: 'Amount', dataIndex: 'saleAmt' },
        { title: 'Rate', dataIndex: 'avgRate' },        
    ];
    const ADD_NEW_ENTITY = 'Add';
    const DATATABLE_TITLE = 'Products List';
    const ENTITY_NAME = 'Product';
    // const CREATE_ENTITY = 'Create Product';
    // const UPDATE_ENTITY = 'Update Product';

    const config = {
        entity,        
        dataTableTitle,        
        ENTITY_NAME,        
        ADD_NEW_ENTITY,        
        DATATABLE_TITLE,
        dataTableColumns,        
    };

    return (
        <ErpContextProvider>
            <ProductModule config={config} />
        </ErpContextProvider>
    );
    
}
