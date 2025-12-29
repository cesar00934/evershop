import Area from '@components/common/Area.js';
import Button from '@components/common/Button.js';
import { Form, useFormContext } from '@components/common/form/Form.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const FormButton = ({ cancelUrl, formId })=>{
    const { formState: { isSubmitting } } = useFormContext();
    return /*#__PURE__*/ React.createElement("div", {
        className: "form-submit-button flex border-t border-divider mt-4 pt-4 justify-between"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "danger",
        outline: true,
        onAction: ()=>{
            window.location.href = cancelUrl;
        }
    }), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        onAction: ()=>{
            document.getElementById(formId).dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: isSubmitting
    }));
};
export default function ProductEditForm({ action, gridUrl }) {
    const form = useForm({
        shouldUnregister: true
    });
    const submit = async (data)=>{
        try {
            const images = (data.images || []).map((image)=>image.url);
            data.images = images;
            const response = await fetch(action, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    action: undefined,
                    method: undefined
                })
            });
            const result = await response.json();
            if (result.error) {
                toast.error(result.error.message);
            } else {
                toast.success('Product updated successfully');
                form.setValue('product_id', result.data.uuid);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return /*#__PURE__*/ React.createElement(Form, {
        form: form,
        action: action,
        method: "PATCH",
        submitBtn: false,
        id: "productEditForm",
        onSubmit: submit
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "leftSide",
        noOuter: true
    })), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "rightSide",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement(FormButton, {
        formId: "productEditForm",
        cancelUrl: gridUrl
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "updateProduct", params: [{key: "id", value: getContextValue("productUuid")}]),
    gridUrl: url(routeId: "productGrid")
  }
`;
