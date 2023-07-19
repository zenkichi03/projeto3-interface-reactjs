import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarServico = ()=>{

    const [servico, setServico] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });    

    const valorInput = e => setServico({
        ...servico,[e.target.name]: e.target.value
    })

    const cadServico = async e =>{
        e.preventDefault();
        console.log(servico);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/servicos",servico,{headers})
        .then((response)=>{
            // console.log(response.data.message)
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(() =>{
            console.log("Erro: Sem conexão com a API")
        })
    }

    return(
        <Container>
            <div>
                <div className="d-flex p-2">            
                    <h1>Cadastrar Serviço</h1>
                    <Link to={"/listar-servico"} className="btn btn-sm btn-outline-primary m-auto">Serviços</Link>                
                </div>                                    
                <hr className="m-1"></hr>
            </div>     

            {status.type == "error" ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type == "success" ? <Alert color="success">{status.message}</Alert> : ""}
            
            <Form className="p-2" onSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input required id="nome" name="nome" placeholder="Nome do serviço" type="text" onChange={valorInput}/>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input required id="descricao" name="descricao" placeholder="Descrição do serviço" type="text" onChange={valorInput}/>
                </FormGroup>                
                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="secondary">Limpar</Button>
            </Form>       
        </Container>
    )
}