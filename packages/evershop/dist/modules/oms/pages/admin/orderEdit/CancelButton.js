import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import RenderIfTrue from '@components/common/RenderIfTrue.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function CancelButton({ order: { cancelApi, paymentStatus, shipmentStatus } }) {
    const modal = useModal();
    const form = useForm();
    return /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: paymentStatus.isCancelable !== false && shipmentStatus.isCancelable !== false
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel Order",
        variant: "danger",
        onAction: ()=>{
            modal.open();
        }
    }), /*#__PURE__*/ React.createElement(Modal, {
        title: "Cancel Order",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(Form, {
        form: form,
        id: "cancelReason",
        method: "POST",
        action: cancelApi,
        submitBtn: false,
        onSuccess: (response)=>{
            if (response.error) {
                toast.error(response.error.message);
            } else {
                // Reload the page
                window.location.reload();
            }
        }
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(TextareaField, {
        name: "reason",
        label: "Reason for cancellation",
        placeholder: "Reason for cancellation",
        required: true,
        validation: {
            required: 'Reason is required'
        }
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "danger",
        onAction: modal.close
    }), /*#__PURE__*/ React.createElement(Button, {
        title: "Submit Cancellation",
        variant: "primary",
        isLoading: form.formState.isSubmitting,
        onAction: async ()=>{
            document.getElementById('cancelReason').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        }
    }))))));
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 35
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      paymentStatus {
        code
        isCancelable
      }
      shipmentStatus {
        code
        isCancelable
      }
      cancelApi
    }
  }
`;
