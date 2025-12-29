import Button from '@components/common/Button';
import { assign } from '@evershop/evershop/lib/util/assign';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './Alert.scss';
import { Card } from '@components/admin/Card';
const AlertContext = /*#__PURE__*/ React.createContext();
export const useAlertContext = ()=>React.useContext(AlertContext);
function reducer(state, action) {
    switch(action.type){
        case 'close':
            return {
                ...state,
                showing: false,
                closing: false
            };
        case 'closing':
            return {
                ...state,
                showing: true,
                closing: true
            };
        case 'open':
            return {
                ...state,
                showing: true,
                closing: false
            };
        default:
            throw new Error();
    }
}
const alertReducer = produce((draff, action)=>{
    switch(action.type){
        case 'open':
            draff = {
                ...action.payload
            };
            return draff;
        case 'remove':
            return {};
        case 'update':
            assign(draff, action.payload);
            return draff;
        default:
            throw new Error();
    }
});
function Alert({ children }) {
    const [alert, dispatchAlert] = useReducer(alertReducer, {});
    const [state, dispatch] = useReducer(reducer, {
        showing: false,
        closing: false
    });
    const openAlert = ({ heading, content, primaryAction, secondaryAction })=>{
        dispatchAlert({
            type: 'open',
            payload: {
                heading,
                content,
                primaryAction,
                secondaryAction
            }
        });
        dispatch({
            type: 'open'
        });
    };
    return /*#__PURE__*/ React.createElement(AlertContext.Provider, {
        value: {
            dispatchAlert,
            openAlert,
            closeAlert: ()=>dispatch({
                    type: 'closing'
                })
        }
    }, children, state.showing === true && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        className: state.closing === false ? 'modal-overlay fadeIn' : 'modal-overlay fadeOut',
        onAnimationEnd: ()=>{
            if (state.closing) {
                dispatch({
                    type: 'close'
                });
                dispatchAlert({
                    type: 'remove'
                });
            }
        }
    }, /*#__PURE__*/ React.createElement("div", {
        key: state.key,
        className: "modal-wrapper flex self-center justify-center",
        "aria-modal": true,
        "aria-hidden": true,
        tabIndex: -1,
        role: "dialog"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "modal"
    }, /*#__PURE__*/ React.createElement("button", {
        type: "button",
        className: "modal-close-button text-icon",
        onClick: ()=>dispatch({
                type: 'closing'
            })
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        className: "w-6 h-6",
        viewBox: "0 0 20 20",
        fill: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
        clipRule: "evenodd"
    }))), /*#__PURE__*/ React.createElement(Card, {
        title: alert.heading
    }, /*#__PURE__*/ React.createElement(Card.Session, null, alert.content), (alert.primaryAction !== undefined || alert.secondaryAction !== undefined) && /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end space-x-2"
    }, alert.primaryAction && /*#__PURE__*/ React.createElement(Button, alert.primaryAction), alert.secondaryAction && /*#__PURE__*/ React.createElement(Button, alert.secondaryAction))))))), document.body));
}
Alert.propTypes = {
    children: PropTypes.node.isRequired
};
export { Alert };
