import { showSuccess, showError } from "../../utils/alert";
import { Table } from "../table";

export class Modal {
  constructor(config) {
    this.config = config;
    this.data = config.data || false;
    this.method = config.method || "POST";
    this.version = $("#version")[0].checked ? "v2" : "v1";
    this.initializer();
  }

  initializer() {
    this.verifyModal();
    this.show();
  }

  verifyModal() {
    document.getElementById("modal") ? this.addContent() : this.createModal();
  }

  createModal() {
    let that = this;
    let modal = `   
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4 id="modalCenterTitle"></h4>
        <div id="modalContent" class="row"></div>
      </div>
      <div id="modalBtn"class="modal-footer"></div>
    </div>`;

    $("body").append(modal);

    this.addContent();
  }

  addContent() {
    $("#modalCenterTitle").html(this.config.title);
    $("#modalContent").html("");
    $("#modalBtn").html("");

    if (this.method == "DELETE") {
      this.deleteContent();
    } else {
      this.addForm();
      $("#formRegister")[0].classList = "col s12 " + this.version;
    }
  }

  deleteContent() {
    $("#modalContent").html("Realmente deseja excluir este registro?");
    $("#modalBtn").html(`
      <div id="cmfModal" class="btn waves-effect waves-light waves-effect teal waves-green">Sim</div>
      <div id="cancelModal" class="btn waves-effect waves-light waves-effect teal waves-green modal-close">Não</div>    
    `);

    let id = this.data;
    let that = this;

    $("#cmfModal").click(function () {
      that.deleteRegister(id);
    });
  }

  addForm() {
    let that = this;

    $("#modalContent").append(` 
      <form id="formRegister" class="col s12">
        <div class="row modal-form-row">
          <div class="input-field col s6">
            <input id="nome" type="text" class="validate" required>
            <label for="nome">Nome</label>
          </div>
          <div class="input-field col s6">                
            <input id="email" type="email" class="validate">
            <label for="email">E-mail</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">                
            <select id="sexo">
              <option value="NAO_INFORMADO" disabled selected>Escolha sua opção</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
            </select>
            <label for="sexo">Sexo</label>
          </div>
          <div class="input-field col s6">
            <input id="dataNascimento" type="date" class="validate">
            <label for="dataNascimento">Data de nascimento</label>
          </div>
        </div> 
        <div class="row">
          <div class="input-field col s6">
            <input id="cpf" type="text" class="validate"></input>
            <label for="cpf">CPF</label>
          </div>
          <div class="input-field col s6">
            <input id="nacionalidade" type="text" class="validate">
            <label for="nacionalidade">Nacionalidade</label>
          </div>
        </div>
        <div class="row">              
          <div class="input-field col s6">
            <input id="naturalidade" type="text" class="validate">
            <label for="naturalidade">Naturalidade</label>
          </div>
          <div class="input-field col s6 fm-endereco">
            <textarea id="endereco" class="materialize-textarea validate"></textarea>
            <label for="endereco">Endereço</label>
          </div>
        </div>                
        <button type="submit" class="hide"></button>       
      </form>`);

    $("#modalBtn").append(`
      <div id="btnSave" class="btn waves-effect waves-light waves-effect teal waves-green">Salvar</div>`);

    $("#btnSave").click(function () {
      that.saveRegister();
    });

    this.loadForm();
    this.applyMask();
  }

  show() {
    $("#modal").modal();
    $("#modal").modal("open");
    $("select").formSelect();
  }

  loadForm() {
    $("#formRegister input, #formRegister select, #formRegister textarea").val(
      ""
    );
    $("#sexo").val("NAO_INFORMADO");

    if (!this.data) return;
    $.ajax({
      type: "GET",
      url: `https://desafio-meta-back.herokuapp.com/${this.version}/pessoa/${this.data}`,
      headers: {
        Authorization: "Basic " + btoa("meta" + ":" + "meta@123"),
      },
      success: function (response) {
        Object.keys(response).map(function (e) {
          if ($(`#${e}`).length) {
            $(`#${e}`).val(response[e]);
          }
        });
        return;
      },
    });
  }

  saveRegister() {
    let that = this;
    var data = {};
    $("#formRegister input, #formRegister select, #formRegister textarea ").map(
      function () {
        if (this.id == "cpf") {
          let value = cpf.value.replace(/\./g, "");
          value = value.replace(/\-/g, "");
          data["cpf"] = value;
        } else if (this.id != "") {
          data[this.id] = this.value;
        }
      }
    );

    let id = that.data ? that.data : "";

    $.ajax({
      url: `https://desafio-meta-back.herokuapp.com/${that.version}/pessoa/${id}`,
      method: that.method,
      timeout: 0,
      headers: {
        Authorization: "Basic " + btoa("meta" + ":" + "meta@123"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
      success: function (response) {
        new Table();
        $("#modal").modal("close");
        showSuccess("Ação realizada com sucesso.");
      },
      error: function (response) {
        showError(response.responseJSON.message);
      },
    });
  }

  deleteRegister() {
    let that = this;
    let id = that.data ? that.data : "";
    $.ajax({
      url: `https://desafio-meta-back.herokuapp.com/${that.version}/pessoa/${id}`,
      method: that.method,
      timeout: 0,
      headers: {
        Authorization: "Basic " + btoa("meta" + ":" + "meta@123"),
      },
      success: function (response) {
        new Table();
        $("#modal").modal("close");
        showSuccess("Registro removido com sucesso!");
      },
      error: function (response) {
        showError(response.responseJSON.message);
      },
    });
  }

  applyMask() {
    $("#cpf").mask("000.000.000-00", { reverse: false });
  }
}
