import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const AtualizarCliente = ()=>{

    const { id } = useParams();

    const[cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    })

    const[status, setStatus] = useState({
        type: '',
        message: ''
    })    

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    })

    const atualizaCliente = async e =>{
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api + "/atualizacliente/" + id,cliente,{headers})
        .then((response)=>{
            if(response.data.error == 'true'){
                console.log(response.data)
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
            console.log("Erro.");
        })        

    }

    return(
        <div>
            <Container>
                <div className="p-2 d-flex">
                    <h1>Editar Informações do Cliente</h1>
                    <Link to={"/listar-cliente"} className="btn btn-sm btn-outline-primary m-auto">Clientes</Link>
                </div>
                <hr className="m-1"></hr>    
                {status.type == "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type == "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={atualizaCliente}>
                    <FormGroup>
                        <Label>ID do cliente</Label>
                        <Input defaultValue={id} name="nome" type="text" placeholder="Nome do Cliente"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input onChange={valorInput} name="nome" type="text" placeholder="Nome do Cliente"></Input>
                    </FormGroup>
                     <FormGroup>
                        <Label>Endereço</Label>
                        <Input onChange={valorInput} name="endereco" type="text" placeholder="Endereço do Cliente"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cidade</Label>
                        <Input onChange={valorInput} name="cidade" type="text" placeholder="Cidade do Cliente"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>UF</Label>
                        <Input onChange={valorInput} name="uf" type="text" placeholder="Unidade Federativa"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nascimento</Label>
                        <Input onChange={valorInput} name="nascimento" type="date" placeholder="Data de Nascimento"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cliente Desde: </Label>
                        <Input onChange={valorInput} name="clienteDesde" type="date" placeholder="Cliente Desde"></Input>
                    </FormGroup>
                    <Button type="submit" outline color="success">Editar</Button>
                    <Button  type="reset" outline color="secondary">Limpar</Button>
                </Form>            
            </Container>
        </div>
    )
}