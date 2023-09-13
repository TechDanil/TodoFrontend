import { FC, useEffect, useState, useRef, useCallback, ReactNode } from "react";
import type { MouseEventHandler } from "react";
import { MODAL_CONTAINER_ID } from "../../constants/constants";

import Portal, { createContainer } from '../Portal/Portal'
import KeyboardKeys from "../../enums/KeyboardKeys";
import { Button, Dialog, DialogContent } from "@mui/material";

interface IModal {
    children: ReactNode;
    handleModalClose?: () => void;
}

const Modal: FC<IModal> = ({ children, handleModalClose }) => {
    const [isMounted, setMounted] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    useEffect(() => {
        const onWrapperClickHandler = (event: MouseEvent) => {
            const { target } = event;

            if (target instanceof Node && rootRef.current === target) {
                handleModalClose?.();
            }
        }

        const onEscapePressHandler = (event: KeyboardEvent) => {
            if (event.key === KeyboardKeys.Escape) {
                handleModalClose?.();
            }
        }

        window.addEventListener('click', onWrapperClickHandler);
        window.addEventListener('keydown', onEscapePressHandler);

        return () => {
            window.removeEventListener('click', onWrapperClickHandler);
            window.removeEventListener('keydown', onEscapePressHandler);
        }
    }, [handleModalClose])

    const onCloseHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        handleModalClose?.();
    }, [handleModalClose])

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
           <Dialog open={true} ref={rootRef}>
                <DialogContent>
                    <Button
                        className="close-button"
                        onClick={onCloseHandler}
                        variant="outlined"
                        color="secondary"
                        style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            zIndex: 1,
                        }}
                    >
                        x
                    </Button>
                    {children}
                </DialogContent>
            </Dialog>
        </Portal>
    ) : null;
}

export default Modal;
