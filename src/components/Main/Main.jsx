import { useContext } from "react"
import Card from "../Card/Card"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Spinner from "../Spinner/Spinner"

export default function Main({ onAvatar, onEditProfile, onAddCard, onDelete, onCardClick, cards, isLoading }) {
    
    const currentUser = useContext(CurrentUserContext)


    return (
        <main>
            {/* Секция с отображением профиля */}
            <section className="profile">
                <div className="profile__avatar-overlay">
                    <img src={currentUser.avatar ? currentUser.avatar : "#"} className="profile__avatar" alt="Аватар" onClick={onAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name ? currentUser.name : ""}</h1>
                    <button className="profile__button-edit" type="button" onClick={onEditProfile} />
                    <p className="profile__description">{currentUser.about ? currentUser.about : ""}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={onAddCard} />
            </section>
            {/* Место где отображаются карточки */}
            <section className="cards">
                {isLoading ? <Spinner />  : cards.map((item) => {
                return (
                        <Card key={item._id} card={item} onCardClick={onCardClick} onDelete={onDelete} />
                )
            })}
            {/* <Spinner /> */}
            </section>
        </main>
    )
}