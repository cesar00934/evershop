import { Card } from '@components/admin/Card.js';
import Spinner from '@components/admin/Spinner.js';
import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { ReactSelectField } from '@components/common/form/ReactSelectField.js';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'urql';
const CountriesQuery = `
  query Country {
    countries {
      value: code
      label: name
      provinces {
        value: code
        label: name
      }
    }
  }
`;
function ZoneForm({ formMethod, saveZoneApi, onSuccess, reload, zone }) {
    const form = useForm();
    const countryWatch = form.watch('country', zone?.country?.code);
    const [{ data, fetching, error }] = useQuery({
        query: CountriesQuery
    });
    // Reset provinces when country changes
    React.useEffect(()=>{
        if (countryWatch !== zone?.country?.code) {
            form.setValue('provinces', []);
        }
    }, [
        countryWatch,
        zone?.country?.code,
        form
    ]);
    if (fetching) return /*#__PURE__*/ React.createElement(Spinner, null);
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-critical"
        }, "Error loading countries");
    }
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Create a shipping zone"
    }, /*#__PURE__*/ React.createElement(Form, {
        id: "createShippingZone",
        method: formMethod || 'POST',
        action: saveZoneApi,
        submitBtn: false,
        onSuccess: async ()=>{
            await reload();
            onSuccess();
        },
        form: form
    }, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Zone name"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        placeholder: "Enter zone name",
        required: true,
        validation: {
            required: 'Zone name is required'
        },
        defaultValue: zone?.name
    })), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Country"
    }, /*#__PURE__*/ React.createElement(ReactSelectField, {
        name: "country",
        options: data.countries,
        hideSelectedOptions: false,
        isMulti: false,
        "aria-label": "Select country",
        defaultValue: zone?.country?.code
    })), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Provinces/States"
    }, /*#__PURE__*/ React.createElement(ReactSelectField, {
        name: "provinces",
        options: data.countries.find((c)=>c.value === countryWatch)?.provinces || [],
        hideSelectedOptions: true,
        isMulti: true,
        defaultValue: (zone?.provinces || []).map((province)=>province.code)
    })), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "primary",
        onAction: ()=>{
            const form = document.getElementById('createShippingZone');
            if (form) {
                form.dispatchEvent(new Event('submit', {
                    cancelable: true,
                    bubbles: true
                }));
            }
        }
    })))));
}
export { ZoneForm };
