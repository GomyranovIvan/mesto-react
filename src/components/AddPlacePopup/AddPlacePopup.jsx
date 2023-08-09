import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()
    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ caption: values.caption, link: values.link }, reset)
    }

    return (
        <PopupWithForm name="card" title="Новое место" titleButton="Создать"
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            onSubmit={handleSubmit}


        >
            {/* Инпут подписи картинки */}
            <input
                className={`popup__input popup__input_text_caption ${isInputValid.caption === undefined || isInputValid.caption ? '' : 'popup__input_invalid'}`}
                type="text"
                id="caption"
                name="caption"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                disabled={isSend}
                required=""
                value={values.caption ? values.caption : ''}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_caption">{errors.caption}</span>
            {/* инпут ссылки на картинку */}
            <input
                className={`popup__input popup__input_text_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
                type="url"
                name="link"
                id="link"
                placeholder="Ссылка на картинку"
                disabled={isSend}
                required=""
                value={values.link ? values.link : ''}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_link">{errors.link}</span>
        </PopupWithForm>
    )
}