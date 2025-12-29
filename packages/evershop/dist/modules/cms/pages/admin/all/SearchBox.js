import Spinner from '@components/admin/Spinner.js';
import React, { useRef, useState } from 'react';
import { useQuery } from 'urql';
import { NoResult } from './search/NoResult.js';
import { Results } from './search/Results.js';
import './SearchBox.scss';
const useClickOutside = (ref, callback)=>{
    const handleClick = (e)=>{
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(()=>{
        document.addEventListener('click', handleClick);
        return ()=>{
            document.removeEventListener('click', handleClick);
        };
    });
};
const SearchQuery = `
  query Query ($filters: [FilterInput]) {
    customers(filters: $filters) {
      items {
        customerId
        uuid
        fullName
        email
        url: editUrl
      }
    }
    products(filters: $filters) {
      items {
        productId
        uuid
        sku
        name
        url: editUrl
      }
    }
    orders(filters: $filters) {
      items {
        orderId
        uuid
        orderNumber
        url: editUrl
      }
    }
  }
`;
export default function SearchBox({ resourceLinks }) {
    const [keyword, setKeyword] = React.useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const InputRef = useRef(null);
    const clickRef = React.useRef(null);
    const onClickOutside = ()=>{
        if (InputRef.current !== document.activeElement) {
            setShowResult(false);
        }
    };
    useClickOutside(clickRef, onClickOutside);
    const [result, reexecuteQuery] = useQuery({
        query: SearchQuery,
        variables: {
            filters: keyword ? [
                {
                    key: 'keyword',
                    operation: 'eq',
                    value: keyword
                }
            ] : []
        },
        pause: true
    });
    const { data, fetching } = result;
    React.useEffect(()=>{
        setLoading(true);
        if (keyword) {
            setShowResult(true);
        } else {
            setShowResult(false);
        }
        const timer = setTimeout(()=>{
            if (keyword) {
                reexecuteQuery({
                    requestPolicy: 'network-only'
                });
                setLoading(false);
            }
        }, 1500);
        return ()=>clearTimeout(timer);
    }, [
        keyword
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "search-box max-w-lg"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field flex items-center justify-start relative mb-0"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        style: {
            width: '1rem',
            height: '1rem'
        },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        className: "absolute left-2 pointer-events-none"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    })), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: "Search",
        className: "!pl-7 bg-gray-50 focus:bg-white",
        ref: InputRef,
        onChange: (e)=>setKeyword(e.target.value)
    })), showResult && /*#__PURE__*/ React.createElement("div", {
        className: "search-result",
        ref: clickRef
    }, (loading || fetching) && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: 25,
        height: 25
    })), !keyword && /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/ React.createElement("span", null, "Search for products, order and other resources")), data?.products.items.length === 0 && data?.customers.items.length === 0 && data?.orders.items.length === 0 && keyword && !loading && /*#__PURE__*/ React.createElement(NoResult, {
        keyword: keyword,
        resourseLinks: resourceLinks
    }), data && !loading && !fetching && (data?.products.items.length > 0 || data?.customers.items.length > 0 || data?.orders.items.length > 0) && /*#__PURE__*/ React.createElement(Results, {
        keyword: keyword,
        results: data
    })));
}
export const layout = {
    areaId: 'header',
    sortOrder: 20
};
