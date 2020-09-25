import { Modal } from "../modal";

export class Table {

 
    constructor(){
        
        this.createTable()
        this.getRegisters();
    }

    createTable(){

        const table = `    
        <div>
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
                <th>Endereço</th>
            </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
        </div>  
        </div>  
        `;

        $("#home").append(table);
        
    }


    setValues(registers){

        let that = this;

        registers.map((register ) => {
            $("#gridRegisters tbody").append(`
                <tr data-id="${register.id}">
                    <td>${register.id}</td>
                    <td>${register.nome}</td>
                    <td>${register.cpf}</td>
                    <td>${that.getSexo(register.sexo)}</td>
                    <td>${register.email}</td>
                    <td>${register.dataNascimento}</td>
                    <td>${register.naturalidade}</td>
                    <td>${register.nacionalidade}</td>
                    <td>${register.endereco}</td>
                </tr>
            `);

        })

        
        $('#gridRegisters tbody tr').click((evnt, element) => {
            let id = element.dataset.id;
            new Modal({
              title: 'Editar Pessoa',
              data: id
            });
        });
        

    }

    getRegisters(){
        let that = this;
        $.ajax({
            type: "GET",
            url: "https://desafio-meta-back.herokuapp.com/v2/pessoa/",
            headers: {
                "Authorization": "Basic " + btoa('meta' + ":" + 'meta@123')
              },
            success: function (response) {
                that.setValues(response.content);  
                return;
            }
        })
    }


    getSexo(sexo){
        if (sexo === "MASCULINO") {
            return 'Masculino';
        }else if(sexo === "FEMININO") {
            return 'Feminino';
        } else {
            return 'Outro';
        }        
    }
    
}