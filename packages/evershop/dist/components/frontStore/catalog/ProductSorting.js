/* eslint-disable react/prop-types */ import { useAppDispatch } from '@components/common/context/app.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useCallback } from 'react';
const defaultSortOptions = [
    {
        code: '',
        name: _('Default'),
        label: _('Default')
    },
    {
        code: 'price',
        name: _('Price'),
        label: _('Price')
    },
    {
        code: 'name',
        name: _('Name'),
        label: _('Name')
    }
];
export function ProductSorting({ sortOptions = defaultSortOptions, defaultSortBy = '', defaultSortOrder = 'asc', showSortDirection = true, enableUrlUpdate = true, onSortChange, renderSortSelect, renderSortDirection, className = '', disabled = false }) {
    const AppContextDispatch = useAppDispatch();
    const [sortBy, setSortBy] = React.useState(()=>{
        // Check if this is browser or server
        if (typeof window !== 'undefined') {
            const params = new URL(document.location.href).searchParams;
            return params.get('ob') || defaultSortBy;
        }
        return defaultSortBy;
    });
    const [sortOrder, setSortOrder] = React.useState(()=>{
        // Check if this is browser or server
        if (typeof window !== 'undefined') {
            const params = new URL(document.location.href).searchParams;
            return params.get('od') || defaultSortOrder;
        }
        return defaultSortOrder;
    });
    const defaultSortChangeHandler = useCallback(async (newSortState)=>{
        if (!enableUrlUpdate) return;
        const currentUrl = window.location.href;
        const url = new URL(currentUrl, window.location.origin);
        if (newSortState.sortBy === '' || newSortState.sortBy === defaultSortBy) {
            url.searchParams.delete('ob');
        } else {
            url.searchParams.set('ob', newSortState.sortBy);
        }
        if (newSortState.sortOrder === defaultSortOrder) {
            url.searchParams.delete('od');
        } else {
            url.searchParams.set('od', newSortState.sortOrder);
        }
        url.searchParams.append('ajax', 'true');
        await AppContextDispatch.fetchPageData(url);
        url.searchParams.delete('ajax');
        history.pushState(null, '', url);
    }, [
        AppContextDispatch,
        enableUrlUpdate,
        defaultSortBy,
        defaultSortOrder
    ]);
    const handleSortChange = onSortChange || defaultSortChangeHandler;
    const onChangeSort = useCallback(async (newSortBy)=>{
        if (disabled) return;
        const newSortState = {
            sortBy: newSortBy,
            sortOrder
        };
        setSortBy(newSortBy);
        await handleSortChange(newSortState);
    }, [
        sortOrder,
        handleSortChange,
        disabled
    ]);
    const onChangeDirection = useCallback(async ()=>{
        if (disabled) return;
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const newSortState = {
            sortBy,
            sortOrder: newOrder
        };
        setSortOrder(newOrder);
        await handleSortChange(newSortState);
    }, [
        sortBy,
        sortOrder,
        handleSortChange,
        disabled
    ]);
    const defaultSortSelect = (props)=>/*#__PURE__*/ React.createElement("select", {
            className: "form-control",
            onChange: (e)=>props.onChange(e.target.value),
            value: props.value,
            disabled: props.disabled
        }, props.options.map((option)=>/*#__PURE__*/ React.createElement("option", {
                key: option.code,
                value: option.code,
                disabled: option.disabled
            }, option.label || option.name)));
    const defaultSortDirection = (props)=>/*#__PURE__*/ React.createElement("button", {
            type: "button",
            onClick: props.onToggle,
            disabled: props.disabled,
            className: `sort-direction-btn ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600 cursor-pointer'}`,
            "aria-label": `Sort ${props.sortOrder === 'asc' ? 'descending' : 'ascending'}`
        }, props.sortOrder === 'desc' ? /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "feather feather-arrow-up"
        }, /*#__PURE__*/ React.createElement("line", {
            x1: "12",
            y1: "19",
            x2: "12",
            y2: "5"
        }), /*#__PURE__*/ React.createElement("polyline", {
            points: "5 12 12 5 19 12"
        })) : /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "feather feather-arrow-down"
        }, /*#__PURE__*/ React.createElement("line", {
            x1: "12",
            y1: "5",
            x2: "12",
            y2: "19"
        }), /*#__PURE__*/ React.createElement("polyline", {
            points: "19 12 12 19 5 12"
        })));
    const containerContent = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            width: '120px'
        }
    }, renderSortSelect ? renderSortSelect({
        options: sortOptions,
        value: sortBy,
        onChange: onChangeSort,
        disabled
    }) : defaultSortSelect({
        options: sortOptions,
        value: sortBy,
        onChange: onChangeSort,
        disabled
    })), showSortDirection && /*#__PURE__*/ React.createElement("div", {
        className: "sort-direction self-center"
    }, renderSortDirection ? renderSortDirection({
        sortOrder,
        onToggle: onChangeDirection,
        disabled
    }) : defaultSortDirection({
        sortOrder,
        onToggle: onChangeDirection,
        disabled
    })));
    return /*#__PURE__*/ React.createElement("div", {
        className: `product-sorting ${className}`
    }, containerContent);
}
