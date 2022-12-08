import React, { useLayoutEffect } from 'react';
import CreateForm from '@/modules/SaleModule/CreateForm';
import UpdateForm from '@/modules/SaleModule/UpdateForm';
import DataTableDropMenu from '@/modules/SaleModule/DataTableDropMenu';
import Delete from '@/modules/SaleModule/DeleteItem';
import { useSelector, useDispatch } from 'react-redux';
import { useErpContext } from '@/context/erp';
import { erp } from '@/redux/erp/actions';

export default function SaleModule({ config, createForm, updateForm }) {
  const { mode } = config;
  const dispatch = useDispatch();
  const { state } = useErpContext();
  const { deleteModal } = state;
  useLayoutEffect(() => {
    dispatch(erp.resetState());
  }, []);

  return (
    <>
      {mode == 'create' ? <CreateForm config={config} formElements={createForm} />
        : mode == 'read' ? <DataTableDropMenu config={config} />
          : mode == 'update' ? <UpdateForm config={config} formElements={updateForm} />
            : <DataTableDropMenu config={config} />
      }
      <Delete config={config} isVisible={deleteModal.isOpen} />
    </>
  );
}

