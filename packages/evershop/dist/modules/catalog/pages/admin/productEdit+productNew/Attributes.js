import { Card } from '@components/admin/Card.js';
import { InputField } from '@components/common/form/InputField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
const getGroup = (groups = [], groupId)=>groups.find((group)=>group.groupId === groupId) || groups[0];
const getAttributeOptions = (groups, attributeId)=>{
    const attribute = groups.find((group)=>group.attributes.items.find((attr)=>attr.attribute_id === attributeId))?.attributes.items.find((attr)=>attr.attribute_id === attributeId);
    return attribute ? attribute.options : [];
};
const getAttributeSelectedValues = (attributeIndex, attributeId, attributeType)=>{
    switch(attributeType){
        case 'text':
        case 'textarea':
        case 'date':
        case 'datetime':
            return attributeIndex.find((idx)=>idx.attributeId === attributeId)?.optionText || '';
        case 'select':
            return attributeIndex.find((idx)=>idx.attributeId === attributeId)?.optionId.toString() || '';
        case 'multiselect':
            return attributeIndex.filter((idx)=>idx.attributeId === attributeId).map((idx)=>idx.optionId.toString());
        default:
            return '';
    }
};
export default function Attributes({ product, groups: { items } }) {
    const { unregister, watch } = useFormContext();
    const { fields, replace } = useFieldArray({
        name: 'attributes'
    });
    const attributeIndex = product?.attributeIndex || [];
    const currentGroup = watch('group_id', getGroup(items, product?.groupId)?.groupId || undefined);
    useEffect(()=>{
        if (currentGroup) {
            const attributes = getGroup(items, currentGroup)?.attributes.items || [];
            const newFields = attributes.map((attribute)=>({
                    attribute_code: attribute.attribute_code,
                    attribute_name: attribute.attribute_name,
                    type: attribute.type,
                    attribute_id: attribute.attribute_id,
                    value: getAttributeSelectedValues(attributeIndex, attribute.attribute_id, attribute.type),
                    is_required: attribute.is_required
                }));
            replace(newFields);
        }
    }, [
        currentGroup,
        items,
        replace,
        unregister
    ]);
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Attribute group"
    }, /*#__PURE__*/ React.createElement("div", null, product?.variantGroupId && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        defaultValue: product?.groupId,
        name: "group_id"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "border rounded border-divider p-2"
    }, /*#__PURE__*/ React.createElement("span", null, getGroup(items, product?.groupId).groupName)), /*#__PURE__*/ React.createElement("div", {
        className: "italic text-textSubdued"
    }, "Can not change the attribute group of a product that is already in a variant group.")), !product?.variantGroupId && /*#__PURE__*/ React.createElement(SelectField, {
        name: "group_id",
        label: "Attribute group",
        options: items.map((group)=>({
                value: group.groupId,
                label: group.groupName
            })),
        defaultValue: product?.groupId,
        required: true
    }))), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Attributes"
    }, /*#__PURE__*/ React.createElement("table", {
        className: "table table-auto"
    }, /*#__PURE__*/ React.createElement("tbody", null, fields.map((attribute, index)=>{
        const validation = attribute.is_required === 1 ? {
            required: `${attribute.attribute_name} is required`
        } : {};
        let Field = null;
        switch(attribute.type){
            case 'text':
                Field = /*#__PURE__*/ React.createElement(InputField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation
                });
                break;
            case 'textarea':
                Field = /*#__PURE__*/ React.createElement(TextareaField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation
                });
                break;
            case 'select':
                Field = /*#__PURE__*/ React.createElement(SelectField, {
                    name: `attributes.${index}.value`,
                    options: getAttributeOptions(items, attribute.attribute_id),
                    placeholder: "Select an option",
                    validation: validation
                });
                break;
            case 'multiselect':
                Field = /*#__PURE__*/ React.createElement(SelectField, {
                    name: `attributes.${index}.value`,
                    options: getAttributeOptions(items, attribute.attribute_id),
                    placeholder: "Select options",
                    required: attribute.is_required === 1,
                    validation: validation,
                    multiple: true
                });
                break;
            default:
                Field = /*#__PURE__*/ React.createElement(InputField, {
                    name: `attributes.${index}.value`,
                    required: attribute.is_required === 1,
                    validation: validation,
                    placeholder: _('Enter value for ${attribute}', {
                        attribute: attribute.attribute_name
                    })
                });
                break;
        }
        return /*#__PURE__*/ React.createElement("tr", {
            key: attribute.id
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("span", null, attribute.attribute_name), attribute.is_required === 1 && /*#__PURE__*/ React.createElement("span", {
            className: "required-indicator"
        }, "*")), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            value: attribute.attribute_code,
            name: `attributes.${index}.attribute_code`
        }), Field));
    })))));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 30
};
export const query = `
  query Query ($filters: [FilterInput!]) {
    product(id: getContextValue("productId", null)) {
      groupId
      variantGroupId
      attributeIndex {
        attributeId
        optionId
        optionText
      }
    },
    groups: attributeGroups(filters: $filters) {
      items {
        groupId: attributeGroupId
        groupName
        attributes {
          items {
            attribute_id: attributeId
            attribute_name: attributeName
            attribute_code: attributeCode
            type
            is_required: isRequired
            options {
              value: attributeOptionId
              label: optionText
            }
          }
        }
      }
    }
  }
`;
export const variables = `
{
  filters: [{ key: "limit", operation: 'eq', value: 1000 }]
}`;
