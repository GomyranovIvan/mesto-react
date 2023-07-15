export default function ImagePopup({ card, isOpen, onClose }) {
    return (
        < div className={`popup popup_content_image ${isOpen && 'popup_opened'}`} >
            <figure className="popup__figure">
                <button
                    className="popup__close popup__close_image" type="button" id="btnImageClose"
                    onClick={onClose}
                />
                <img src={card.link} className="popup__image" alt={card.name} />
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </div >
    )
}