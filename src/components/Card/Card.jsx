import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="cards__item">
            {currentUser._id === card.owner._id && <button className="cards__delete" type="button" onClick={onDelete} />}
            
            <img src={card.link} className="cards__image" alt={card.name} onClick={() => onCardClick({ link: card.link, name: card.name })} />
            <div className="cards__inner">
                <h2 className="cards__caption">{card.name}</h2>
                <div className="cards__likes-container">
                    <button className="cards__like" type="button" />
                    <span className="cards__counter-likes">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}