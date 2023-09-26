import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatDate } from '../helpers'

import IconSaving from '../img/icono_ahorro.svg'
import IconHome from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconOthers from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscription from '../img/icono_suscripciones.svg'

const allIcons = {
  saving : IconSaving,
  food : IconFood, 
  home : IconHome,
  Others : IconOthers,
  leisure : IconLeisure,
  health : IconHealth,
  Subscription : IconSubscription
}

const Spend = ({spend, setSpendEdit, deleteSpend}) => {
  const { category, name, quantity, id,  date } = spend;
  const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setSpendEdit(spend) }>
              Editar
            </SwipeAction>
        </LeadingActions>
    )
      
  

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction 
          onClick={() => deleteSpend(id) }
          destructive= {true}
          >
          Eliminar
        </SwipeAction>
    </TrailingActions>
)

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={allIcons[category]} alt="Icon spend" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className='fecha-gasto'>
                Agregado el: {' '} <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Spend