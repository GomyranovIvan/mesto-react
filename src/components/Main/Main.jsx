import { useEffect, useState } from "react"
import api from "../../utils/api"
import Card from "../Card/Card"

export default function Main({ onAvatar, onEditProfile, onAddCard, onCardClick }) {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()])
            .then(([dataUser, dataCard]) => {
                setUserName(dataUser.name)
                setUserDescription(dataUser.about)
                setUserAvatar(dataUser.avatar)
                dataCard.forEach((item) => item.myid = dataUser._id)
                setCards(dataCard)
            });
    }, [])

    return (
        <main>
            {/* Секция с отображением профиля */}
            <section className="profile">
                <div className="profile__avatar-overlay">
                    <img src={userAvatar} className="profile__avatar" alt="Аватар" onClick={onAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__button-edit" type="button" onClick={onEditProfile} />
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={onAddCard} />
            </section>
            {/* Место где отображаются карточки */}
            <section className="cards">{cards.map((item) => {
                return (
                    //реализуй кей
                    <div className="cards__item" key={item._id}>
                        <Card card={item} onCardClick={onCardClick} />
                    </div>
                )
            })}</section>
        </main>
    )
}