import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import './Pagination.scss';
export function Pagination({ total, limit, page }) {
    const limitInput = React.useRef(null);
    React.useEffect(()=>{
        if (limitInput.current) {
            limitInput.current.value = limit.toString();
        }
    }, []);
    const onKeyPress = (e)=>{
        e.preventDefault();
        let pageNumber = parseInt(e.target.value, 10);
        if (page < 1) pageNumber = 1;
        if (page > Math.ceil(total / limit)) pageNumber = Math.ceil(total / limit);
        const url = new URL(window.location.href);
        url.searchParams.set('page', pageNumber.toString());
        window.location.href = url.href;
    };
    const onPrev = (e)=>{
        e.preventDefault();
        const prev = page - 1;
        if (page === 1) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', prev.toString());
        window.location.href = url.href;
    };
    const onNext = (e)=>{
        e.preventDefault();
        const next = page + 1;
        if (page * limit >= total) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', next.toString());
        window.location.href = url.href;
    };
    const onFirst = (e)=>{
        e.preventDefault();
        if (page === 1) return;
        const url = new URL(window.location.href);
        url.searchParams.delete('page');
        window.location.href = url.href;
    };
    const onLast = (e)=>{
        e.preventDefault();
        if (page === Math.ceil(total / limit)) return;
        const url = new URL(window.location.href);
        url.searchParams.set('page', Math.ceil(total / limit).toString());
        window.location.href = url.href;
    };
    const onKeyPressLimit = (e)=>{
        if (e.which !== 13) return;
        e.preventDefault();
        const limitNumber = parseInt(e.target.value, 10);
        if (limitNumber < 1) return;
        const url = new URL(window.location.href);
        url.searchParams.set('limit', limitNumber.toString());
        window.location.href = url.href;
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "pagination flex px-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between w-full space-x-2 mt-2 mb-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex space-x-2 items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("span", null, "Show")), /*#__PURE__*/ React.createElement("div", {
        className: "limit"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field flex items-center",
        style: {
            width: '4rem',
            marginBottom: '0'
        }
    }, /*#__PURE__*/ React.createElement("input", {
        type: "number",
        onKeyDown: (e)=>onKeyPressLimit(e),
        ref: limitInput
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("span", null, "per page"))), /*#__PURE__*/ React.createElement("div", {
        className: "flex space-x-2"
    }, page > 1 && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "first self-center"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>onFirst(e)
    }, /*#__PURE__*/ React.createElement(ChevronDoubleLeftIcon, {
        width: 20,
        height: 20
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "prev self-center"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>onPrev(e)
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-4 w-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M15 19l-7-7 7-7"
    }))))), /*#__PURE__*/ React.createElement("div", {
        className: "current",
        style: {
            width: '5rem'
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement("select", {
        onChange: (e)=>{
            onKeyPress(e);
        }
    }, Array.from({
        length: Math.ceil(total / limit)
    }, (_, i)=>i + 1).map((item)=>/*#__PURE__*/ React.createElement("option", {
            key: item,
            value: item
        }, item))))), page * limit < total && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "next self-center"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>onNext(e)
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-4 w-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 5l7 7-7 7"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "last self-center"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>onLast(e)
    }, /*#__PURE__*/ React.createElement(ChevronDoubleRightIcon, {
        width: 20,
        height: 20
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("span", null, total, " records")))));
}
