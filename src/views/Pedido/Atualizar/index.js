import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const AtualizaPedido = ()=>{
    const { id }= useParams();

    const[pedido, setPedido] = useState({
        dataPedido: ''        
    })
    
    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const valorInput = e=> setPedido({
        ...pedido, [e.target.name]: e.target.value
    })    

    const editaPedido = async e =>{
        e.preventDefault();

        const headers={
            'Content-type': 'application/json'
        };

        await axios.put(api + "/atualizapedido/" + id,pedido,{headers})
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
            console.log("Erro de conexão com a API.")
        });
    }      

    return(
        <div>
            <Container>
                <div className="p-2 d-flex">
                    <h1>Editar informações do Pedido</h1>
                    <Link to={"/listar-pedido"} className="m-auto btn btn-sm btn-outline-primary">Pedidos</Link>
                </div>
                <hr className="m-1"></hr>
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                <Form className="p-2" onSubmit={editaPedido}>
                    <FormGroup>
                        <Label>Data do Pedido</Label>
                        <Input onChange={valorInput} required name="dataPedido" type="date"></Input>
                    </FormGroup>                                                                                    
                    <Button type="submit" outline color="success">Editar</Button>
                    <Button type="reset" outline color="secondary">Limpar</Button>
                </Form>                
            </Container>
        </div>
    )
}