import { Card } from '@components/admin/Card.js';
import React from 'react';
import { CreateVariantGroup } from './CreateVariantGroup.js';
export const New = ({ currentProductUuid, createVariantGroupApi, setGroup })=>{
    const [action, setAction] = React.useState();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Card.Session, null, action === undefined && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "justify-center text-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-10"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "pr-2"
    }, "This product has some variants like color or size?"), /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive hover:underline",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setAction('create');
        }
    }, "Create a variant group")))), action === 'create' && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(CreateVariantGroup, {
        currentProductUuid: currentProductUuid,
        setGroup: setGroup,
        createVariantGroupApi: createVariantGroupApi
    }))), action === 'create' && /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("a", {
        className: "text-critical hover:underline",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            setAction(undefined);
        }
    }, "Cancel")));
};
