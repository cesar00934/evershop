import React from 'react';
import './ProductListSkeleton.scss';
export const ProductListSkeleton = ()=>{
    const skeletonItems = Array(5).fill(0);
    return /*#__PURE__*/ React.createElement("div", {
        className: "product-list-skeleton"
    }, skeletonItems.map((_, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "product-skeleton-item border-b flex justify-between items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-image w-10 h-10 bg-gray-200 rounded skeleton-pulse mr-5"
        }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-title h-5 w-30 bg-gray-200 rounded skeleton-pulse mb-2"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-id h-4 w-20 bg-gray-200 rounded skeleton-pulse"
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "select-button"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-button h-6 w-12 bg-gray-200 rounded skeleton-pulse"
        })))));
};
