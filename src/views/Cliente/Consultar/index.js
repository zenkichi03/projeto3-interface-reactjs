import axios from "axios";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const PedidosCliente = () =>{

    const {id} = useParams();

    const [data , setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidoCliente = async()=>{
        await axios.get(api + "/cliente/" + id + "/pedidos")
        .then((response)=>{
            console.log(response.data.item);
            setData(response.data.item);
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível conectar-se ao servidor'
            })
        });
    }

    useEffect(()=>{
        getPedidoCliente();
    },[id]);

    return(
        <div>
            <Container>                
                <div className="p-2 d-flex">
                    <h1>Pedidos do Cliente</h1>
                    <Link to={'/listar-cliente'} className="m-auto btn btn-sm btn-outline-primary">Clientes</Link>
                </div> 
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}               
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                ID do pedido
                            </th>
                            <th>
                                Data do Pedido
                            </th>                                                                                    
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>(
                            <tr key={item.ClienteId}>
                                <th>{item.id}</th>
                                <td>{item.dataPedido}</td>
                                {/* <td>
                                    <Link to={"/listagem-servico"} className="btn btn-sm btn-outline-primary">Serviços</Link>
                                </td> */}
                            </tr>  
                        ))}                        
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};