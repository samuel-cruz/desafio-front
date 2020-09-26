import "./style.css";
import { Modal } from "../modal";
import { Table } from "../table";

export class Home {
  constructor() {
    this.checked = true;
    this.initialize();
  }

  initialize() {
    $("body").css("background-image", "none").addClass("has-fixed-sidenav");

    $("#root").empty();
    $("<div/>").attr("id", "home").appendTo("#root");

    this.drawNavBar();
    this.createHeader();
    this.createTable();
    this.checkVersion();
  }

  drawNavBar() {
    const navBar1 = `
    <nav>
      <div class="nav-wrapper  light-blue lighten-1">
        <a href="https://www.meta.com.br/" target="_blank" class="brand-logo">Meta</a>
      </div>
    </nav>
    `;

    $("header").append(navBar1);

    $("#mainMenu").empty();
  }

  createHeader() {
    let html = `
    <div class="row">
      <div class="row">
        <h2 class="grey-text">Listagem de pessoas</h1>
      </div>
      <p>
        <label>
          <input id="version" type="checkbox"  checked="checked"/>
          <span>Utilizar a versão mais recente</span>
        </label>
      </p>
      <div class="row">
        <span  id="btnAdd">
          <a class="btn btn-floating waves-effect waves-light blue right"><i class="material-icons left">add</i></a>
        </span>
      </div>
    </div>`;

    $("#home").append(html);

    let that = this;

    $("#btnAdd").click(() => {
      new Modal({
        title: "Adicionar Pessoa",
        method: "POST",
      });
      $("select").formSelect();
    });
  }

  createTable() {
    new Table();
  }

  checkVersion() {
    $("#version").change(function () {
      this.checked
        ? $("#gridRegisters").removeClass("v1")
        : $("#gridRegisters").addClass("v1");
    });
  }
}
