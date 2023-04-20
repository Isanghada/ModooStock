import { ToastContainer } from "react-toastify";
import styled from 'styled-components'

export const Toast = styled(ToastContainer).attrs({
    autoClose:1000,
    pauseOnHover: false,
    hideProgressBar: true,
    pauseOnFocusLoss: false,

})`

    .Toastify__toast {
        font-size: 1rem;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        color: #767676;
        font-weight:bold;
        background: rgba(255, 255, 255, 0.8);
        
    }

    .Toastify__toast-icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .Toastify__toast--info {
        background: rgba(255, 255, 255, 0.8);
    }

    .Toastify__toast--success {
        background: rgba(255, 255, 255, 0.8);
    }

    .Toastify__toast--error {
        background: rgba(255, 255, 255, 0.8);
    }
`