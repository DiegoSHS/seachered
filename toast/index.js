'use client'
import { Toaster, useToaster } from 'react-hot-toast'

const Notify = () => {
    const { handlers: { startPause, endPause } } = useToaster()
    return (
        <div onMouseEnter={startPause} onMouseLeave={endPause}>
            <Toaster position='top-right' />
        </div>
    )
}

export default Notify