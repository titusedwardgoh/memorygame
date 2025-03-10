import React from "react"
import {nanoid} from "nanoid"

export default function Form({categories , numbers, setParams, setGameRunning, loading, setLoading, formData, setformData, disabled}) {


    React.useEffect(()=>{
        if(categories.length>0){
            setLoading(false)
        }
    },[categories])

    const categoriesEl = categories.map((category)=>{
        return(
            <option key = {nanoid()}>{category}</option>
        )
    })
    
    const numbersEl = numbers.map((number)=>{
        return(
            <option key = {nanoid()}>{number}</option>
        )
    })

    function handleChange (e) {
        setformData(prev=>({...prev, [e.target.className]: e.target.value}))
    }

    function handleSubmit (e) {
        e.preventDefault()
        setParams(formData)
        setGameRunning(true)
    }

    return(
        <form onSubmit = {handleSubmit}>
            <label htmlFor = "category">Select a category</label>
            <select className = "category" onChange = {handleChange} value = {formData.category}>
                {loading ? (<option>...Loading categories</option>) : categoriesEl}
            </select>
            <label htmlFor = "number">Select a number</label>
            <select className = "number" onChange = {handleChange} value = {formData.number}>
                {numbersEl}
            </select>
            <button type = "submit" disabled = {disabled}>Start Game</button>
        </form>
    )
}