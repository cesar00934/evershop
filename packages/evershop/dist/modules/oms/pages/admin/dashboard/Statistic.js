import { Card } from '@components/admin/Card';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './Statistic.scss';
export default function SaleStatistic({ api }) {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState('monthly');
    const [fetching, setFetching] = useState(true);
    useEffect(()=>{
        if (window !== undefined) {
            fetch(`${api}?period=${period}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response)=>response.json()).then((json)=>{
                setData(json);
                setFetching(false);
            }).catch((error)=>{
                toast.error(error.message);
            });
        }
    }, [
        period
    ]);
    if (fetching) {
        return /*#__PURE__*/ React.createElement(Card, {
            title: "Sale Statistics"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton-wrapper-statistic"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "skeleton"
        })));
    } else {
        return /*#__PURE__*/ React.createElement(Card, {
            title: "Sale Statistics",
            actions: [
                {
                    name: 'Daily',
                    onAction: ()=>setPeriod('daily')
                },
                {
                    name: 'Weekly',
                    onAction: ()=>setPeriod('weekly')
                },
                {
                    name: 'Monthly',
                    onAction: ()=>setPeriod('monthly')
                }
            ]
        }, /*#__PURE__*/ React.createElement(Card.Session, null, data.length === 0 ? null : /*#__PURE__*/ React.createElement(ResponsiveContainer, {
            width: "100%",
            height: 300
        }, /*#__PURE__*/ React.createElement(AreaChart, {
            data: data,
            margin: {
                top: 5,
                right: 0,
                left: -25,
                bottom: 5
            }
        }, /*#__PURE__*/ React.createElement(XAxis, {
            dataKey: "time"
        }), /*#__PURE__*/ React.createElement(YAxis, null), /*#__PURE__*/ React.createElement(Tooltip, null), /*#__PURE__*/ React.createElement(Area, {
            type: "monotone",
            dataKey: "value",
            stackId: "1",
            stroke: "#8884d8",
            fill: "#8884d8"
        }), /*#__PURE__*/ React.createElement(Area, {
            type: "monotone",
            dataKey: "count",
            stackId: "1",
            stroke: "#82ca9d",
            fill: "#82ca9d"
        })))));
    }
}
SaleStatistic.propTypes = {
    api: PropTypes.string.isRequired
};
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    api: url(routeId: "salestatistic")    
  }
`;
