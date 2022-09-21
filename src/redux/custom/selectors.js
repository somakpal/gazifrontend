import { createSelector } from 'reselect';

const selectCustom = (state) => state.custom;

// export const selectCurrentItem = createSelector([selectCrud], (crud) => crud.current);

export const selectListItems = createSelector([selectCustom], (custom) => custom.list);
export const selectDeletedItem = createSelector([selectCustom], (custom) => custom.delete);
export const selectBalances = createSelector([selectCustom], (custom) => custom.balances);

export const selectItemById = (itemId) =>
    createSelector(selectListItems, (list) => list.result.items.find((item) => item.id === itemId));