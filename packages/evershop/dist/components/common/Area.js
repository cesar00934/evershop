import { useAppState } from '@components/common/context/app.js';
import { generateComponentKey } from '@evershop/evershop/lib/webpack/util/keyGenerator.js';
import React from 'react';
function Area(props) {
    const context = useAppState();
    const { id, coreComponents, wrapperProps, noOuter, wrapper, className, components } = props;
    const areaComponents = (()=>{
        const areaCoreComponents = coreComponents || [];
        const widgets = context.widgets || [];
        const wildCardWidgets = components?.['*'] || {};
        const assignedWidgets = [];
        widgets.forEach((widget)=>{
            const adminKey = generateComponentKey(`admin_widget_${widget.type}`);
            const frontKey = generateComponentKey(`widget_${widget.type}`);
            const w = wildCardWidgets[adminKey] || wildCardWidgets[frontKey];
            if (widget.areaId.includes(id) && w !== undefined) {
                assignedWidgets.push({
                    id: widget.id,
                    sortOrder: widget.sortOrder,
                    props: widget.props,
                    component: w.component
                });
            }
        });
        const cs = components?.[id] === undefined ? areaCoreComponents.concat(assignedWidgets) : areaCoreComponents.concat(Object.values(components[id])).concat(assignedWidgets);
        return cs.sort((obj1, obj2)=>(obj1.sortOrder || 0) - (obj2.sortOrder || 0));
    })();
    const { propsMap } = context;
    let WrapperComponent = React.Fragment;
    if (noOuter !== true) {
        if (wrapper !== undefined) {
            WrapperComponent = wrapper;
        } else {
            WrapperComponent = 'div';
        }
    }
    let areaWrapperProps = {};
    if (noOuter === true) {
        areaWrapperProps = {};
    } else if (typeof wrapperProps === 'object' && wrapperProps !== null) {
        areaWrapperProps = {
            className: className || '',
            ...wrapperProps
        };
    } else {
        areaWrapperProps = {
            className: className || ''
        };
    }
    return /*#__PURE__*/ React.createElement(WrapperComponent, areaWrapperProps, areaComponents.map((w, index)=>{
        const C = w.component.default;
        const { id } = w;
        const propsData = context.graphqlResponse;
        const propKeys = id !== undefined ? propsMap[id] || [] : [];
        const componentProps = propKeys.reduce((acc, map)=>{
            const { origin, alias } = map;
            acc[origin] = propsData[alias];
            return acc;
        }, {});
        if (w.props) {
            Object.assign(componentProps, w.props);
        }
        // Check if C is a React component
        if (/*#__PURE__*/ React.isValidElement(C)) {
            return /*#__PURE__*/ React.createElement(React.Fragment, {
                key: index
            }, C);
        }
        if (typeof C === 'string') {
            return /*#__PURE__*/ React.createElement(C, {
                key: index,
                ...componentProps
            });
        }
        return typeof C === 'function' ? /*#__PURE__*/ React.createElement(C, {
            key: index,
            areaProps: props,
            ...componentProps
        }) : null;
    }));
}
Area.defaultProps = {
    className: undefined,
    coreComponents: [],
    noOuter: false,
    wrapper: 'div',
    wrapperProps: {}
};
export { Area };
export default Area;
