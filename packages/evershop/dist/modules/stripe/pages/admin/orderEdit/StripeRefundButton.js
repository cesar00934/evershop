import { Card } from '@components/admin/Card.js';
import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { useAlertContext } from '@components/common/modal/Alert.js';
import RenderIfTrue from '@components/common/RenderIfTrue.js';
import React from 'react';
import { toast } from 'react-toastify';
export default function StripeRefundButton({ refundAPI, order: { paymentStatus, orderId, paymentMethod, grandTotal } }) {
    const { openAlert, closeAlert, dispatchAlert } = useAlertContext();
    return /*#__PURE__*/ React.createElement(RenderIfTrue, {
        condition: paymentMethod === 'stripe' && [
            'paid',
            'partial_refunded'
        ].includes(paymentStatus.code)
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Refund",
        variant: "secondary",
        onAction: ()=>{
            openAlert({
                heading: 'Refund',
                content: /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Form, {
                    id: "stripeRefund",
                    method: "POST",
                    action: refundAPI,
                    submitBtn: false,
                    onSuccess: (response)=>{
                        if (response.error) {
                            toast.error(response.error.message);
                            dispatchAlert({
                                type: 'update',
                                payload: {
                                    secondaryAction: {
                                        isLoading: false
                                    }
                                }
                            });
                        } else {
                            // Reload the page
                            window.location.reload();
                        }
                    },
                    onInvalid: ()=>{
                        dispatchAlert({
                            type: 'update',
                            payload: {
                                secondaryAction: {
                                    isLoading: false
                                }
                            }
                        });
                    }
                }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
                    name: "amount",
                    label: "Refund amount",
                    placeholder: "Refund amount",
                    defaultValue: grandTotal.value,
                    required: true,
                    validation: {
                        required: 'This field is required',
                        min: {
                            value: 0,
                            message: 'Amount must be greater than or equal to 0'
                        },
                        max: {
                            value: grandTotal.value,
                            message: `Amount must be less than or equal to ${grandTotal.value} ${grandTotal.currency}`
                        }
                    },
                    helperText: `Maximum amount is ${grandTotal.value} ${grandTotal.currency}`,
                    unit: grandTotal.currency
                })), /*#__PURE__*/ React.createElement(InputField, {
                    type: "hidden",
                    name: "order_id",
                    value: orderId
                }))),
                primaryAction: {
                    title: 'Cancel',
                    onAction: closeAlert,
                    variant: ''
                },
                secondaryAction: {
                    title: 'Refund',
                    onAction: ()=>{
                        dispatchAlert({
                            type: 'update',
                            payload: {
                                secondaryAction: {
                                    isLoading: true
                                }
                            }
                        });
                        document.getElementById('stripeRefund').dispatchEvent(new Event('submit', {
                            cancelable: true,
                            bubbles: true
                        }));
                    },
                    variant: 'primary',
                    isLoading: false
                }
            });
        }
    }))));
}
export const layout = {
    areaId: 'orderPaymentActions',
    sortOrder: 10
};
export const query = `
  query Query {
    refundAPI: url(routeId: "refundPaymentIntent")
    order(uuid: getContextValue("orderId")) {
      orderId
      grandTotal {
        value
        currency
      }
      paymentStatus {
        code
      }
      paymentMethod
    }
  }
`;
