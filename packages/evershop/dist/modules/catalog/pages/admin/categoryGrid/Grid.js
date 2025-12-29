import { Card } from '@components/admin/Card';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Pagination } from '@components/admin/grid/Pagination';
import { Status } from '@components/admin/Status.js';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CategoryNameRow } from './rows/CategoryName.js';
function Actions({ categories = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const deleteCategories = async ()=>{
        setIsLoading(true);
        const promises = categories.filter((category)=>selectedIds.includes(category.uuid)).map((category)=>axios.delete(category.deleteApi));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} categories`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteCategories();
                        },
                        variant: 'critical',
                        isLoading
                    }
                });
            }
        }
    ];
    return /*#__PURE__*/ React.createElement("tr", null, selectedIds.length === 0 && null, selectedIds.length > 0 && /*#__PURE__*/ React.createElement("td", {
        style: {
            borderTop: 0
        },
        colSpan: "100"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "inline-flex border border-divider rounded justify-items-start"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "font-semibold pt-2 pb-2 pl-4 pr-4"
    }, selectedIds.length, " selected"), actions.map((action, index)=>/*#__PURE__*/ React.createElement("a", {
            key: index,
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                action.onAction();
            },
            className: "font-semibold pt-2 pb-2 pl-4 pr-4 block border-l border-divider self-center"
        }, /*#__PURE__*/ React.createElement("span", null, action.name))))));
}
Actions.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired
    })).isRequired
};
export default function CategoryGrid({ categories: { items: categories, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement(Form, {
            submitBtn: false,
            id: "categoryGridFilter"
        }, /*#__PURE__*/ React.createElement(InputField, {
            name: "name",
            placeholder: "Search",
            defaultValue: currentFilters.find((f)=>f.key === 'name')?.value,
            onKeyPress: (e)=>{
                // If the user press enter, we should submit the form
                if (e.key === 'Enter') {
                    const url = new URL(document.location);
                    const name = e.target?.value;
                    if (name) {
                        url.searchParams.set('name[operation]', 'like');
                        url.searchParams.set('name[value]', name);
                    } else {
                        url.searchParams.delete('name[operation]');
                        url.searchParams.delete('name[value]');
                    }
                    window.location.href = url;
                }
            }
        })),
        actions: [
            {
                variant: 'interactive',
                name: 'Clear filter',
                onAction: ()=>{
                    // Just get the url and remove all query params
                    const url = new URL(document.location);
                    url.search = '';
                    window.location.href = url.href;
                }
            }
        ]
    }), /*#__PURE__*/ React.createElement("table", {
        className: "listing sticky"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        className: "align-bottom"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "form-field mb-0"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "checkbox",
        onChange: (e)=>{
            if (e.target.checked) {
                setSelectedRows(categories.map((c)=>c.uuid));
            } else {
                setSelectedRows([]);
            }
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        className: "",
        id: "categoryGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Category Name",
                            name: "name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "status",
                            title: "Status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "include_in_nav",
                            title: "Include In Menu",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 30
            }
        ]
    }))), /*#__PURE__*/ React.createElement("tbody", null, /*#__PURE__*/ React.createElement(Actions, {
        categories: categories,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), categories.map((c)=>/*#__PURE__*/ React.createElement("tr", {
            key: c.categoryId
        }, /*#__PURE__*/ React.createElement("td", {
            style: {
                width: '2rem'
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "checkbox",
            checked: selectedRows.includes(c.uuid),
            onChange: (e)=>{
                if (e.target.checked) setSelectedRows(selectedRows.concat([
                    c.uuid
                ]));
                else setSelectedRows(selectedRows.filter((r)=>r !== c.uuid));
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            className: "",
            id: "categoryGridRow",
            row: c,
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CategoryNameRow, {
                                id: "name",
                                category: c
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(c.status, 10)
                            })
                    },
                    sortOrder: 25
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, c.includeInNav ? 'Yes' : 'No')
                    },
                    sortOrder: 30
                }
            ]
        }))))), categories.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center"
    }, "There is no category to display"), /*#__PURE__*/ React.createElement(Pagination, {
        total: total,
        limit: limit,
        page: page
    }));
}
CategoryGrid.propTypes = {
    categories: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            categoryId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            includeInNav: PropTypes.number.isRequired,
            editUrl: PropTypes.string.isRequired,
            deleteApi: PropTypes.string.isRequired,
            path: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired
            }))
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    }).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    categories (filters: $filters) {
      items {
        categoryId
        uuid
        name
        status
        includeInNav
        editUrl
        deleteApi
        path {
          name
        }
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;
export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
