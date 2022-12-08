import React, { useLayoutEffect } from 'react';
import DataTableDropMenu from '@/modules/ProductModule/DataTableDropMenu';
// import Delete from '@/modules/SaleModule/DeleteItem';
import { useSelector, useDispatch } from 'react-redux';
import { useErpContext } from '@/context/erp';
import { erp } from '@/redux/erp/actions';

export default function SaleModule({ config }) {  
  const dispatch = useDispatch();
  const { state } = useErpContext();

  useLayoutEffect(() => {
    dispatch(erp.resetState());
  }, []);

  return (
    <>      
      <DataTableDropMenu config={config} />      
    </>
  );
}

