import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Form, Container, FormGroup, Input, Label, Alert } from "reactstrap"
import { api } from "../../../config";
import axios from "axios";

export const CadastrarPedido = ()=>{

    const[pedido, setPedido] = useState({
        dataPedido: '',
        ClienteId: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]: e.target.value
    })

    const cadPedido = async e =>{
        e.preventDefault();
        console.log(pedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/pedidos",pedido,{headers})
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
        .catch(()=>{
            console.log("Erro: Sem conexão com a API")
        });
    }

    return(
        <div>
            <Container>
                <div className="p-2 d-flex">
                    <h1>Cadastrar Pedidos</h1>
                    <Link to={"/listar-pedido"} className="m-auto btn btn-sm btn-outline-primary">Pedidos</Link>
                </div>
                <hr className="m-1"></hr>
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type == 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>Data do Pedido</Label>
                        <Input onChange={valorInput} required id="dataPedido" name="dataPedido" placeholder="Data do Pedido" type="date"></Input>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ID do Cliente</Label>
                        <Input onChange={valorInput} required id="ClienteId" name="ClienteId" placeholder="Id do Cliente" type="text"></Input>
                    </FormGroup>
                    <Button type="submit" outline color="success">Cadastrar</Button>
                    <Button type="reset" outline color="secondary">Limpar</Button>
                </Form>
            </Container>
        </div>
    )
}