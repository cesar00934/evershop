import { Card } from '@components/admin/Card';
import { Filter } from '@components/admin/grid/Filter';
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
import { CustomerName } from './rows/CustomerName.js';
function Actions({ customers = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const updateCustomers = async (status)=>{
        const promises = customers.filter((customer)=>selectedIds.includes(customer.uuid)).map((customer)=>axios.patch(customer.updateApi, {
                status
            }));
        await Promise.all(promises);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Disable',
            onAction: ()=>{
                openAlert({
                    heading: `Disable ${selectedIds.length} customers`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updateCustomers(0);
                        },
                        variant: 'critical',
                        isLoading: false
                    }
                });
            }
        },
        {
            name: 'Enable',
            onAction: ()=>{
                openAlert({
                    heading: `Enable ${selectedIds.length} customers`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updateCustomers(1);
                        },
                        variant: 'critical',
                        isLoading: false
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
    }, selectedIds.length, " selected"), actions.map((action, i)=>/*#__PURE__*/ React.createElement("a", {
            key: i,
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
    customers: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired
    })).isRequired
};
export default function CustomerGrid({ customers: { items: customers, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement(Form, {
            submitBtn: false,
            id: "customerGridFilter"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex gap-5 justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Area, {
            id: "customerGridFilter",
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(InputField, {
                                name: "keyword",
                                placeholder: "Search",
                                defaultValue: currentFilters.find((f)=>f.key === 'keyword')?.value,
                                onKeyPress: (e)=>{
                                    // If the user press enter, we should submit the form
                                    if (e.key === 'Enter') {
                                        const url = new URL(document.location);
                                        const keyword = e.target?.value;
                                        if (keyword) {
                                            url.searchParams.set('keyword', keyword);
                                        } else {
                                            url.searchParams.delete('keyword');
                                        }
                                        window.location.href = url;
                                    }
                                }
                            })
                    },
                    sortOrder: 5
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(Filter, {
                                options: [
                                    {
                                        label: 'Enabled',
                                        value: '1',
                                        onSelect: ()=>{
                                            const url = new URL(document.location);
                                            url.searchParams.set('status', 1);
                                            window.location.href = url;
                                        }
                                    },
                                    {
                                        label: 'Disabled',
                                        value: '0',
                                        onSelect: ()=>{
                                            const url = new URL(document.location);
                                            url.searchParams.set('status', 0);
                                            window.location.href = url;
                                        }
                                    }
                                ],
                                selectedOption: currentFilters.find((f)=>f.key === 'status') ? currentFilters.find((f)=>f.key === 'status').value === '1' ? 'Enabled' : 'Disabled' : undefined,
                                title: "Status"
                            })
                    },
                    sortOrder: 10
                }
            ],
            currentFilters: currentFilters
        }))),
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
            if (e.target.checked) setSelectedRows(customers.map((c)=>c.uuid));
            else setSelectedRows([]);
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "customerGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Full Name",
                            name: "full_name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Email",
                            name: "email",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 15
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Status",
                            name: "status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Created At",
                            name: "created_at",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            }
        ]
    }))), /*#__PURE__*/ React.createElement("tbody", null, /*#__PURE__*/ React.createElement(Actions, {
        customers: customers,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), customers.map((c)=>/*#__PURE__*/ React.createElement("tr", {
            key: c.customerId
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "checkbox",
            checked: selectedRows.includes(c.uuid),
            onChange: (e)=>{
                if (e.target.checked) {
                    setSelectedRows(selectedRows.concat([
                        c.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((row)=>row !== c.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            id: "customerGridRow",
            row: c,
            noOuter: true,
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CustomerName, {
                                name: c.fullName,
                                url: c.editUrl
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement("td", null, c.email)
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(c.status, 10)
                            })
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, c.createdAt.text)
                    },
                    sortOrder: 25
                }
            ]
        }))))), customers.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center"
    }, "There is no customer to display"), /*#__PURE__*/ React.createElement(Pagination, {
        total: total,
        limit: limit,
        page: page
    }));
}
CustomerGrid.propTypes = {
    customers: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            customerId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            createdAt: PropTypes.shape({
                value: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired,
            editUrl: PropTypes.string.isRequired,
            updateApi: PropTypes.string.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        currentFilters: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            operation: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
export const query = `
  query Query($filters: [FilterInput]) {
    customers (filters: $filters) {
      items {
        customerId
        uuid
        fullName
        email
        status
        createdAt {
          value
          text
        }
        editUrl
        updateApi
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
