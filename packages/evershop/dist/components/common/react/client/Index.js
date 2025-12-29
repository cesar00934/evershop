import Area from '@components/common/Area';
import { App } from '@components/common/react/client/Client';
import { HotReload } from '@components/common/react/client/HotReload';
import React from 'react';
import ReactDOM from 'react-dom';
import hot from 'webpack-hot-middleware/client?path=/eHot&reload=true&overlay=true';
/** render */ ReactDOM.render(/*#__PURE__*/ React.createElement(App, null, /*#__PURE__*/ React.createElement(Area, null), /*#__PURE__*/ React.createElement(HotReload, {
    hot: hot
})), document.getElementById('app'));
