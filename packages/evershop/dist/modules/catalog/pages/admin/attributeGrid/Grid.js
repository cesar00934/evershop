import { Card } from '@components/admin/Card.js';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Pagination } from '@components/admin/grid/Pagination';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AttributeNameRow } from './rows/AttributeName.js';
import { GroupRow } from './rows/GroupRow.js';
function Actions({ attributes = [], selectedIds = [] }) {
    const { openAlert, closeAlert } = useAlertContext();
    const [isLoading, setIsLoading] = useState(false);
    const deleteAttributes = async ()=>{
        setIsLoading(true);
        try {
            const promises = attributes.filter((attribute)=>selectedIds.includes(attribute.uuid)).map((attribute)=>axios.delete(attribute.deleteApi, {
                    validateStatus: ()=>true
                }));
            const responses = await Promise.allSettled(promises);
            setIsLoading(false);
            responses.forEach((response)=>{
                // Get the axios response status code
                const { status } = response.value;
                if (status !== 200) {
                    throw new Error(response.value.data.error.message);
                }
            });
            // Refresh the page
            window.location.reload();
        } catch (e) {
            setIsLoading(false);
            toast.error(e.message);
        }
    };
    const actions = [
        {
            name: 'Delete',
            onAction: ()=>{
                openAlert({
                    heading: `Delete ${selectedIds.length} attributes`,
                    content: /*#__PURE__*/ React.createElement("div", null, "Can't be undone"),
                    primaryAction: {
                        title: 'Cancel',
                        onAction: closeAlert,
                        variant: 'primary'
                    },
                    secondaryAction: {
                        title: 'Delete',
                        onAction: async ()=>{
                            await deleteAttributes();
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
    attributes: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired
    })).isRequired
};
export default function AttributeGrid({ attributes: { items: attributes, total, currentFilters = [] } }) {
    const page = currentFilters.find((filter)=>filter.key === 'page') ? parseInt(currentFilters.find((filter)=>filter.key === 'page').value, 10) : 1;
    const limit = currentFilters.find((filter)=>filter.key === 'limit') ? parseInt(currentFilters.find((filter)=>filter.key === 'limit').value, 10) : 20;
    const [selectedRows, setSelectedRows] = useState([]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement(Form, {
            submitBtn: false,
            id: "attributeGridFilter"
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
            if (e.target.checked) setSelectedRows(attributes.map((a)=>a.uuid));
            else setSelectedRows([]);
        }
    }))), /*#__PURE__*/ React.createElement(Area, {
        className: "",
        id: "attributeGridHeader",
        noOuter: true,
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "name",
                            title: "Attribute Name",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(DummyColumnHeader, {
                            title: "Groups"
                        })
                },
                sortOrder: 15
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "type",
                            title: "Type",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "is_required",
                            title: "Is Required?",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 25
            },
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement(SortableHeader, {
                            name: "is_filterable",
                            title: "Is Filterable?",
                            currentFilters: currentFilters
                        })
                },
                sortOrder: 30
            }
        ]
    }))), /*#__PURE__*/ React.createElement("tbody", null, /*#__PURE__*/ React.createElement(Actions, {
        attributes: attributes,
        selectedIds: selectedRows,
        setSelectedRows: setSelectedRows
    }), attributes.map((a)=>/*#__PURE__*/ React.createElement("tr", {
            key: a.attributeId
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
            className: "form-field mb-0"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "checkbox",
            checked: selectedRows.includes(a.uuid),
            onChange: (e)=>{
                if (e.target.checked) {
                    setSelectedRows(selectedRows.concat([
                        a.uuid
                    ]));
                } else {
                    setSelectedRows(selectedRows.filter((r)=>r !== a.uuid));
                }
            }
        }))), /*#__PURE__*/ React.createElement(Area, {
            className: "",
            id: "attributeGridRow",
            row: a,
            noOuter: true,
            coreComponents: [
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(AttributeNameRow, {
                                id: "name",
                                name: a.attributeName,
                                url: a.editUrl
                            })
                    },
                    sortOrder: 10
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement(GroupRow, {
                                groups: a.groups?.items
                            })
                    },
                    sortOrder: 15
                },
                {
                    component: {
                        default: ({ areaProps })=>/*#__PURE__*/ React.createElement("td", null, a.type)
                    },
                    sortOrder: 20
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, a.isRequired ? 'Yes' : 'No')
                    },
                    sortOrder: 25
                },
                {
                    component: {
                        default: ()=>/*#__PURE__*/ React.createElement("td", null, a.isFilterable ? 'Yes' : 'No')
                    },
                    sortOrder: 30
                }
            ]
        }))))), attributes.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex w-full justify-center"
    }, "There is no attribute to display"), /*#__PURE__*/ React.createElement(Pagination, {
        total: total,
        limit: limit,
        page: page
    }));
}
AttributeGrid.propTypes = {
    attributes: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            uuid: PropTypes.string.isRequired,
            attributeId: PropTypes.string.isRequired,
            attributeName: PropTypes.string.isRequired,
            attributeCode: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            isRequired: PropTypes.number.isRequired,
            isFilterable: PropTypes.number.isRequired,
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
    attributes (filters: $filters) {
      items {
        attributeId
        uuid
        attributeName
        attributeCode
        type
        isRequired
        isFilterable
        editUrl
        updateApi
        deleteApi
        groups {
          items {
            attributeGroupId
            groupName
            updateApi
          }
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
