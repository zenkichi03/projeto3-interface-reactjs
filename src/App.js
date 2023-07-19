import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { Menu } from './Components/Menu';
import { ListarCliente } from './views/Cliente/Listar';
import { ListarPedido } from './views/Pedido/Listar';
import { ListarServico } from './views/Servico/Listar';
import { AtualizarCliente } from './views/Cliente/Atualizar';
import { AtualizaPedido } from './views/Pedido/Atualizar';
import { AtualizaServico } from './views/Servico/Atualizar';
import { PedidosCliente } from './views/Cliente/Consultar';
import { ServicoPedido } from './views/Pedido/Consultar';
import { PedidoServico } from './views/Servico/Consultar';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { CadastrarPedido } from './views/Pedido/Cadastrar';
import { CadastrarServico } from './views/Servico/Cadastrar';
import { ListarCompra } from './views/Compras/Listar';
import { ListarProduto } from './views/Produtos/Listar';
import { CadastrarCompra } from './views/Compras/Cadastrar';
import { AtualizarCompra } from './views/Compras/Atualizar';
import { ProdutoCompra } from './views/Compras/Consultar';
import { CadastrarProduto } from './views/Produtos/Cadastrar';
import { AtualizarProduto } from './views/Produtos/Atualizar';
import { CompraProduto } from './views/Produtos/Consultar';
import { CompraCliente } from './views/Cliente/Compras';


function App() {
  return (
    <div>
      <Router>
        <Menu></Menu>
        <Routes>
          <Route path='/' Component={Home}></Route>;
          <Route path='/listar-cliente' Component={ ListarCliente }></Route>;
          <Route path='listar-pedido' Component={ListarPedido}></Route>
          <Route path='listar-servico' Component={ListarServico}></Route>
          <Route path='/atualizar-cliente/:id' Component={AtualizarCliente}></Route>
          <Route path='/atualizar-pedido/:id' Component={AtualizaPedido}></Route>
          <Route path='/atualizar-servico/:id'Component={AtualizaServico}></Route>                              
          <Route path='/listar-pedido/:id' Component={PedidoServico}></Route>
          <Route path='/cadastrar-servico' Component={CadastrarServico}></Route>
          <Route path='/lista-pedido/:id' Component={PedidosCliente}></Route>
          <Route path='/lista-servico/:id' Component={ServicoPedido}></Route>
          <Route path='/cadastrar-cliente' Component={CadastrarCliente}></Route>
          <Route path='/cadastrar-pedido' Component={CadastrarPedido}></Route>
          <Route path='/listar-compra' Component={ListarCompra}></Route>
          <Route path='/listar-produto' Component={ListarProduto}></Route>
          <Route path='/cadastrar-compra' Component={CadastrarCompra}></Route>
          <Route path='/atualizar-compra/:id' Component={AtualizarCompra}></Route>
          <Route path='/produto-compra/:id' Component={ProdutoCompra}></Route>
          <Route path='/cadastrar-produto' Component={CadastrarProduto}></Route>
          <Route path='/atualizar-produto/:id' Component={AtualizarProduto}></Route>
          <Route path='/compra-produto/:id' Component={CompraProduto}></Route>
          <Route path='/compras-cliente/:id' Component={CompraCliente}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
