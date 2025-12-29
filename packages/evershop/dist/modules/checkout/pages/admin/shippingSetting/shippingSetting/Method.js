import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import { CogIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { toast } from 'react-toastify';
import { MethodForm } from './MethodForm.js';
function Method({ method, reload }) {
    const modal = useModal();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.name), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.isEnabled ? 'Enabled' : 'Disabled'), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.cost?.text || /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, /*#__PURE__*/ React.createElement(CogIcon, {
        width: 22,
        height: 22
    }))), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, method.conditionType ? `${method.min || 0} <= ${method.conditionType} <= ${method.max || '∞'}` : 'None'), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "Edit"), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-critical ml-5",
        onClick: async (e)=>{
            e.preventDefault();
            try {
                const response = await fetch(method.deleteApi, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    reload();
                    // Toast success
                    toast.success('Method removed successfully');
                } else {
                    // Toast error
                    toast.error('Failed to remove method');
                }
            } catch (error) {
                // Toast error
                toast.error('Failed to remove method');
            }
        }
    }, "Delete"))), /*#__PURE__*/ React.createElement(Modal, {
        title: `Edit ${method.name} Method`,
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(MethodForm, {
        saveMethodApi: method.updateApi,
        onSuccess: ()=>modal.close(),
        reload: reload,
        method: method
    })));
}
export { Method };
