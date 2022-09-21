import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectDeletedItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';

import { custom } from '@/redux/custom/actions';
import { selectListItems } from '@/redux/custom/selectors';

export default function DeleteModal({ config }) {
    let {
        entity,
        entityDisplayLabels,
        deleteMessage = 'Do you want delete : ',
        modalTitle = 'Remove Item',
        relations = '',
        ledgerId
    } = config;
    const dispatch = useDispatch();
    const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
    const { state, crudContextAction } = useCrudContext();
    const { isModalOpen } = state;
    const { modal } = crudContextAction;
    const [displayItem, setDisplayItem] = useState('');

    const { result: listResult } = useSelector(selectListItems);
    const { pagination } = listResult;

    useEffect(() => {
        if (isSuccess) {
            modal.close();
            const options = { page: pagination.current || 1, ledgerId: ledgerId, relations: relations };
            //dispatch(custom.list({ entity, options }));
            dispatch(crud.list({ entity, options }));
            dispatch(custom.balances({ entity, options }));
            //dispatch(crud.list({ entity }));
            // dispatch(crud.resetAction({actionType:"delete"})); // check here maybe it wrong
        }
        if (current) {
            let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

            setDisplayItem(labels);
        }
    }, [isSuccess, current]);

    const handleOk = () => {
        const id = current.id;
        dispatch(crud.delete({ entity, id }));
    };
    const handleCancel = () => {
        if (!isLoading) modal.close();
    };
    return (
        <Modal
            title={modalTitle}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={isLoading}
        >
            <p>
                {deleteMessage}
                {displayItem}
            </p>
        </Modal>
    );
}