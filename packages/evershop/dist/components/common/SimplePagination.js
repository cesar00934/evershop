import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
export function SimplePagination({ total, count, page, hasNext, setPage }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "simple__pagination flex gap-2 items-center"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, count, " of ", total)), /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-2"
    }, page > 1 && /*#__PURE__*/ React.createElement("a", {
        className: "hover:text-interactive border rounded p-[5px] border-divider",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page - 1);
        }
    }, /*#__PURE__*/ React.createElement(ChevronLeftIcon, {
        width: 15,
        height: 15
    })), page === 1 && /*#__PURE__*/ React.createElement("span", {
        className: "border rounded p-[5px] border-divider text-divider"
    }, /*#__PURE__*/ React.createElement(ChevronLeftIcon, {
        width: 15,
        height: 15
    })), hasNext && /*#__PURE__*/ React.createElement("a", {
        className: "hover:text-interactive border rounded p-[5px] border-divider",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setPage(page + 1);
        }
    }, /*#__PURE__*/ React.createElement(ChevronRightIcon, {
        width: 15,
        height: 15
    })), !hasNext && /*#__PURE__*/ React.createElement("span", {
        className: "border rounded p-[5px] border-divider text-divider"
    }, /*#__PURE__*/ React.createElement(ChevronRightIcon, {
        width: 15,
        height: 15
    }))));
}
