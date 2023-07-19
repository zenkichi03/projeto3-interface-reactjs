import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Button, Form, Container, FormGroup, Label, Input, Alert } from "reactstrap"
import { api } from "../../../config";

export const AtualizaServico = ()=>{
    
    const { id }= useParams();

    const [servico, setServico]= useState({
        nome: '',
        descricao: ''
    });

    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const valorDosInputs = e=> setServico({
        ...servico,[e.target.name]: e.target.value
    })

    const editaServico = async e=>{
        e.preventDefault();

        const headers={
            'Content-type': 'application/json'
        }

        await axios.put(api + '/atualizaservico/' + id,servico,{headers})
        .then((response)=>{
            if(response.data.error == 'error'){
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
            console.log("Erro")
        });
    }

    return(
        <div>
            <Container>
                <div className="p-2 d-flex">
                    <h1>Editar Informações do Serviço</h1>
                    <Link to={"/listar-servico"} className="btn btn-sm btn-outline-primary m-auto">Serviços</Link>                    
                </div>                
                <hr className="m-1"></hr>
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type == 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={editaServico}>
                    <FormGroup>
                        <Label>Nome do Serviço</Label>
                        <Input onChange={valorDosInputs} required name="nome" placeholder="Nome do Serviço" type="text"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Descrição</Label>
                        <Input onChange={valorDosInputs} required name="descricao" placeholder="Descrição do Serviço" type="text"></Input>
                    </FormGroup>
                    <Button type="submit" outline color="success">Editar</Button>
                    <Button type="reset" outline color="secondary">Limpar</Button>
                </Form>  
            </Container>           
        </div>
    )
}