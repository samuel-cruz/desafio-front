export class Modal {
  constructor(config) {
    this.config = config;
    this.data =  false;
    
    this.initializer();    
  }

  initializer() {

    this.verifyModal(); 
    this.loadForm();
    this.show();
  }

  verifyModal() {
    document.getElementById("modal") ? this.addContent() : this.createModal();
  }

  createModal() {

    let modal = `   
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4 id="modalCenterTitle"></h4>

        <div class="row">
          <form class="col s12">
            <div class="row modal-form-row">
              <div class="input-field col s6">
                <input id="nome" type="text" class="validate">
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
                  <option value="" disabled selected>Escolha sua opção</option>
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
                <input id="nacionalidade" type="text" class="validate">
                <label for="nacionalidade">Nacionalidade</label>
              </div>
              <div class="input-field col s6">
                <input id="naturalidade" type="text" class="validate">
                <label for="naturalidade">Naturalidade</label>
              </div>
            </div> 
            <div class="row">
              <div class="input-field col s12">
                <textarea id="endereco" type="text" class="validate"></textarea>
                <label for="endereco">Endereço</label>
              </div>
            </div>          
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a class="btn waves-effect waves-light waves-effect teal waves-green modal-action modal-close ">Salvar</a>
      </div>
    </div>`;

    $("body").append(modal);
    $('select').formSelect()
    this.addContent();

  }

  addContent() {
    $("#modalCenterTitle").html(this.config.title);
    $("#btnSave").click(this.config.onSave);
  }

  show() {    
    $('#modal').modal();
    $('#modal').modal('open'); 
  }

  loadForm() {
    if (!this.data) return;
    $.ajax({
      type: "GET",
      url: "https://desafio-meta-back.herokuapp.com/v2/pessoa/"+this.data,
      headers: {
          "Authorization": "Basic " + btoa('meta' + ":" + 'meta@123')
        },
      success: function (response) {
        $(".modal-content input").map((index, element) => {
          element.value = response[element.id];
        });
        return;
      }
    })
  }
}