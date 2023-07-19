import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const AtualizarProduto = ()=>{

    const {id}= useParams();

    const[produto, setProduto]= useState({
        nome: '',
        descricao: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorDosInputs = e=> setProduto({
        ...produto,[e.target.name]: e.target.value
    });

    const editaPedido = async e=> {
        e.preventDefault();

        const headers={
            'Content-type': 'application/json'
        };

        await axios.put(api + '/atualizaproduto/' + id,produto,{headers})
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
        })
    }

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Editar Informações do Produto</h1>
                <Link to={'/listar-produto'} className="btn btn-sm btn-outline-primary m-auto">Produtos</Link>
            </div>
            <hr className="m-1"></hr>
            {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
            {status.type == 'success' ? <Alert color="success"> {status.message} </Alert> : ""} 
            <Form onSubmit={editaPedido}>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input onChange={valorDosInputs} name="nome" type="text" placeholder="Nome do Produto"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Input onChange={valorDosInputs} name="descricao" type="text" placeholder="Descrição do Produto"></Input>
                </FormGroup>
                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="secondary">Limpar</Button>
            </Form>
        </Container>
    )
}