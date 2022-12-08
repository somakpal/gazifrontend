import React, { useLayoutEffect } from 'react';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DataTableDropMenu from './DataTableDropMenu';
import Delete from './DeleteItem';
import { useSelector, useDispatch } from 'react-redux';
import { useErpContext } from '@/context/erp';
import { erp } from '@/redux/erp/actions';

export default function LedgerModule({ config, createForm, updateForm }) {
  const { mode } = config;
  const dispatch = useDispatch();
  const { state } = useErpContext();
  const { update, read, create, recordPayment, dataTableList, deleteModal } = state;
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

