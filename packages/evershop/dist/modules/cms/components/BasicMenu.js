import React from 'react';
export default function BasicMenu({ basicMenuWidget: { menus, isMain, className } }) {
    const [isOpen, setIsOpen] = React.useState(!isMain);
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    };
    const listingClasses = isMain ? 'md:flex md:justify-center md:space-x-6 absolute md:relative left-[-2.5rem] md:left-0 top-full md:top-auto mt-2 md:mt-0 w-screen md:w-auto md:bg-transparent p-2 md:p-0 min-w-[250px] bg-white z-30 divide-y md:divide-y-0' : 'flex justify-center space-x-6 relative left-[-2.5rem] md:left-0 top-full md:top-auto mt-2 md:mt-0 w-screen md:w-auto md:bg-transparent p-2 md:p-0 min-w-[250px] bg-white z-30';
    return /*#__PURE__*/ React.createElement("div", {
        className: className
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start gap-4 items-center"
    }, /*#__PURE__*/ React.createElement("nav", {
        className: "p-2 relative md:flex md:justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center"
    }, isMain && /*#__PURE__*/ React.createElement("div", {
        className: "md:hidden"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            toggleMenu();
        },
        className: "text-black focus:outline-none"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M4 6h16M4 12h16m-7 6h7"
    })))), /*#__PURE__*/ React.createElement("ul", {
        className: `${isOpen ? 'block' : 'hidden'}  ${listingClasses}`
    }, menus.map((item, index)=>/*#__PURE__*/ React.createElement("li", {
            key: index,
            className: "relative group"
        }, /*#__PURE__*/ React.createElement("a", {
            href: item.url,
            className: "hover:text-gray-300 transition-colors block md:inline-block px-2 py-2 md:px-0 md:py-0"
        }, item.name), item.children.length > 0 && /*#__PURE__*/ React.createElement("ul", {
            className: "md:absolute left-0 top-full mt-0 md:mt-2 w-30 bg-white md:shadow-lg rounded-md md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transform transition-all duration-300 ease-in-out min-w-full md:min-w-[250px] z-30 md:border-t-4"
        }, item.children.map((subItem, subIndex)=>/*#__PURE__*/ React.createElement("li", {
                key: subIndex
            }, /*#__PURE__*/ React.createElement("a", {
                href: subItem.url,
                className: "block px-5 md:px-2 py-2 text-gray-700 hover:bg-gray-100"
            }, subItem.name)))))))))));
}
export const query = `
  query Query($settings: JSON) {
    basicMenuWidget(settings: $settings) {
      menus {
        id
        name
        url
        type
        uuid
        children {
          name
          url
          type
          uuid
        }
      }
      isMain
      className
    }
  }
`;
export const variables = `{
  settings: getWidgetSetting()
}`;
