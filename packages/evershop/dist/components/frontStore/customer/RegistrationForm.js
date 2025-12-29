import { EmailField } from '@components/common/form/EmailField.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { PasswordField } from '@components/common/form/PasswordField.js';
import { Area } from '@components/common/index.js';
import { useCustomerDispatch } from '@components/frontStore/customer/CustomerContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
export const CustomerRegistrationForm = ({ title, subtitle, redirectUrl, onError, className })=>{
    const { register } = useCustomerDispatch();
    return /*#__PURE__*/ React.createElement("div", {
        className: `register__form ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "register__form__inner w-full"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "customerRegisterFormTitleBefore",
        noOuter: true
    }), title && /*#__PURE__*/ React.createElement("h1", {
        className: "register__form__title text-2xl text-center mb-6"
    }, _(title)), /*#__PURE__*/ React.createElement(Area, {
        id: "customerRegisterFormTitleAfter",
        noOuter: true
    }), subtitle && /*#__PURE__*/ React.createElement("p", {
        className: "register__form__subtitle text-center mb-6"
    }, _(subtitle)), /*#__PURE__*/ React.createElement(Area, {
        id: "customerRegisterFormBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Form, {
        id: "registerForm",
        method: "POST",
        onSubmit: async (data)=>{
            try {
                await register({
                    full_name: data.full_name,
                    email: data.email,
                    password: data.password,
                    ...data
                }, true, redirectUrl);
            } catch (error) {
                onError?.(error.message);
            }
        },
        submitBtnText: _('Sign Up')
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "customerRegisterForm",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(InputField, {
                        prefixIcon: /*#__PURE__*/ React.createElement(UserCircleIcon, {
                            className: "h-5 w-5"
                        }),
                        name: "full_name",
                        label: _('Full Name'),
                        placeholder: _('Full Name'),
                        required: true,
                        validation: {
                            required: _('Full Name is required')
                        }
                    })
                },
                sortOrder: 10
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(EmailField, {
                        prefixIcon: /*#__PURE__*/ React.createElement(EnvelopeIcon, {
                            className: "h-5 w-5"
                        }),
                        name: "email",
                        label: _('Email'),
                        placeholder: _('Email'),
                        required: true,
                        validation: {
                            required: _('Email is required')
                        }
                    })
                },
                sortOrder: 20
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(PasswordField, {
                        prefixIcon: /*#__PURE__*/ React.createElement(LockClosedIcon, {
                            className: "h-5 w-5"
                        }),
                        name: "password",
                        label: _('Password'),
                        placeholder: _('Password'),
                        required: true,
                        showToggle: true,
                        validation: {
                            required: _('Password is required')
                        }
                    })
                },
                sortOrder: 30
            }
        ]
    })), /*#__PURE__*/ React.createElement(Area, {
        id: "customerRegisterFormAfter",
        noOuter: true
    })));
};
