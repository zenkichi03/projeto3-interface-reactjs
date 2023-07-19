import axios from "axios"
import { Alert, Container, Table } from "reactstrap"

import { api } from "../../../config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ListarPedido = ()=>{

    const[data, setData] = useState([]);

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedido = async()=>{
        await axios.get(api + "/listapedidos")
        .then((response)=>{
            console.log(response.data.pedidos);
            setData(response.data.pedidos);
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API.'
            })
        });
    }

    const excluiPedido = async(idPedido)=>{
        const headers={
            'Content-type': 'application/json'
        };

        await axios.delete(api + "/excluirpedido/" + idPedido,{headers})
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
                getPedido();
            }
        })
        .catch(()=>{
            console.log("Erro de conexão.")
        })
    }

    useEffect(()=>{
        getPedido();
    },[]);

    return(
        <div>            
            <Container>                                
                <div className="p-2 d-flex">
                    <h1>Visualizar Pedidos</h1>
                    <div className="p-2 m-auto">
                        <Link to={"/cadastrar-pedido"} className="btn btn-sm btn-outline-primary">Cadastrar Pedido</Link>
                    </div> 
                </div>
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type == 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do pedido</th>
                            <th>Id do Cliente</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped =>(
                            <tr key={ped.id}>
                                <th>{ped.id}</th>
                                <td>{ped.dataPedido}</td>
                                <td>{ped.ClienteId}</td>
                                <td>                                    
                                    <Link to={"/atualizar-pedido/"+ ped.id} className="btn btn-sm btn-outline-warning">Editar</Link>
                                    <span className="btn btn-sm btn-outline-danger" onClick={()=> excluiPedido(ped.id)}>Excluir</span>
                                    <Link to={"/lista-servico/" + ped.id} className="btn btn-sm btn-outline-primary">Serviços</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}