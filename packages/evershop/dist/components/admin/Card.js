import React from 'react';
import './Card.scss';
function Card({ title, actions = [], subdued = false, children }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: subdued ? 'card shadow subdued' : 'card shadow'
    }, (title || actions.length > 0) && /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between card-header"
    }, title && /*#__PURE__*/ React.createElement("h2", {
        className: "card-title"
    }, title), actions.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex space-x-2"
    }, actions.map((action, index)=>{
        const className = {
            primary: 'text-primary',
            critical: 'text-critical',
            interactive: 'text-interactive',
            secondary: 'text-secondary'
        };
        return /*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "card-action"
        }, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                if (action.onAction) action.onAction.call(null);
            },
            className: className[action.variant ? action.variant : 'interactive']
        }, action.name));
    }))), children);
}
Card.defaultProps = {
    actions: [],
    subdued: false,
    title: ''
};
const Session = function Session({ actions = [], title, children }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "card-section border-b box-border"
    }, (title || actions.length > 0) && /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between card-section-header mb-2"
    }, title && /*#__PURE__*/ React.createElement("h3", {
        className: "card-session-title"
    }, title), actions.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "flex space-x-2"
    }, actions.map((action, index)=>{
        const className = {
            primary: 'text-primary',
            critical: 'text-critical',
            interactive: 'text-interactive',
            secondary: 'text-secondary'
        };
        return /*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "card-action"
        }, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                if (action.onAction) action.onAction.call(null);
            },
            className: className[action.variant ? action.variant : 'interactive']
        }, action.name));
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "card-session-content pt-lg"
    }, children));
};
Session.defaultProps = {
    actions: [],
    title: '',
    children: null
};
Card.Session = Session;
export { Card };
