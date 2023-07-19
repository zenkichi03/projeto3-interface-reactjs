import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarCompra = ()=>{

    const [compra, setCompra]= useState({
        ClienteId: '',
        data: ''
    });

    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const valorDoInput = e => setCompra({
        ...compra,[e.target.name]: [e.target.value]
    });

    const cadastraCompra = async e=>{
        e.preventDefault();

        const headers={
            'Content-type': 'application/json'
        }

        await axios.post(api + '/compras',compra,{headers})
        .then((response)=>{
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
        });
    }

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Cadastrar Compra</h1>
                <Link to={'/listar-compra'} className="btn btn-sm btn-outline-primary m-auto">Compras</Link>
            </div>            
            {status.type == 'error' ? <Alert>{status.message}</Alert> : ''}
            {status.type == 'success' ? <Alert>{status.message}</Alert> : ''}
            <hr className="m-1"></hr>
            <Form onSubmit={cadastraCompra}>
                <FormGroup>
                    <Label>ID do Cliente</Label>
                    <Input onChange={valorDoInput} required name="ClienteId" type="text" placeholder="Informe o Identificador do cliente"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Data da Compra</Label>
                    <Input onChange={valorDoInput} required name="data" type="date"></Input>
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="secondary">Limpar</Button>
            </Form>
        </Container>
    )
}