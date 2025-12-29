import { Card } from '@components/admin/Card.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import { MapPinIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { Methods } from './Methods.js';
import { ZoneForm } from './ZoneForm.js';
function Zone({ zone, reload }) {
    const modal = useModal();
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between items-center gap-5"
        }, /*#__PURE__*/ React.createElement("div", null, zone.name), /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between gap-5"
        }, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            className: "text-interactive",
            onClick: (e)=>{
                e.preventDefault();
                modal.open();
            }
        }, "Edit Zone"), /*#__PURE__*/ React.createElement("a", {
            className: "text-critical",
            href: "#",
            onClick: async (e)=>{
                e.preventDefault();
                try {
                    const response = await axios.delete(zone.deleteApi);
                    if (response.status === 200) {
                        // Toast success
                        toast.success('Zone removed successfully');
                        // Delay for 2 seconds
                        setTimeout(()=>{
                            // Reload page
                            window.location.reload();
                        }, 1500);
                    } else {
                        // Toast error
                        toast.error('Failed to remove zone');
                    }
                } catch (error) {
                    // Toast error
                    toast.error('Failed to remove zone');
                }
            }
        }, "Remove Zone")))
    }, /*#__PURE__*/ React.createElement("div", {
        className: "divide-y border rounded border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider mt-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "p-5"
    }, /*#__PURE__*/ React.createElement(MapPinIcon, {
        width: 25,
        height: 25,
        fill: "#008060"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex-grow px-2"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("b", null, zone.country?.name || 'Worldwide')), /*#__PURE__*/ React.createElement("div", null, zone.provinces.slice(0, 3).map((province)=>province.name).join(', '), zone.provinces.length > 3 && '...'))), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider mt-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex-grow px-2"
    }, /*#__PURE__*/ React.createElement(Methods, {
        methods: zone.methods,
        reload: reload,
        addMethodApi: zone.addMethodApi
    })))), /*#__PURE__*/ React.createElement(Modal, {
        title: `Edit Zone: ${zone.name}`,
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(ZoneForm, {
        formMethod: "PATCH",
        saveZoneApi: zone.updateApi,
        onSuccess: ()=>modal.close(),
        reload: reload,
        zone: zone
    })));
}
export { Zone };
