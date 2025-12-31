import './style.css'
import data from './data.json';

let name = document.getElementById("name");
name.textContent = data['basic-info'].name;

