import {useState, useEffect } from 'react'

const Filtros = ({filter, setFilter}) => {
  return (
    <div className='filters sombra contenedor'>
    <form >
        <div className="campo dos-columnas">
            <label >Filtrar Gastos</label>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="">-- Todas las categorías --</option>
                <option value="saving">Ahorro</option>
                <option value="food">Comida</option>
                <option value="home">Casa</option>
                <option value="Others">Gastos varios</option>
                <option value="leisure">Ocio</option>
                <option value="health">Salud</option>
                <option value="Subscription">Suscripciones</option>
            </select>
        </div>
    </form>
</div>
  )
}

export default Filtros