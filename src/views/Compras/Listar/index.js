import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
import axios from "axios";

export const ListarCompra = ()=>{

    const[data, setData]= useState([]);

    const[status, setStatus]= useState({
        type: '',
        message: ''
    });

    const getCompra = async()=>{
        await axios.get(api + '/listacompras')
        .then((response)=>{
            setData(response.data.compras);                          
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro de conexão com a API.'
            });     
        });
    }

    const excluirCompra = async (idDaCompra) =>{
        const headers={
            'Content-Type': 'application/json'
        };

        await axios.delete(api + '/excluircompra/' + idDaCompra,{headers})
        .then((response)=>{
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
                getCompra();
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        });
    }

    useEffect(()=>{
        getCompra();
    },[])

    return(
        <Container>
            <div className="p-2 d-flex">
                <h1>Visualizar Compras</h1>
                <Link to={'/cadastrar-compra'} className="btn btn-sm btn-outline-primary m-auto">Cadastrar Compra</Link>                
            </div>
            {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type == 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>                        
                        <th>Data da Compra</th>
                        <th>ID do Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>(
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.data}</td>
                            <td>{item.ClienteId}</td>
                            <td>
                                <Link to={'/atualizar-compra/' + item.id} className="btn btn-sm btn-outline-warning">Editar</Link>
                                <span onClick={()=> excluirCompra(item.id)} className="btn btn-sm btn-outline-danger">Excluir</span>
                                <Link to={'/produto-compra/' + item.id} className="btn btn-sm btn-outline-primary">Produtos</Link>
                            </td>
                        </tr>                        
                    ))}                    
                </tbody>
            </Table>
        </Container>
    )
}