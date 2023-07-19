import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarCliente = ()=>{

    const[cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''        
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    })

    const cadCliente = async e =>{
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-type': 'application/json'
        }
        await axios.post(api + "/clientes",cliente,{headers})
        .then((response)=>{
            if (response.data.error){
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
        .catch(()=>{
            console.log("Erro: Sem conexão com a API.")
        })
    }

    return(
        <div>
            <Container>
                <div className="d-flex p-2">
                    <h1>Cadastro de clientes</h1>
                    <Link to={"/listar-cliente"} className="btn btn-sm btn-outline-primary m-auto">Clientes</Link>                                        
                </div>
                {status.type == "error" ? <Alert color="danger">{status.message}</Alert> : ""}                
                {status.type == "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <hr className="m-1"></hr>
                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input onChange={valorInput} required id="nome" name="nome" type="text" placeholder="Nome do cliente"></Input>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input onChange={valorInput} required id="endereco" name="endereco" type="text" placeholder="Endereço do cliente"></Input>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input onChange={valorInput} required id="cidade" name="cidade" type="text" placeholder="Endereço"></Input>                            
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>UF</Label>
                        <Input onChange={valorInput} required id="uf" name="uf" type="text" placeholder="Unidade Federativa"></Input>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data de Nascimento</Label>
                        <Input onChange={valorInput} required id="nascimento" name="nascimento" type="date" placeholder="Data de Nascimento"></Input>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente Desde: </Label>
                        <Input onChange={valorInput} required id="clienteDesde" name="clienteDesde" type="date" placeholder="date"></Input>
                    </FormGroup>
                    <Button type="submit" outline color="success">Cadastrar</Button>
                    <Button type="reset" outline color="secondary">Limpar</Button>
                </Form>
            </Container>
        </div>
    )
}