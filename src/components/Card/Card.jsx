import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ButtonLike from "../ButtonLike/ButtonLike"

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="cards__item">
            {currentUser._id === card.owner._id && <button className="cards__delete" type="button" onClick={() => onDelete(card._id)} />}
            
            <img src={card.link} className="cards__image" alt={card.name} onClick={() => onCardClick({ link: card.link, name: card.name })} />
            <div className="cards__inner">
                <h2 className="cards__caption">{card.name}</h2>
                <ButtonLike likes={card.likes} myid={currentUser._id} cardId={card._id} />
            </div>
        </div>
    )
}