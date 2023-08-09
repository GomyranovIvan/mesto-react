import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {

    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()
    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, reset)
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар"
            isOpen={isOpen}
            isSend={isSend}
            isValid={isValid}
            onClose={resetForClose}
            onSubmit={handleSubmit}
        >
            {/* Инпут ссылки на аватар */}
            <input
                ref={input}
                className={`popup__input popup__input_text_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
                name="avatar"
                id="avatar"
                type="url"
                placeholder="Ссылка на аватар"
                required=""
                value={values.avatar ? values.avatar : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_avatar">{errors.avatar}</span>
        </PopupWithForm>
    )
}