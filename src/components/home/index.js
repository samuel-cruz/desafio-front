import "./style.css";
import { Modal } from "../modal";
import { Table } from "../table";

export class Home {
  constructor() {
    this.initialize();
  }

  initialize() {
    $("body").css("background-image", "none").addClass("has-fixed-sidenav");

    $("#root").empty();
    $("<div/>").attr("id", "home").appendTo("#root");

    this.drawNavBar();
    this.createHeader();
    this.createTable();
  }

  drawNavBar() {
    const navBar1 = `
    <nav>
      <div class="nav-wrapper  light-blue lighten-1">
        <a href="https://www.meta.com.br/" target="_blank" class="brand-logo">Meta</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">Home</a></li>
          <li><a href="cadatrar-pessoa.html">Cadastrar pessoa</a></li>
        </ul>
      </div>
    </nav>
    `;

    $("header").append(navBar1);

    $("#mainMenu").empty();
  }

  createHeader(){
    let html=`<div class="row">

      <div class="row">
        <h2 class="grey-text">Listagem de pessoas</h1>
      </div>
      <div class="row">
        <div class="file-field input-field">
          <a class="btn btn-floating waves-effect waves-light blue right"><i class="material-icons left">search</i>>Button
          </a>
          <div class="file-path-wrapper">
            <input id="email_input" type="text">
          </div>
        </div>

        <span  id="btnAdd">
          <a class="btn btn-floating waves-effect waves-light blue right"><i class="material-icons left">add</i></a>
        </span>
      </div>
    </div>`;

    $("#home").append(html);

    $("#btnAdd").click(() => {
      new Modal({
        title: 'Adicionar Pessoa',
        onSave: ''
      });
    });

  }


  createTable() {
    new Table();    
  }
}
