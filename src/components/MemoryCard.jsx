import React from "react"
import classNames from "classnames"

export default function MemoryCard({hidden, icon, onClick, selected, solved}) {
    
    const cardClass = classNames(
        "card",
        {
            "hidden": hidden,
            "selected": selected,
            "solved" : solved
        }
    )
    
    return(
        <div className={cardClass} onClick={onClick}>
            {solved || selected ? icon : "?"}
        </div>

        
    )
}