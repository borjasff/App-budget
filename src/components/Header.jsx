import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'


const Header = ({
    spends,
    setBudget,
    setSpends,
    budget,  
    isValidBudget, 
    setIsValidBudget}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidBudget ?  (
            <BudgetControl

            spends={spends}
            budget= {budget}
            setSpends={setSpends}
            setBudget={setBudget}
            setIsValidBudget= {setIsValidBudget}
            />
        ): (
        <NewBudget
            budget= {budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
        />
        )}


    </header>
  )
}

export default Header