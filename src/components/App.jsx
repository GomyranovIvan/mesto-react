import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import { useState, useCallback, useEffect } from "react";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import CurrentUserContext from "../contexts/CurrentUserContext"
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

function App() {
    //Попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
    const [isImagePopup, setIsImagePopup] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [isSend, setIsSend] = useState(false)
    //Контексты
    const [currentUser, setCurrentUser] = useState({})
    //Карточки
    const [cards, setCards] = useState([])
    const [isLoadingCards, setIsLoadingCards] = useState(true)
    const [deleteCardId, setDeleteCardId] = useState('')

    const setStatesForCloseAllPopups = useCallback(() => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddCardPopupOpen(false)
        setIsImagePopup(false)
        setIsDeletePopupOpen(false)
    }, [])

    const closePopupByEsc = useCallback((evt) => {
        if (evt.key === 'Escape') {
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

    function handleDeleteClick(cardId) {
        setDeleteCardId(cardId)
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

    function handleDeleteSubmit(evt) {
        evt.preventDefault();
        setIsSend(true)
        api.deleteCard(deleteCardId)
            .then(() => {
                setCards(cards.filter(card => {
                    return card._id !== deleteCardId
                }))
                closeAllPopups()
                setIsSend(false)
            })
            .catch((err) => console.error(err))
    }

    function handleUpdateUser(dataUser, reset) {
        setIsSend(true)
        api.setUserInfo(dataUser)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
                reset()
                setIsSend(false)
            })
            .catch(err => console.error(`error while editing profile ${err}`))
    }

    function handleUpdateAvatar(dataUser, reset) {
        setIsSend(true)
        api.setNewAvatar(dataUser)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
                reset()
                setIsSend(false)
            })
            .catch(err => console.error(`error while editing avatar ${err}`))
    }

    function handleAddCard(dataCard, reset) {
        setIsSend(true)
        api.addCard(dataCard)
            .then(res => {
                setCards([res, ...cards])
                closeAllPopups()
                reset()
                setIsSend(false)
            })
            .catch(err => console.error(`error while adding card ${err}`))
    }

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
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isSend={isSend}
                />
                <AddPlacePopup
                    onAddPlace={handleAddCard}
                    isOpen={isAddCardPopupOpen}
                    onClose={closeAllPopups}
                    isSend={isSend}

                />
                <PopupWithForm name="image">
                </PopupWithForm>
                <EditAvatarPopup
                    isSend={isSend}
                    onClose={closeAllPopups}
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupWithForm
                    name="delete" title="Вы уверены?" titleButton="Да"
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleDeleteSubmit}
                    isSend={isSend}>
                </PopupWithForm>
                <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups}>
                </ImagePopup>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;