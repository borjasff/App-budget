import Spend from './Spend'


const SpendList = ({spends, setSpendEdit, deleteSpend, filter, spendFilters}) => {
  return (
    <div className='listado-gastos contenedor'>
        

        {filter ? (
          <>
          <h2>{spendFilters.length ? 'Gastos' : 'No hay Gastos en esta categoría'}</h2>
            {spendFilters.map( spend => (
              <Spend
                key={spend.id}
                spend={spend}
                setSpendEdit={setSpendEdit}
                deleteSpend={deleteSpend}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{spends.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>
            {spends.map( spend => (
              <Spend
                key={spend.id}
                spend={spend}
                setSpendEdit={setSpendEdit}
                deleteSpend={deleteSpend}
              />
            ))}
          </>

        ) }
    </div>
  )
}

export default SpendList