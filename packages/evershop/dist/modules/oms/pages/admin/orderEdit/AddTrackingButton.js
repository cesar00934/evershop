import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { useForm } from 'react-hook-form';
export default function AddTrackingButton({ order: { noShippingRequired, shipment }, carriers }) {
    const modal = useModal();
    const form = useForm();
    if (noShippingRequired || !shipment) {
        return null;
    } else {
        return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Button, {
            title: "Edit Tracking Info",
            variant: "primary",
            onAction: ()=>{
                modal.open();
            }
        }), /*#__PURE__*/ React.createElement(Modal, {
            title: "Edit Tracking Information",
            onClose: modal.close,
            isOpen: modal.isOpen
        }, /*#__PURE__*/ React.createElement(Form, {
            form: form,
            id: "editTrackingInfo",
            method: "PATCH",
            action: shipment.updateShipmentApi,
            submitBtn: false,
            onSuccess: ()=>{
                location.reload();
            }
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-2 gap-2"
        }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
            type: "text",
            name: "tracking_number",
            label: "Tracking number",
            placeholder: "Tracking number",
            defaultValue: shipment.trackingNumber || '',
            required: true,
            validation: {
                required: 'Tracking number is required'
            }
        })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(SelectField, {
            name: "carrier",
            label: "Carrier",
            defaultValue: shipment.carrier || '',
            required: true,
            options: carriers,
            validation: {
                required: 'Carrier is required'
            }
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-end"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-2 gap-2"
        }, /*#__PURE__*/ React.createElement(Button, {
            title: "Cancel",
            variant: "danger",
            onAction: modal.close
        }), /*#__PURE__*/ React.createElement(Button, {
            title: "Save",
            variant: "primary",
            isLoading: form.formState.isSubmitting,
            onAction: async ()=>{
                document.getElementById('editTrackingInfo').dispatchEvent(new Event('submit', {
                    cancelable: true,
                    bubbles: true
                }));
            }
        }))))));
    }
}
export const layout = {
    areaId: 'order_actions',
    sortOrder: 5
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      noShippingRequired
      shipment {
        shipmentId
        carrier
        trackingNumber
        updateShipmentApi
      }
      createShipmentApi
    },
    carriers {
      label: name
      value: code
    }
  }
`;
