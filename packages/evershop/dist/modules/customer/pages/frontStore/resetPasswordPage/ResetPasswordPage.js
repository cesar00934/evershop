import { ResetPasswordForm } from '@components/frontStore/customer/ResetPasswordForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
function Success() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center items-center h-full"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__success flex justify-center items-center pt-10 md:pt-36"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "reset__password__success__inner max-w-md px-4"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-center text-success"
    }, _('We have sent you an email with a link to reset your password. Please check your inbox.')))));
}
export default function ResetPasswordPage({ action }) {
    const [success, setSuccess] = React.useState(false);
    return success ? /*#__PURE__*/ React.createElement(Success, null) : /*#__PURE__*/ React.createElement(ResetPasswordForm, {
        title: _('Reset Your Password'),
        subtitle: _('Please enter your email to receive a reset link'),
        className: "w-[30rem] max-w-max md:max-w-[80%] bg-white rounded-3xl p-6 shadow-lg border border-divider",
        action: action,
        onSuccess: ()=>{
            setSuccess(true);
        }
    });
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "resetPassword")
  }
`;
