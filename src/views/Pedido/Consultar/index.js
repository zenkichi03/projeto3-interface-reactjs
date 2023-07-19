import axios from "axios"
import { Alert, Container, Table } from "reactstrap"

import { api } from "../../../config"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const ServicoPedido = ()=>{

    const {id} = useParams();

    const[data, setData] = useState([]);

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicoPedido = async()=>{
        await axios.get(api + "/pedidos/" + id + "/servicos")
        .then((response)=>{
            console.log(response.data.item);
            setData(response.data.item);
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API.'
            })
        });
    }

    useEffect(()=>{
        getServicoPedido();
    },[id]);

    return(
        <div>            
            <Container>                                
                <div className="p-2 d-flex">
                    <h1>Serviços do Pedido</h1>
                    <div className="p-2 m-auto">
                        <Link to={"/listar-pedido"} className="btn btn-sm btn-outline-primary">Pedidos</Link>
                    </div> 
                </div>
                {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID do serviço</th>                            
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped =>(
                            <tr key={ped.PedidoId}>
                                <th>{ped.ServicoId}</th>
                                <td>{ped.quantidade}</td>
                                <td>{ped.valor}</td>
                                {/* <td>
                                    <Link to={"/lista-servico/" + ped.id} className="btn btn-sm btn-outline-primary">Serviços</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}