import axios from "axios";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const PedidoServico = ()=>{
    /*
    * Aqui, seriam usadas as propriedades de match, para obter o parâmetro de id passado na rota, assim como se observa abaixo:
    * `const [id, setId] = useState(props.match.params.id);`
    * Porém, No react-router-dom v6, tal propriedade deixou de ser ser usada.
    * Agora, para acessar parâmetros informados em uma URL, o uso de hook é necessário, mais especificamente, o `useParams()`.
    */    

    const { id } = useParams();

    const [data, setData] = useState([]);    

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
   
    const getItens = async()=>{
        await axios.get(api + "/servico/" + id + "/pedidos")
        .then((response)=>{
            console.log(response.data.item);
            setData(response.data.item);
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API'
            })                
        });
    }

    useEffect(()=>{
        getItens();
    },[id]);

    return(
        <div>
            <Container>
                <div className="p-2 d-flex">
                    <h1>Pedidos do serviço </h1>
                    <Link to={'/listar-servico'} className="m-auto btn btn-sm btn-outline-primary">Serviços</Link>
                </div>
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                ID do Pedido
                            </th>
                            <th>
                                Quantidade
                            </th>
                            <th>
                                Valor
                            </th>
                            {/* <th>
                                Visualizar
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>                        
                        {data.map(item =>(
                            <tr key={item.ServicoId}>
                                <th>{item.PedidoId}</th>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                {/* <td>
                                    <Link to={"/listar-pedido/"} className="btn btn-outline-primary btn-sm">Consultar</Link>
                                </td> */}
                            </tr>
                        ))}                       
                    </tbody>                    
                </Table>
            </Container>
        </div>
    );
};