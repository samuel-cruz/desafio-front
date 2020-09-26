import { Modal } from "../modal";

export class Table {
  constructor() {
    this.version = $("#version")[0].checked ? "v2" : "v1";
    this.verifyTable();
  }

  verifyTable() {
    document.getElementById("gridRegisters")
      ? this.getRegisters()
      : this.createTable();
  }

  createTable() {
    const table = `    
        <div id="tableRegisters">
            <table id="gridRegisters"class="responsive-table striped highlight">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Sexo</th>
                    <th>E-mail</th>
                    <th>Dt. nasc.</th>
                    <th>Naturalidade</th>
                    <th>Nacionalidade</th>
                    <th class="endereco">Endereço</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>                
                </tbody>
            </table> 
        </div>`;

    $("#home").append(table);

    this.getRegisters();
  }

  getRegisters() {
    let that = this;
    $.ajax({
      type: "GET",
      url: `https://desafio-meta-back.herokuapp.com/${that.version}/pessoa/`,
      headers: {
        Authorization: "Basic " + btoa("meta" + ":" + "meta@123"),
      },
      success: function (response) {
        that.setValues(response);
        return;
      },
    });
  }

  setValues(registers) {
    let that = this;

    $("#gridRegisters tbody").html("");
    $("#tableRegisters .center-align").remove();

    if (registers == null) {
      $("#tableRegisters").append(
        `<div class="center-align">Sem registros.</div>`
      );
    } else {
      registers.content.map((register) => {
        $("#gridRegisters tbody").append(`<tr>
                    <td class="id">${that.emptyField(register.id)}</td>
                    <td class="nome">${that.emptyField(register.nome)}</td>
                    <td class="cpf">${that.emptyField(register.cpf)}</td>
                    <td class="sexo">${that.getSexo(register.sexo)}</td>
                    <td class="email">${that.emptyField(register.email)}</td>
                    <td >${that.emptyField(
                      this.getDateFormated(register.dataNascimento)
                    )}</td>
                    <td class="naturalidade">${that.emptyField(
                      register.naturalidade
                    )}</td>
                    <td class="nacionalidade">${that.emptyField(
                      register.nacionalidade
                    )}</td>
                    <td class="endereco">${that.emptyField(
                      register.endereco
                    )}</td>
                    <td>
                        <button type="button" data-id="${
                          register.id
                        }" class="btn btn-danger btn-xs cyan btnEditRegister">
                            <i class="material-icons">edit</i>
                        </button>
                        <button  type="button" data-id="${
                          register.id
                        }" class="btn btn-danger btn-xs red btnDeleteRegister">
                            <i class="material-icons">delete</i>
                        </button>                    
                    </td>                       
                </tr>`);
      });
    }

    $(".cpf").mask("000.000.000-00", { reverse: false });
    $(".dataNascimento").mask("9/99/9999", { placeholder: "dd/mm/YYYY" });

    $(".btnEditRegister").click(function () {
      let id = this.dataset.id;
      new Modal({
        title: "Editar Pessoa",
        data: id,
        method: "PUT",
      });
      $("select").formSelect();
    });
    $(".btnDeleteRegister").click(function () {
      let id = this.dataset.id;
      new Modal({
        title: "Deletar Pessoa",
        data: id,
        method: "DELETE",
      });
    });
  }

  emptyField(value) {
    if (!value) {
      return "";
    } else {
      return value;
    }
  }

  getSexo(sexo) {
    if (sexo === "MASCULINO") {
      return "Masculino";
    } else if (sexo === "FEMININO") {
      return "Feminino";
    } else if (sexo === "NAO_INFORMADO") {
      return "Vazio";
    } else {
      return "Outro";
    }
  }

  getDateFormated(date) {
    const dateSplit = date.split("-");
    return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
  }
}
