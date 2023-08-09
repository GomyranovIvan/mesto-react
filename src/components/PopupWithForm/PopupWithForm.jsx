export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, isValid=true }) {
    return (
        <div className={`popup popup_content_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
            <div className="popup__container" onMouseDown={(evt => evt.stopPropagation())}>
                <button
                    className="popup__close" type="button"
                    onClick={onClose}
                />
                <form
                    className="popup__form"
                    name={name}
                    noValidate
                    onSubmit={onSubmit}
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button 
                    className={`popup__button-submit ${isSend ? 'popup__button-submit_loading' : ''} ${isValid ? '' : 'popup__button-submit_disable'}`} 
                    type="submit"
                    disabled={isSend}
                    >
                        {isSend ? '' : titleButton || "Сохранить"}
                    </button>
                </form>
            </div>
        </div>
    )
}