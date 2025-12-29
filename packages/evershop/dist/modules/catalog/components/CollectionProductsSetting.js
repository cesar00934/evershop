import { Card } from '@components/admin/Card.js';
import Spinner from '@components/admin/Spinner.js';
import { NumberField } from '@components/common/form/NumberField.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'urql';
const SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    collections(filters: $filters) {
      items {
        collectionId
        uuid
        code
        name
      }
      total
    }
  }
`;
function CollectionProductsSetting({ collectionProductsWidget: { collection, count, countPerRow } }) {
    const limit = 10;
    const [inputValue, setInputValue] = React.useState(null);
    const [selectedCollection, setSelectedCollection] = React.useState(collection);
    const [page, setPage] = React.useState(1);
    const { register, setValue } = useFormContext();
    const [result, reexecuteQuery] = useQuery({
        query: SearchQuery,
        variables: {
            filters: inputValue ? [
                {
                    key: 'name',
                    operation: 'like',
                    value: inputValue
                },
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                },
                {
                    key: 'limit',
                    operation: 'eq',
                    value: limit.toString()
                }
            ] : [
                {
                    key: 'limit',
                    operation: 'eq',
                    value: limit.toString()
                },
                {
                    key: 'page',
                    operation: 'eq',
                    value: page.toString()
                }
            ]
        },
        pause: true
    });
    React.useEffect(()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    }, []);
    React.useEffect(()=>{
        const timer = setTimeout(()=>{
            if (inputValue !== null) {
                reexecuteQuery({
                    requestPolicy: 'network-only'
                });
            }
        }, 1500);
        return ()=>clearTimeout(timer);
    }, [
        inputValue
    ]);
    React.useEffect(()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    }, [
        page
    ]);
    const { data, fetching, error } = result;
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-red-500"
        }, "There was an error fetching collections.", error.message);
    }
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Select a collection"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: ""
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "text",
        value: inputValue || '',
        placeholder: "Search collections",
        onChange: (e)=>setInputValue(e.target.value)
    })), /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...register('settings[collection]'),
        defaultValue: selectedCollection
    })), fetching && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: 25,
        height: 25
    })), !fetching && data && /*#__PURE__*/ React.createElement("div", {
        className: "divide-y"
    }, data.collections.items.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "p-2 border border-divider rounded flex justify-center items-center"
    }, inputValue ? /*#__PURE__*/ React.createElement("p", null, 'No collections found for query "', inputValue, "”") : /*#__PURE__*/ React.createElement("p", null, "You have no collections to display")), data.collections.items.map((collection)=>/*#__PURE__*/ React.createElement("div", {
            key: collection.uuid,
            className: "grid grid-cols-8 gap-5 py-3 border-divider items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "col-span-6"
        }, /*#__PURE__*/ React.createElement("h3", null, collection.name)), /*#__PURE__*/ React.createElement("div", {
            className: "col-span-2 flex items-center justify-end"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "radio",
            checked: collection.code === selectedCollection,
            onChange: (e)=>{
                if (e.target.checked) {
                    setSelectedCollection(collection.code);
                    setValue('settings[collection]', collection.code, {
                        shouldDirty: true
                    });
                }
            },
            className: "ml-2 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        }))))))), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Settings"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mt-3"
    }, /*#__PURE__*/ React.createElement(NumberField, {
        name: "settings[count]",
        label: "Total products",
        defaultValue: count,
        required: true,
        validation: {
            min: 1,
            required: 'Count is required'
        },
        min: 1,
        placeholder: "Number of products"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "form-field"
    }, /*#__PURE__*/ React.createElement(NumberField, {
        name: "settings[countPerRow]",
        label: "Products per row",
        min: 1,
        validation: {
            min: 1,
            required: 'Count per row is required'
        },
        required: true,
        defaultValue: countPerRow,
        placeholder: "Number of products per row"
    })))));
}
export default CollectionProductsSetting;
export const query = `
  query Query($collection: String, $count: Int, $countPerRow: Int) {
    collectionProductsWidget(collection: $collection, count: $count, countPerRow: $countPerRow) {
      collection
      count
      countPerRow
    }
  }
`;
export const variables = `{
  collection: getWidgetSetting("collection"),
  count: getWidgetSetting("count"),
  countPerRow: getWidgetSetting("countPerRow")
}`;
