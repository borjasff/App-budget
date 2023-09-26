import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import SpendList from './components/SpendList'
import { generateId } from './helpers'
import IconNewSpend from './img/nuevo-gasto.svg'
import Filters from './components/Filters'


function App() {

  //state to spends
  const[spends, setSpends] = useState( 
    localStorage.getItem('spends') ? JSON.parse(localStorage.getItem('spends')) :  [] )

  //state to budget
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  //if have a budget, go to the panel
  useEffect(() =>  {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0

    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [])

    //state to validation
  const [isValidBudget, setIsValidBudget] = useState(false)

  //state to modal
  const [modal, setModal] = useState(false)

    //state to animation to modal
  const [animationModal, setAnimationModal] = useState(false)

  //spend to edit, is a object
  const [spendEdit, setSpendEdit] = useState({})

  //filter
  const [filter, setFilter] = useState('')
  const [spendFilters, setSpendFilters] = useState([])

  //send to modal edit 
  useEffect(() => {
    if(Object.keys(spendEdit).length > 0) {
      setModal(true)
  
      setTimeout(() =>{
        setAnimationModal(true)
      }, 500);
    }
  }, [spendEdit])

  //to localStorage
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget]);

    //to localStorage
    useEffect(() => {
      localStorage.setItem('spends', JSON.stringify(spends) ?? [])
    }, [spends]);

    //to filters
    useEffect(() => {
      if(filter){
        //filter spends by category
          const  spendsFilters = spends.filter(spend => spend.category === filter)

          setSpendFilters(spendsFilters)
      }

    }, [filter]);

  //to add animations with de NEW Modal
  const handleNewSpend = () => {
    setModal(true)
    setSpendEdit({})

    setTimeout(() =>{
      setAnimationModal(true)
    }, 500);
  }

  //save changes or new modal
  const saveSpending = spend => {
    if(spend.id) {
      //update
      const spendUpdate = spends.map( spendState => spendState.id === spend.id ? spend : spendState)
      setSpends(spendUpdate)
      setSpendEdit({})
    } else {
      // new spend
      spend.id = generateId();
      spend.date = Date.now();
      setSpends([...spends, spend])
    }

    setAnimationModal(false)
    setTimeout(() =>{
        setModal(false)
      }, 500);
}
  //delete spend
  const deleteSpend = id => {
    const spendUpdate = spends.filter( spend => spend.id !== id)
    setSpends(spendUpdate)
}

  return (

      <div className={modal ? 'fijar' : ''}>
        <Header
        //to header
        spends={spends}
        setSpends={setSpends}
        budget= {budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        />

        {isValidBudget && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <SpendList
              //to spendlist
                spends={spends}
                setSpendEdit={setSpendEdit}
                deleteSpend={deleteSpend}
                filter={filter}
                spendFilters={spendFilters}
              />
            </main>
              <div className="nuevo-gasto">
                <img 
                src={IconNewSpend}
                alt='Icon New Spend'
                onClick={handleNewSpend}
                />
              </div>
        </>
        )}
        
        {modal && <Modal
        //to modal        
            setModal={setModal}
            animationModal={animationModal}
            setAnimationModal={setAnimationModal}
            saveSpending={saveSpending}
            spendEdit={spendEdit}
            setSpendEdit={setSpendEdit}
        />}

      </div>
  )
}

export default App
