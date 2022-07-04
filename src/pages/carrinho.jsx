import React from 'react';
import { Link } from 'react-router-dom'

import { LISTA_PRODUTOS } from '../data'

export default class Carrinho extends React.Component {
    constructor(props) { //construtor para criar o state do meu carrinho e setar minhas funções.
        super(props);

        this.state = {
            carrinho: []
        }
        this.onChangeQuantidade = this.onChangeQuantidade.bind(this)
        this.onRemoveItem = this.onRemoveItem.bind(this)
    }

    onChangeQuantidade(indice, e) {
        let { carrinho } = this.state;
        let value = e.target.value || 0

        if (value < 0) {
            return
        } 
        carrinho[indice].quantidade = value
        
        this.setState({ carrinho })
        window.sessionStorage.setItem('carrinho', JSON.stringify(carrinho))
    }

    onRemoveItem(index) {
        let { carrinho } = this.state;
        carrinho.splice(index, 1)
        this.setState({ carrinho })
        window.sessionStorage.setItem('carrinho', JSON.stringify(carrinho))
    }

    calculandoTotal() {
        let total = 0
        this.state.carrinho.map(item => {
            let produto = LISTA_PRODUTOS[item.id]
            total += (produto.valor * item.quantidade) 
            return 0
        })
        return total
    }

    componentDidMount() {
        let carrinho = window.sessionStorage.getItem('carrinho') 
        carrinho = carrinho ? JSON.parse(carrinho) : []

        this.setState({ carrinho })
    }

    render() {
        return <div>
            <h2 className='text-center my-3'>Carrinho</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Produto</td>
                        <td>Descrição</td>
                        <td>Valor</td>
                        <td>Quantidade</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.carrinho.map(({ id, quantidade }, indice) => {
                        let item = LISTA_PRODUTOS[id]
                        return <tr key={id}>
                            <td><i className='bi bi-trash btn btn-danger btn-sm' onClick={() => this.onRemoveItem(indice)} /></td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{item.valor}</td>
                            <td>
                                <input
                                    className='form-control'
                                    value={quantidade}
                                    style={{ width: 80 }}
                                    type='number'
                                    onChange={(e) => this.onChangeQuantidade(indice, e)}
                                />
                            </td>
                            <td>{item.valor * quantidade}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <Link
                className="btn btn-primary"
                to='/'
                title='Voltar ao Inicio'
                style={{
                    position: "absolute",
                    left: 10,
                    bottom: 10,
                    fontSize: 30,
                    width: 60
                }}
            >
                <i className='bi bi-house' />
            </Link>

            <label style={{
                position: 'absolute',
                bottom: 10,
                fontSize: 40,
                marginLeft: '30%',
                marginRight: '50%',
                width: "50%"
            }}
            >
                Total: R$ {this.calculandoTotal()},00
            </label>

            <button
                className="btn btn-danger"
                title='Limpar carrinho'
                onClick={() => {
                    window.sessionStorage.setItem('carrinho', JSON.stringify([]))
                    this.setState({ carrinho: [] })
                }}
                style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    fontSize: 30,
                    width: 60
                }}
            >
                <i className='bi bi-trash' />
            </button>
        </div>
    }
} 