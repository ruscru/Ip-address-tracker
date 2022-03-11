
import { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  
  const [linea1, setLinea1] = useState('')
  const [linea2, setLinea2] = useState('')
  const [imagen, setImagen] = useState('none')

  const [imagenSelector, setImagenSelector] = useState([
    { "nombre": "none" , "valor" : true},
    { "nombre": "bebe" , "valor" : false},
    { "nombre": "fire" , "valor" : false},
    { "nombre": "futurama" , "valor" : false},
    { "nombre": "natgeo" , "valor" : false},
    { "nombre": "pensando" , "valor" : false}
  ])
  
  const onChageLinea1 = function (evento){
    setLinea1(evento.target.value);

  }
  
  const onChageLinea2 = function (evento){
    setLinea2(evento.target.value);

  }

  const onClickImage = function (evento){    
    setImagen(evento.target.name);
    changeStateImagen(evento.target.name)
  }

  const changeStateImagen = function (nombre){
    imagenSelector.map(imagen => console.log(imagen.nombre, imagen.valor) )
    const newImagenSelector = imagenSelector.map(imagen => {
      if(imagen.nombre === nombre){
        imagen.valor = true;
      }
      else{
        imagen.valor = false;
      }
      return imagen;
    })
    setImagenSelector(newImagenSelector)
  }

  const onClickExportar = function (evento){
    html2canvas(document.querySelector("#meme")).then(canvas => {
      var link = document.createElement('a');
      link.download = "meme.png";
      link.href= canvas.toDataURL("image/png");
      link.click();
  });

  }

  return (
    <div className="App">
      <header>
        <h1>Meme app</h1>
      </header>
      <aside id="leftTool">
        <p className="textoGeneral">Selecciona una imágen</p>
        <div>
        {
          imagenSelector.map(imagen =>             
            <img 
              className={`imagenSelector ${imagen.valor ? "seleccionado" : "" }`}
              name={imagen.nombre} 
              alt="imagen meme" 
              src={"img/"+imagen.nombre+".jpg"}
              onClick={onClickImage}/>
          )
        }
        </div>
        
        <input type="text" className="inpLinea" placeholder="Escribe la línea 1" name="linea1" onChange={onChageLinea1}/>
        <input type="text" className="inpLinea" placeholder="Escribe la línea 2" name="linea2" onChange={onChageLinea2} />
     
        <button className="btnExportar" onClick={onClickExportar}>Exportar</button>
       
      </aside>
      <div className="resultMeme" id="meme">
        <span className="linea1">{linea1}</span>        
        <img 
          className="imagen" 
          name="imagen" 
          alt="imagen meme" 
          src={"img/"+ imagen +".jpg"} />
        <span className="linea2">{linea2}</span>
      </div>    
    </div>
  );
}

export default App;
