import * as actionTypes from './types';
import { request } from '@/request';
import { request as request1 } from '@/request1';

export const custom = {
    list:
        ({ entity, options = { page: 1 } }) =>
            async (dispatch) => {
                dispatch({
                    type: actionTypes.REQUEST_LOADING,
                    keyState: 'list',
                    payload: null,
                });

                let data = await request.list({ entity, options });
                //console.log('somak sexy..' + JSON.stringify(data.debitbal));
                if (data.success === true) {
                    const result = {
                        items: data.result,
                        debittotal: data.debitbal,
                        pagination: {
                            current: parseInt(data.pagination.page, 10),
                            pageSize: 10,
                            showSizeChanger: false,
                            total: parseInt(data.pagination.count, 10),
                        },
                    };
                    dispatch({
                        type: actionTypes.REQUEST_SUCCESS,
                        keyState: 'list',
                        payload: result,
                    });
                } else {
                    dispatch({
                        type: actionTypes.REQUEST_FAILED,
                        keyState: 'list',
                        payload: null,
                    });
                }
            },
    currentItem:
        ({ data }) =>
            async (dispatch) => {
                dispatch({
                    type: actionTypes.CURRENT_ITEM,
                    payload: { ...data },
                });
            },
    balances:
        ({ entity, options = { page: 1 } }) =>
            async (dispatch) => {
                let result = {};
                dispatch({
                    type: actionTypes.REQUEST_LOADING,
                    keyState: 'balances',
                    payload: null,
                });

                let data = await request1.balances({ entity, options });
                console.log('somak sexy..19', data.success + JSON.stringify(data.debitbal.debittotal));
                console.log('somak sexy..11.13', data.success + data.debitbal.debittotal + " = " + data.netbal);
                if (data.success === true) {
                    // result = {
                    //     debittotal: data.debitbal,
                    // };                    
                    result = { debitbal: data.debitbal.debittotal, creditbal: data.creditbal.credittotal, netbal: data.netbal };
                    console.log('somak sexy..' + JSON.stringify(result));
                    console.log('somak sexy22..' + result);
                    dispatch({
                        type: actionTypes.REQUEST_SUCCESS,
                        keyState: 'balances',
                        payload: result,
                    });
                } else {
                    dispatch({
                        type: actionTypes.REQUEST_FAILED,
                        keyState: 'balances',
                        payload: null,
                    });
                }
            },
};    