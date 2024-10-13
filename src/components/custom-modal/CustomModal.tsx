import { Fade, Modal } from '@mui/material'
import React, { useState } from 'react'

const CustomModal = React.memo(({ open, handleClose, style, children }: any) => {
    const [lcOpen, setLcOpen] = useState<boolean>(false);


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open ? open : lcOpen}
            onClose={() => {
                handleClose() ? handleClose() : setLcOpen(false)
            }}
            closeAfterTransition
        >
            <Fade in={open}>
                <div onClick={(e) => {
                    handleClose() ? handleClose() : setLcOpen(false)
                }}
                    style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div onClick={e => e.stopPropagation()} style={{ width: "fit-content", height: "fit-content" }}>
                        {children}
                    </div>
                </div>
            </Fade>
        </Modal>
    )
})

export default CustomModal