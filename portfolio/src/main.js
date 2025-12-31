import './style.css'
import data from './data.json';


function displayName(){
  let name = document.getElementById("name");
  name.textContent = data['basic-info'].name;


}

displayName();
