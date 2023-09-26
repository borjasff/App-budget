import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"



const BudgetControl = ({budget, spends, setSpends, setBudget, setIsValidBudget }) => {

    const [percent, setPercent] = useState(0)
    // to show the spent of budget
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    useEffect(() => {
        const totalSpent = spends.reduce( (total, spend) => spend.quantity + total, 0);

        const totalAvailable = budget - totalSpent

        // percent spent with 2 digit
        const newPercent = (( (budget - totalAvailable) / budget) * 100).toFixed(2)

        
        setAvailable(totalAvailable)
        setSpent(totalSpent)
        setTimeout(() => {
          setPercent(newPercent)  
        }, 1300);
    }, [spends])

    //USD format
    const formatAmount = (amount) => {
        return amount.toLocaleString('en-Us', {
            style: 'currency',
            currency: 'USD'
        });
    }

    const handleResetApp = () => {
        const result = confirm('Deseas reiniciar el presupuesto y gastos?');

        if(result ){
            setSpends([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <p>
        <CircularProgressbar
        styles={buildStyles({
            pathColor: percent > 100 ? '#DC2626' : '#3B82F6' ,
            trailColor:'#F5F5F5',
            textColor: percent > 100 ? '#DC2626' : '#3B82F6'
        })}
        value={percent}
        text={`${percent}% Gastado`}
        />
        
        </p>
        <div className="contenido-presupuesto">
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatAmount(budget)}
            </p>
            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatAmount(available)}
            </p>
            <p>
                <span>Gastado: </span> {formatAmount(spent)}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl