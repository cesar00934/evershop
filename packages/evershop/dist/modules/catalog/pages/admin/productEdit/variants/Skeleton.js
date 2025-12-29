import React from 'react';
const SkeletonRow = ()=>/*#__PURE__*/ React.createElement("tr", {
        className: "border-b border-gray-200"
    }, /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-7 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-5 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-16 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-10 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-4 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-10 h-4 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/ React.createElement("td", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "w-7 h-5 bg-gray-200 rounded animate-pulse"
    })));
export const Skeleton = ({ rows = 5, className = '' })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: `w-full ${className}`
    }, /*#__PURE__*/ React.createElement("table", {
        className: "w-full border-collapse bg-white rounded-lg shadow-sm"
    }, /*#__PURE__*/ React.createElement("tbody", null, Array.from({
        length: rows
    }, (_, index)=>/*#__PURE__*/ React.createElement(SkeletonRow, {
            key: index
        })))));
};
