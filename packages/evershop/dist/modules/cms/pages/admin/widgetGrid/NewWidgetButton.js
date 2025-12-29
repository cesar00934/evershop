import Button from '@components/common/Button.js';
import { useAlertContext } from '@components/common/modal/Alert.js';
import React from 'react';
const WidgetTypes = ({ types })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-4 p-2"
    }, types.map((type)=>/*#__PURE__*/ React.createElement("a", {
            key: type.code,
            href: type.createWidgetUrl,
            className: "group relative flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200 ease-in-out bg-white hover:bg-gray-50"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-base font-semibold text-gray-900 group-hover:text-primary transition-colors"
        }, type.name), type.description && /*#__PURE__*/ React.createElement("div", {
            className: "mt-2 text-sm text-gray-500 text-center"
        }, type.description))));
};
export default function NewWidgetButton({ widgetTypes }) {
    const { openAlert, closeAlert } = useAlertContext();
    return /*#__PURE__*/ React.createElement(Button, {
        title: "New Widget",
        onAction: ()=>{
            openAlert({
                heading: `Select type`,
                content: /*#__PURE__*/ React.createElement(WidgetTypes, {
                    types: widgetTypes
                }),
                primaryAction: {
                    title: 'Cancel',
                    onAction: closeAlert,
                    variant: 'primary'
                }
            });
        }
    });
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    widgetTypes {
      code
      name
      description
      createWidgetUrl
    }
  }
`;
