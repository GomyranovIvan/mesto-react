import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import { useState, useCallback, useEffect } from "react";
import ImagePopup from "./ImagePopup/ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext"
import api from "../utils/api";

function App() {
    //Попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
    const [isImagePopup, setIsImagePopup] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    //Контексты
    const [currentUser, setCurrentUser] = useState({})
    //Карточки
    const [cards, setCards] = useState([])
    const [isLoadingCards, setIsLoadingCards] = useState(true)

    const setStatesForCloseAllPopups = useCallback (() => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddCardPopupOpen(false)
        setIsImagePopup(false)
        setIsDeletePopupOpen(false)
    }, [])

    const closePopupByEsc = useCallback((evt) => {
        if(evt.key === 'Escape') {
            setStatesForCloseAllPopups()
            document.removeEventListener('keydown', closePopupByEsc)
        }
    }, [setStatesForCloseAllPopups])

    const closeAllPopups = useCallback(() => {
        setStatesForCloseAllPopups();
        document.removeEventListener('keydown', closePopupByEsc)
    }, [setStatesForCloseAllPopups, closePopupByEsc])

    function hangEventListener() {
        document.addEventListener('keydown', closePopupByEsc)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
        hangEventListener()
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
        hangEventListener()
    }

    function handleAddCardClick() {
        setIsAddCardPopupOpen(true)
        hangEventListener()
    }

    function handleDeleteClick() {
        setIsDeletePopupOpen(true)
        hangEventListener()
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopup(true)
        hangEventListener()
    }

    useEffect(() => {
        setIsLoadingCards(true)
        Promise.all([api.getInfo(), api.getCards()])
            .then(([dataUser, dataCard]) => {
                setCurrentUser(dataUser)
                setCards(dataCard)
                setIsLoadingCards(false)
            })
            .catch((error) => console.error(`error while creating page initial data ${error}`))
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Header />
            <Main
                onAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onCardClick={handleCardClick}
                onDelete={handleDeleteClick}
                cards={cards}
                isLoading={isLoadingCards}
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
            <PopupWithForm name="delete" title="Вы уверены?" titleButton="Да" isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups}>
            </ImagePopup>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;