import { useState, useEffect } from 'react'
import closeBtn from '../img/cerrar.svg'
import Message from './Message'

const Modal = ({setModal, animationModal, setAnimationModal, saveSpending, spendEdit, setSpendEdit}) => {

    const[message, setMessage] = useState('')
    const[name, setName] = useState('')
    const[quantity, setQuantity] = useState('')
    const[ category, setCategory] = useState('')
    const[ date, setDate] = useState('')
    const[ id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(spendEdit).length > 0) {
            setName(spendEdit.name)
            setQuantity(spendEdit.quantity)
            setCategory(spendEdit.category)
            setId(spendEdit.id)
            setDate(spendEdit.date)
          }
    }, [])

    //to remove modal
    const hideModal = () => {
        setAnimationModal(false)
        setSpendEdit({})
        setTimeout(() =>{
            setModal(false)
          }, 500);
    }
    //validate
    const handleSubmit = (e) => {
        e.preventDefault();

        //array of stage
        if([name, quantity, category].includes('')){
            setMessage('Todos los campos son obligatorios')
            setTimeout(() =>{
                setMessage('')
            },3000);
            return
        }
        //if this is validation, brind the function to generate the object
        saveSpending({name, quantity, category, id, date})
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={closeBtn} alt="close modal" onClick={hideModal} />
        </div>


        <form
        onSubmit={handleSubmit}
        className={`formulario ${animationModal ? 'animar' : 'cerrar'}`}>
            <legend>{spendEdit.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {message && <Message tipo="error">{message}</Message>}

            <div className="campo">
                <label htmlFor="name">Nombre</label>
                <input type="text"
                placeholder='Añade el nombre del gasto'
                id='name'
                value={name}
                onChange={e=> setName(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="quantity">Cantidad</label>
                <input type="number"
                placeholder='Añade la cantidad del gasto, ej. 300'
                id='quantity'
                value={quantity}
                onChange={e=> setQuantity(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="category">Categoría</label>
                <select id="category"
                        value={category}
                        onChange={e=> setCategory(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="saving">Ahorro</option>
                    <option value="food">Comida</option>
                    <option value="home">Casa</option>
                    <option value="Others">Gastos varios</option>
                    <option value="leisure">Ocio</option>
                    <option value="health">Salud</option>
                    <option value="Subscription">Suscripciones</option>
                </select>
            </div>
            <input className="campo" type="submit" value={spendEdit.name ? 'Guardar Cambios' : 'Añadir Gasto'}/>
        </form>
    </div>
  )
}

export default Modal