import { CustomerRegistrationForm } from '@components/frontStore/customer/RegistrationForm.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { toast } from 'react-toastify';
export default function RegisterPage({ homeUrl, loginUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-center items-center flex-col gap-3"
    }, /*#__PURE__*/ React.createElement(CustomerRegistrationForm, {
        title: _('Create an account'),
        subtitle: _('Join us for exclusive offers and order tracking'),
        redirectUrl: homeUrl,
        onError: (error)=>{
            toast.error(error);
        },
        className: "flex justify-center items-center w-[30rem] max-w-max md:max-w-[80%] bg-white rounded-2xl p-6 shadow-lg border border-divider"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/ React.createElement("span", null, _('Already have an account?'), /*#__PURE__*/ React.createElement("a", {
        className: "text-interactive",
        href: loginUrl
    }, ' ', _('Login'), ' '))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    homeUrl: url(routeId: "homepage")
    loginUrl: url(routeId: "login")
  }
`;
