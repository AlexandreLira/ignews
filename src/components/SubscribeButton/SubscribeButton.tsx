import styled from './subscribeButton.module.scss'

export function SubscribeButton() {
    return (
        <button 
            type="button"
            className={styled.subscribeButton}
        >
            Subscribe now
        </button>
    );
}