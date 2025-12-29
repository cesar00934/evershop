import { CustomerLoginForm } from '@components/frontStore/customer/LoginForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { toast } from 'react-toastify';
export default function LoginPage({ homeUrl, registerUrl, forgotPasswordUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "login__page flex flex-col justify-center items-center"
    }, /*#__PURE__*/ React.createElement(CustomerLoginForm, {
        title: _('Welcome Back!'),
        subtitle: _('Please sign in to your account'),
        redirectUrl: homeUrl,
        onError: (error)=>{
            toast.error(error.message);
        },
        className: "flex justify-center items-center w-[30rem] max-w-max md:max-w-[80%] bg-white rounded-2xl p-6 shadow-lg border border-divider"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "login__page__options text-center mt-2 gap-5 flex justify-center"
    }, /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive hover:underline",
        href: registerUrl
    }, _('Create an account')), /*#__PURE__*/ React.createElement("a", {
        className: "text-red-500 hover:underline",
        href: forgotPasswordUrl
    }, _('Forgot your password?'))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    registerUrl: url(routeId: "register")
    forgotPasswordUrl: url(routeId: "resetPasswordPage")
  }
`;
