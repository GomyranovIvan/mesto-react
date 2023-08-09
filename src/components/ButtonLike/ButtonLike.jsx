import { useState, useEffect } from "react"
import api from "../../utils/api"

export default function ButtonLike({ likes, myid, cardId }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(element => myid === element._id))
    }, [likes, myid])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardId)
                .then(res => {
                    setIsLike(false)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`error when removing like ${err}`))
        } else {
            api.addLike(cardId)
                .then(res => {
                    setIsLike(true)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`error when adding like ${err}`))
        }
    }

    return (
        <div className="cards__likes-container">
            <button className={`cards__like ${isLike ? 'cards__like_active' : ''}`} type="button" onClick={handleLike} />
            <span className="cards__counter-likes">{count}</span>
        </div>
    )
}