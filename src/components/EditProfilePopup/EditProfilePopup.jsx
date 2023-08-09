import React, { useContext, useEffect } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import useFormValidation from "../../utils/useFormValidation"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {

    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("username", currentUser.name);
        setValue("description", currentUser.about)
    }, [currentUser, setValue])

    function resetForClose() {
        onClose()
        reset({ username: currentUser.name, description: currentUser.about })
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ username: values.username, description: values.description }, reset)
    }

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль"
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}
        >
            {/* Инпут имя профиля */}
            <input
                className={`popup__input popup__input_text_username ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
                type="text"
                name="username"
                id="username"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                disabled={isSend}
                required=""
                value={values.username ? values.username : ''}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_username">{errors.username}</span>
            {/* инпут описания профиля */}
            <input
                className={`popup__input popup__input_text_description ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_invalid'}`}
                type="text"
                name="description"
                id="description"
                placeholder="О себе"
                minLength={2}
                maxLength={200}
                disabled={isSend}
                required=""
                value={values.description ? values.description : ''}
                onChange={handleChange}
            />
            <span className="popup__error popup__error_type_description">{errors.description}</span>
        </PopupWithForm>
    )
}