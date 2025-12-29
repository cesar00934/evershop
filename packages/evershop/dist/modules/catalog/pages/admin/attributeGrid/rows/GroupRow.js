import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export function GroupRow({ groups }) {
    const form = useForm();
    const { openAlert, closeAlert, dispatchAlert } = useAlertContext();
    const onEdit = (group)=>{
        openAlert({
            heading: `Editing ${group.groupName}`,
            content: /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Form, {
                form: form,
                id: "groupEdit",
                method: "PATCH",
                action: group.updateApi,
                submitBtn: false,
                onSuccess: (response)=>{
                    if (response.error) {
                        toast.error(response.error.message);
                    } else {
                        window.location.reload();
                    }
                }
            }, /*#__PURE__*/ React.createElement(InputField, {
                name: "group_name",
                required: true,
                label: "Group Name",
                placeholder: "Enter group name",
                validation: {
                    required: 'Group name is required'
                },
                defaultValue: group.groupName
            }))),
            primaryAction: {
                title: 'Cancel',
                onAction: closeAlert,
                variant: 'critical'
            },
            secondaryAction: {
                title: 'Save',
                onAction: ()=>{
                    dispatchAlert({
                        type: 'update',
                        payload: {
                            secondaryAction: {
                                isLoading: form.formState.isSubmitting
                            }
                        }
                    });
                    document.getElementById('groupEdit').dispatchEvent(new Event('submit', {
                        cancelable: true,
                        bubbles: true
                    }));
                },
                variant: 'primary',
                isLoading: false
            }
        });
    };
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
        className: ""
    }, groups.map((group)=>/*#__PURE__*/ React.createElement("div", {
            key: group.attributeGroupId
        }, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            className: "text-interactive hover:underline",
            onClick: (e)=>{
                e.preventDefault();
                onEdit(group);
            }
        }, group.groupName)))));
}
