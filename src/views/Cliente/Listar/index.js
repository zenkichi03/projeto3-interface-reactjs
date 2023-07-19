import axios from "axios";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarCliente = () =>{

    const [data , setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async()=>{
        await axios.get(api + "/listaclientes")
        .then((response)=>{
            console.log(response.data.clientes);
            setData(response.data.clientes);
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível conectar-se ao servidor'
            })
        });
    }

    const excluiCliente = async(idCliente)=>{
        console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/excluicliente/" + idCliente,{headers})
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
                getClientes();
            }
        })
        .catch(()=>{
            console.log("Erro de conexão.")
        })
    }

    useEffect(()=>{
        getClientes();
    },[]);

    return(
        <div>
            <Container>                
                <div className="p-2 d-flex">
                    <h1>Visualizar Clientes</h1>                    
                    <div className="p-2 m-auto">
                        <Link to={"/cadastrar-cliente"} className="btn btn-sm btn-outline-primary">Cadastrar Cliente</Link>
                    </div>        
                </div>                                             
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}               
                {status.type == 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Nome
                            </th>
                            <th>
                                Endereço
                            </th>
                            <th>
                                Cidade
                            </th>
                            <th>
                                UF
                            </th>
                            <th>
                                Nascimento
                            </th>
                            <th>
                                Cliente Desde
                            </th>                            
                            <th className="text-center">
                                Acões
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>(
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.clienteDesde}</td>                                                            
                                <td className="text-center">
                                    <Link to={"/atualizar-cliente/" + item.id} className="btn btn-sm btn-outline-warning">Editar</Link>                                
                                    <span className="btn btn-sm btn-outline-danger" onClick={()=> excluiCliente(item.id)}>Excluir</span>
                                    <Link to={"/lista-pedido/" + item.id} className="btn btn-sm btn-outline-primary">Pedidos</Link>
                                    <Link to={'/compras-cliente/' + item.id} className="btn btn-sm btn-outline-primary">Compras</Link>
                                </td>                                
                            </tr>  
                        ))}                        
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};