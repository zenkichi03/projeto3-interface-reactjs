import axios from "axios";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarServico = ()=>{

    const [data, setData] = useState([]);

    const [status ,setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async()=>{
        await axios.get(api + "/listaservicos")
        .then((response)=>{                                            
            console.log(response.data.servicos);
            setData(response.data.servicos);                            
        })
        .catch(()=>{            
            setStatus({
                type: 'error',
                message: 'Erro: Sem  conexão com a API'
            })
        });
    }

    const excluiServico = async (idServico)=>{
        const headers={
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/excluirservico/" + idServico,{headers})
        .then((response)=>{
            if(response.data.error == 'true'){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message                    
                });
                getServicos();
            }
        });
    }

    useEffect(()=>{
        getServicos();
    },[]);

    return(
        <div>
            <Container>
                <div className="p-2 d-flex m-auto">
                    <h1>Visualizar serviços</h1>                    
                    <div className="m-auto">
                    <Link to={"/cadastrar-servico"} className="btn btn-outline-primary btn-sm">Cadastrar Serviço</Link>                    
                    </div>                    
                </div>                
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type == 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
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
                                Descricao
                            </th>
                            <th>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>(
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/atualizar-servico/"+ item.id} className="btn btn-sm btn-outline-warning">Editar</Link>                                    
                                    <span className="btn btn-sm btn-outline-danger" onClick={()=> excluiServico(item.id)}>Excluir</span>
                                    <Link to={"/listar-pedido/"+ item.id} className="btn btn-outline-primary btn-sm">Pedidos</Link>
                                </td>
                            </tr>
                        ))}                       
                    </tbody>                    
                </Table>
            </Container>
        </div>
    );
};