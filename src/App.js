import { useEffect, useState } from "react"

function App() {
  const [personajes,setPersonajes] = useState([])

  useEffect(() => {
    getData().then(data => setPersonajes(data))
  },[])

  return (
    <>
      <div className="container" style={{marginTop:'1rem'}}>
        <div className="container">
          <input style={{border:'solid 1px'}} placeholder="Buscar personaje" className="form-control" onChange={(e) => {
            getData().then(data => {
              if (!e.target.value) {
                return setPersonajes(data)
              }
              let busqueda = data.filter(personaje => personaje.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`))
              return setPersonajes(busqueda)
            })
            
          }}/>
        </div>
      </div>
      <Cards data={personajes === [] ? 'no hay data' : personajes}></Cards>
    </>
  )
}

function Cards({data}) {
  return(
    <div className="container" style={{marginTop:'1rem',marginBottom:'2rem'}}>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {
            data.map((personaje,key) => {
              return(
                <div className="col" key={key}>
                  <div className="card border-dark" style={{border:'solid 1px'}}>
                    <img src={personaje.image} className="card-img-top" style={{height:'25rem',width:'100%',borderRadius:'5px'}} alt={key}/>
                    <div className="card-body">
                      <h5 className="card-title">{personaje.name}</h5>
                      <p className="card-text text-primary-emphasis">Altura: {personaje.height}<br/>
                      Peso: {personaje.mass}Kg<br/>Genero: {personaje.gender}<br/>
                      Especie: {personaje.species}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

async function getData() {
  const res = await fetch('https://akabab.github.io/starwars-api/api/all.json')
  const data = await res.json()
  return data
}

export default App;
