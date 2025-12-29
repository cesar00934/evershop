import { Card } from '@components/admin/Card.js';
import React, { useEffect, useCallback, useState } from 'react';
export const Modal = ({ isOpen, onClose, title, children, className, closeOnEscape = true, closeOnBackdropClick = true, ...restProps })=>{
    const [isRendered, setIsRendered] = useState(isOpen);
    useEffect(()=>{
        if (isOpen) {
            setIsRendered(true);
        }
    }, [
        isOpen
    ]);
    const handleTransitionEnd = ()=>{
        if (!isOpen) {
            setIsRendered(false);
        }
    };
    const handleModalKeyDown = useCallback((e)=>{
        if (closeOnEscape && e.key === 'Escape') {
            onClose();
        }
    }, [
        closeOnEscape,
        onClose
    ]);
    const handleBackdropClick = useCallback((e)=>{
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    }, [
        closeOnBackdropClick,
        onClose
    ]);
    useEffect(()=>{
        if (isRendered) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return ()=>{
            document.body.style.overflow = 'auto';
        };
    }, [
        isRendered
    ]);
    useEffect(()=>{
        if (!isRendered) return;
        document.addEventListener('keydown', handleModalKeyDown);
        return ()=>{
            document.removeEventListener('keydown', handleModalKeyDown);
        };
    }, [
        isRendered,
        handleModalKeyDown
    ]);
    if (!isRendered) {
        return null;
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        onClick: handleBackdropClick,
        role: "presentation",
        className: `fixed inset-0 bg-black bg-opacity-50 z-1001 transition-opacity duration-300 z-30 ${isOpen ? 'opacity-100' : 'opacity-0'}`
    }), /*#__PURE__*/ React.createElement("div", {
        role: "dialog",
        "aria-modal": "true",
        onTransitionEnd: handleTransitionEnd,
        className: `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-full max-w-2xl max-h-[80vh] overflow-auto overscroll-contain transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${className || ''}`,
        ...restProps
    }, /*#__PURE__*/ React.createElement(Card, {
        title: title
    }, /*#__PURE__*/ React.createElement(Card.Session, null, children))));
};
