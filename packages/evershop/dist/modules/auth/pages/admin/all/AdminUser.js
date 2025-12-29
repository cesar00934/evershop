import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import './AdminUser.scss';
export default function AdminUser({ adminUser, logoutUrl, loginPage }) {
    const [showLogout, setShowLogout] = React.useState(false);
    const show = (e)=>{
        e.preventDefault();
        setShowLogout(!showLogout);
    };
    const logout = async ()=>{
        const response = await fetch(logoutUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            window.location.href = loginPage;
        } else {
            toast.error('Logout failed');
        }
    };
    if (!adminUser) {
        return null;
    }
    const { fullName } = adminUser;
    return /*#__PURE__*/ React.createElement("div", {
        className: "admin-user flex flex-grow justify-end items-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-items-start gap-2 justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "relative"
    }, /*#__PURE__*/ React.createElement("a", {
        className: "first-letter",
        href: "#",
        onClick: (e)=>show(e)
    }, fullName[0]), showLogout && /*#__PURE__*/ React.createElement("div", {
        className: "logout bg-background shadow p-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, "Hello ", /*#__PURE__*/ React.createElement("span", {
        className: "text-primary"
    }, fullName, "!")), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement("a", {
        className: "text-critical",
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            logout();
        }
    }, "Logout")))))));
}
AdminUser.propTypes = {
    adminUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired
    }),
    loginPage: PropTypes.string.isRequired,
    logoutUrl: PropTypes.string.isRequired
};
AdminUser.defaultProps = {
    adminUser: null
};
export const layout = {
    areaId: 'header',
    sortOrder: 50
};
export const query = `
  query Query {
    adminUser: currentAdminUser {
      adminUserId
      fullName
      email
    },
    logoutUrl: url(routeId: "adminLogoutJson"),
    loginPage: url(routeId: "adminLogin")
  }
`;
