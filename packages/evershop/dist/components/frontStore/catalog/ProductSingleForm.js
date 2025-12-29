import Area from '@components/common/Area.js';
import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import { VariantSelector } from '@components/frontStore/catalog/VariantSelector.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export function ProductSingleForm() {
    const { price, sku, inventory: { isInStock } } = useProduct();
    const form = useForm();
    return /*#__PURE__*/ React.createElement(Form, {
        id: "productForm",
        method: "POST",
        submitBtn: false,
        form: form
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "productSinglePageForm",
        coreComponents: [
            {
                component: {
                    default: /*#__PURE__*/ React.createElement("div", {
                        className: "product__single__price text-2xl"
                    }, price.regular.text)
                },
                sortOrder: 5,
                id: 'price'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(VariantSelector, null)
                },
                sortOrder: 10,
                id: 'variantSelector'
            },
            {
                component: {
                    default: /*#__PURE__*/ React.createElement(AddToCart, {
                        product: {
                            sku: sku,
                            isInStock: isInStock
                        },
                        qty: 1,
                        onSuccess: ()=>{
                        // To show the mini cart after adding a product to cart
                        },
                        onError: (errorMessage)=>{
                            toast.error(errorMessage || _('Failed to add product to cart'));
                        }
                    }, (state, actions)=>/*#__PURE__*/ React.createElement(React.Fragment, null, state.isInStock === true && /*#__PURE__*/ React.createElement(Button, {
                            title: _('ADD TO CART'),
                            outline: true,
                            isLoading: state.isLoading,
                            onAction: ()=>{
                                form.trigger().then((isValid)=>{
                                    if (isValid) {
                                        actions.addToCart();
                                    }
                                });
                            },
                            className: "w-full py-3 text-lg font-base !rounded-full mt-8"
                        }), state.isInStock === false && /*#__PURE__*/ React.createElement(Button, {
                            title: _('SOLD OUT'),
                            onAction: ()=>{},
                            className: "w-full py-3 text-lg font-base !rounded-full"
                        })))
                },
                sortOrder: 30,
                id: 'addToCartButton'
            }
        ]
    }));
}
