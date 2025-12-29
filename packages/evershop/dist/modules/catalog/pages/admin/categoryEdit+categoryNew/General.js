import { Card } from '@components/admin/Card.js';
import { CategoryTree } from '@components/admin/CategoryTree.js';
import Area from '@components/common/Area.js';
import { Editor } from '@components/common/form/Editor.js';
import { InputField } from '@components/common/form/InputField.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import './General.scss';
const ParentCategory = ({ parent })=>{
    const [selecting, setSelecting] = React.useState(false);
    const [category, setCategory] = React.useState(parent || null);
    const modal = useModal();
    return /*#__PURE__*/ React.createElement("div", {
        className: "mt-4 relative"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, "Parent category"), category && /*#__PURE__*/ React.createElement("div", {
        className: "border rounded border-[#c9cccf] mb-2 p-2"
    }, category.path.map((item, index)=>/*#__PURE__*/ React.createElement("span", {
            key: item.name,
            className: "text-gray-500"
        }, item.name, index < category.path.length - 1 && ' > ')), /*#__PURE__*/ React.createElement("span", {
        className: "text-interactive pl-5 hover:underline"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "Change")), /*#__PURE__*/ React.createElement("span", {
        className: "text-critical pl-5 hover:underline"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setCategory(null);
        }
    }, "Unlink"))), !selecting && !category && /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setSelecting(!selecting);
        },
        className: "text-interactive"
    }, "Select category"), /*#__PURE__*/ React.createElement(Modal, {
        title: "Select a parent category",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "px-2"
    }, /*#__PURE__*/ React.createElement(CategoryTree, {
        selectedCategories: category ? [
            category
        ] : [],
        onSelect: (c)=>{
            setCategory(c);
            modal.close();
        }
    }))), /*#__PURE__*/ React.createElement(InputField, {
        type: "hidden",
        name: "parent_id",
        value: category?.categoryId || ''
    }));
};
export default function General({ category }) {
    const fields = [
        {
            component: {
                default: /*#__PURE__*/ React.createElement(InputField, {
                    name: "name",
                    label: "Category Name",
                    placeholder: "Enter Category Name",
                    defaultValue: category?.name || '',
                    required: true,
                    validation: {
                        required: 'Category name is required'
                    }
                })
            },
            sortOrder: 10,
            id: 'name'
        },
        {
            component: {
                default: ParentCategory
            },
            props: {
                parent: category?.parent,
                currentId: category?.categoryId
            },
            sortOrder: 15,
            id: 'parent'
        },
        {
            component: {
                default: /*#__PURE__*/ React.createElement(Editor, {
                    name: "description",
                    label: "Description",
                    value: category?.description || []
                })
            },
            sortOrder: 30
        }
    ];
    return /*#__PURE__*/ React.createElement(Card, {
        title: "General"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "categoryEditGeneral",
        coreComponents: fields
    })));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      categoryId
      name
      hasChildren
      description
      status
      parent {
        categoryId
        hasChildren
        name
        path {
          name
        }
      }
    }
  }
`;
