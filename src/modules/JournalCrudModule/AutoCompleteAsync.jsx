import React, { useState, useEffect, useRef } from 'react';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import { useDebounce } from 'react-use';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { custom } from '@/redux/custom/actions';

export default function AutoCompleteAsync({
    entity,
    displayLabels,
    searchFields,
    outputValue = 'id',
    value, /// this is for update
    onChange, /// this is for update    
}) {
    const [selectOptions, setOptions] = useState([]);
    const [currentValue, setCurrentValue] = useState(undefined);
    const isUpdating = useRef(true);
    const isSearching = useRef(false);
    const [searching, setSearching] = useState(false);
    const [valToSearch, setValToSearch] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    // const dispatch = useDispatch();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [displayVal, setDisplayVal] = useState('');

    const [, cancel] = useDebounce(
        () => {
            //  setState("Typing stopped");
            setDebouncedValue(valToSearch);
        },
        500,
        [valToSearch]
    );

    const asyncSearch = (options) => {
        return request.search({ entity, options });
    };
    let { onFetch, result, isSuccess, isLoading } = useOnFetch();

    const labels = (optionField) => {
        return displayLabels.map((x) => optionField[x]).join(' ');
    };

    useEffect(() => {
        if (debouncedValue != '') {
            const options = {
                q: debouncedValue,
                fields: searchFields,
            };
            onFetch(() => asyncSearch(options));
        }
        return () => {
            cancel();
        };
    }, [debouncedValue]);

    const onSearch = (searchText) => {
        if (searchText && searchText != '') {
            isSearching.current = true;
            setSearching(true);
            setOptions([]);
            setCurrentValue(undefined);
            setValToSearch(searchText);
        }
    };

    useEffect(() => {
        if (isSearching.current) {
            if (isSuccess) {
                setOptions(result);
            } else {
                setSearching(false);
                setCurrentValue(undefined);
                setOptions([]);
            }
        }
    }, [isSuccess, result]);

    useEffect(() => {
        // this for update Form , it's for setField
        if (value && isUpdating.current) {
            if (!isSearching.current) {
                setOptions([value]);
            }
            setCurrentValue(value[outputValue] || value); // set nested value or value         
            onChange(value[outputValue] || value);
            isUpdating.current = false;
        }
    }, [value]);
    // const [isVisible, setIsVisible] = React.useState('hidden');
    // const toggle = React.useCallback((newValue, index, onChange, selectOptions) => {
    //     //console.log('hi somak: ', newValue, index, onChange, selectOptions[0]);
    //     //setIsVisible(isVisible === 'visible' ? 'hidden' : 'visible');
    // }, [isVisible, setIsVisible]);
    return (
        <Select
            loading={isLoading}
            showSearch
            placeholder={'Search Here'}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={searching ? '... Searching' : 'Not Found'}
            value={currentValue}
            onSearch={onSearch}
            // onChange={(newValue, index) => {
            //     console.log('somaky hey', onChange);
            //     if (onChange && newValue != undefined) {
            //         onChange(newValue[outputValue] || newValue, index);
            //         // const selectedItem = (selectOptions) =>
            //         //     selectOptions.find((item) => item.id === newValue[outputValue] || newValue);            
            //     }
            // }}
            onChange={(newValue, index) => {
                if (onChange && newValue != undefined) {
                    //dispatch(custom.currentItem({ data: selectOptions[0] }));
                    onChange(newValue[outputValue] || newValue, index);
                    //setDisplayVal(index.children); // set nested value or value 
                }
                //toggle(newValue, index, onChange, selectOptions)
            }
            }
            //onClick={toggle}
            //onClick={(e) => toggle(e)}
            onClear={(e) => {
                setCurrentValue(undefined);
                setOptions([]);
                onChange('');
            }}
            style={{ width: '120%', marginRight: '0rem' }}
            allowClear
        >
            {selectOptions.map((optionField) => (
                <Select.Option
                    key={optionField[outputValue] || optionField}
                    value={optionField[outputValue] || optionField}
                >
                    {labels(optionField)}
                </Select.Option>
            ))}
        </Select>
    );
}
