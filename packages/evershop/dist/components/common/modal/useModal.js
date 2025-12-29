import { useState, useCallback } from 'react';
export function useModal({ initialOpen = false, onAfterOpen, onAfterClose } = {}) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const open = useCallback(()=>{
        setIsOpen(true);
        if (onAfterOpen) onAfterOpen();
    }, [
        onAfterOpen
    ]);
    const close = useCallback((e)=>{
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsOpen(false);
        if (onAfterClose) onAfterClose();
    }, [
        onAfterClose
    ]);
    const toggle = useCallback((e)=>{
        if (isOpen) {
            close(e);
        } else {
            open();
        }
    }, [
        isOpen,
        open,
        close
    ]);
    return {
        isOpen,
        open,
        close,
        toggle
    };
}
