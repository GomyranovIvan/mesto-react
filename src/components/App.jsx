import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useState } from "react";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
    const [isImagePopup, setIsImagePopup] = useState(false)

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddCardPopupOpen(false)
        setIsImagePopup(false)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddCardClick() {
        setIsAddCardPopupOpen(true)
    }

    // function handleDeleteClick()

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopup(true)
    }

    return (
        <div className="page">
            <Header />
            <Main
                onAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                {/* Инпут имя профиля */}
                <input
                    className="popup__input popup__input_text_username"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    required=""
                />
                <span className="popup__error popup__error_type_username" />
                {/* инпут описания профиля */}
                <input
                    className="popup__input popup__input_text_description"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="О себе"
                    minLength={2}
                    maxLength={200}
                    required=""
                />
                <span className="popup__error popup__error_type_description" />
            </PopupWithForm>
            <PopupWithForm name="card" title="Новое место" titleButton="Создать" isOpen={isAddCardPopupOpen} onClose={closeAllPopups}>
                {/* Инпут подписи картинки */}
                <input
                    className="popup__input popup__input_text_caption"
                    type="text"
                    id="caption"
                    name="caption"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required=""
                />
                <span className="popup__error popup__error_type_caption" />
                {/* инпут ссылки на картинку */}
                <input
                    className="popup__input popup__input_text_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    required=""
                />
                <span className="popup__error popup__error_type_link" />
            </PopupWithForm>
            <PopupWithForm name="image">
            </PopupWithForm>
            <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                {/* Инпут ссылки на аватар */}
                <input
                    className="popup__input popup__input_text_avatar"
                    name="avatar"
                    id="avatar"
                    type="url"
                    placeholder="Ссылка на аватар"
                    required=""
                />
                <span className="popup__error popup__error_type_avatar" />
            </PopupWithForm>
            <PopupWithForm name="delete" title="Вы уверены?" titleButton="Да">
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups}>
            </ImagePopup>
        </div>
    );
}

export default App;