import Spinner from '@components/admin/Spinner.jsx';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { useQuery } from 'urql';
import { Zone } from './Zone.js';
import { ZoneForm } from './ZoneForm.js';
const ZonesQuery = `
  query Zones {
    shippingZones {
      uuid
      name
      country {
        name
        code
      }
      provinces {
        name
        code
      }
      methods {
        methodId
        uuid
        name
        cost {
          text
          value
        }
        priceBasedCost {
          minPrice {
            value
            text
          }
          cost {
            value
            text
          }
        }
        weightBasedCost {
          minWeight {
            value
            text
          }
          cost {
            value
            text
          }
        }
        isEnabled
        conditionType
        calculateApi
        max
        min
        updateApi
        deleteApi
      }
      updateApi
      deleteApi
      addMethodApi
    }
  }
`;
export function Zones({ createShippingZoneApi }) {
    const modal = useModal();
    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: ZonesQuery,
        requestPolicy: 'network-only'
    });
    if (fetching) return /*#__PURE__*/ React.createElement(Spinner, null);
    if (error) return /*#__PURE__*/ React.createElement("div", null, "Error loading zones");
    if (!data || !data.shippingZones) return /*#__PURE__*/ React.createElement("div", null, "No zones found");
    const reload = ()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, data.shippingZones.map((zone)=>/*#__PURE__*/ React.createElement(Zone, {
            zone: zone,
            reload: reload,
            key: zone.uuid
        })), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end p-5"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive button primary",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "Create New Zone")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Create New Shipping Zone",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(ZoneForm, {
        formMethod: "POST",
        saveZoneApi: createShippingZoneApi,
        onSuccess: ()=>{
            modal.close();
        },
        reload: reload
    })));
}
