import { Card } from '@components/admin/Card';
import { Filter } from '@components/admin/grid/Filter';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Pagination } from '@components/admin/grid/Pagination';
import { Status } from '@components/admin/Status.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CouponName } from './rows/CouponName.js';
function Actions({ coupons = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const updateCoupons = async (status)=>{
        setIsLoading(true);
        const promises = coupons.filter((coupon)=>selectedIds.includes(coupon.uuid)).map((coupon)=>axios.patch(coupon.updateApi, {
                status,
                coupon: coupon.coupon
            }));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const deleteCoupons = async ()=>{
        setIsLoading(true);
        const promises = coupons.filter((coupon)=>selectedIds.includes(coupon.uuid)).map((coupon)=>axios.delete(coupon.deleteApi));
        await Promise.all(promises);
        setIsLoading(false);
        // Refresh the page
        window.location.reload();
    };
    const actions = [
        {
            name: 'Disable',
            onAction: ()=>{
                openAlert({
                    heading: `Disable ${selectedIds.length} coupons`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Disable',
                        onAction: async ()=>{
                            await updateCoupons(0);
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
                    heading: `Enable ${selectedIds.length} coupons`,
                    content: 'Are you sure?',
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Enable',
                        onAction: async ()=>{
                            await updateCoupons(1);
                        },
                        variant: 'critical',
                        isLoading: false
                    }
                });
            }
        },
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} coupons`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteCoupons();
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
    coupons: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired,
        coupon: PropTypes.string.isRequired
    })).isRequired
};
export default function CouponGrid({ coupons: { items: coupons, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement(Form, {
            submitBtn: false,
            id: "couponGridFilter"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex gap-5 justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Area, {
            id: "couponGridFilter",
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(InputField, {
                                name: "coupon",
                                placeholder: "Search",
                                defaultValue: currentFilters.find((f)=>f.key === 'coupon')?.value,
                                onKeyPress: (e)=>{
                                    // If the user press enter, we should submit the form
                                    if (e.key === 'Enter') {
                                        const url = new URL(document.location);
                                        const coupon = e.target?.value;
                                        if (coupon) {
                                            url.searchParams.set('coupon[operation]', 'like');
                                            url.searchParams.set('coupon[value]', coupon);
                                        } else {
                                            url.searchParams.delete('coupon[operation]');
                                            url.searchParams.delete('coupon[value]');
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
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(Filter, {
                                options: [
                                    {
                                        label: 'Free shipping',
                                        value: '1',
                                        onSelect: ()=>{
                                            const url = new URL(document.location);
                                            url.searchParams.set('free_shipping', 1);
                                            window.location.href = url;
                                        }
                                    },
                                    {
                                        label: 'No free shipping',
                                        value: '0',
                                        onSelect: ()=>{
                                            const url = new URL(document.location);
                                            url.searchParams.set('free_shipping', 0);
                                            window.location.href = url;
                                        }
                                    }
                                ],
                                selectedOption: currentFilters.find((f)=>f.key === 'free_shipping') ? currentFilters.find((f)=>f.key === 'free_shipping').value === '1' ? 'Free shipping' : 'No free shipping' : undefined,
                                title: "Free shipping?"
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
            if (e.target.checked) setSelectedRows(coupons.map((c)=>c.uuid));
            else setSelectedRows([]);
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        id: "couponGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Coupon Code",
                            name: "coupon",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "State Date"
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "End Date"
                        })
                },
                sortOrder: 30
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Status",
                            name: "status",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 40
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            title: "Used Times",
                            name: "used_time",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 50
            }
        ]
    }))), /*#__PURE__*/ React.createElement("tbody", null, /*#__PURE__*/ React.createElement(Actions, {
        coupons: coupons,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), coupons.map((c)=>/*#__PURE__*/ React.createElement("tr", {
            key: c.couponId
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
            id: "couponGridRow",
            row: c,
            noOuter: true,
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(CouponName, {
                                url: c.editUrl,
                                name: c.coupon
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, c.startDate?.text || '--')
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, c.endDate?.text || '--')
                    },
                    sortOrder: 30
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement(Status, {
                                status: parseInt(c.status, 10)
                            })
                    },
                    sortOrder: 40
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement("td", null, c.usedTime)
                    },
                    sortOrder: 50
                }
            ]
        }))))), coupons.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center"
    }, "There is no coupon to display"), /*#__PURE__*/ React.createElement(Pagination, {
        total: total,
        limit: limit,
        page: page
    }));
}
CouponGrid.propTypes = {
    coupons: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            couponId: PropTypes.number.isRequired,
            uuid: PropTypes.string.isRequired,
            coupon: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            usedTime: PropTypes.number.isRequired,
            startDate: PropTypes.shape({
                text: PropTypes.string.isRequired
            }),
            endDate: PropTypes.shape({
                text: PropTypes.string.isRequired
            }),
            editUrl: PropTypes.string.isRequired,
            updateApi: PropTypes.string.isRequired,
            deleteApi: PropTypes.string.isRequired
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
    coupons (filters: $filters) {
      items {
        couponId
        uuid
        coupon
        status
        usedTime
        startDate {
          text
        }
        endDate {
          text
        }
        editUrl
        updateApi
        deleteApi
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
