import * as reader from 'readline-sync';
import { ProductController } from '../controller/controleEstoque';

export const addProduct = async () => {
    console.log('MENU - Adicionar Produto')

    
    const nome = reader.question('Nome: ');
    const quantidade = reader.questionInt('Quantidade: ');
    const valor = reader.questionInt('Valor: ');
    const peso = reader.questionInt('Peso: ');
    
    const product = {nome, quantidade, valor, peso};
    
    await ProductController.addProduct(product);
}

export const showInventory = async () => {

    console.log('MENU - Inventário');

    const res = await ProductController.getInvertory();
    console.table(res);
}

export const deleteProduct = async () => {
    console.log('MENU - Deletar Produto');

    const name = reader.question('Nome: ');

    const found = await ProductController.find(name);
    
    if(!found) {
        console.log('Produto não encontrado!')
        return;
    }

    console.log(`Produto encontrado-> Nome: ${found.nome}, Quantidade: ${found.quantidade}, Valor: ${found.valor}, Peso: ${found.peso}`);
    const res = reader.question('Tem certeza que deseja deletar o produto? (s/n) ');
    if(res !== 's') return;

    await ProductController.deleteProduct(name);
}

export const totalValue = async () => {
    console.log('MENU - Valor Total do Inventário');

    const res = await ProductController.total_value();
    console.log(`Valor total: R$ ${(res !== undefined)?res/100.0:'0,00'}`);
}

export const totalWeight = async () => {
    console.log('MENU - Peso Total do Inventário');

    const res = await ProductController.total_weight();
    console.log(`Peso total: ${(res !== undefined)?res/1000.0:'0,00'}Kg`);
}

export const avgValue = async () => {
    console.log('MENU - Valor Médio do Inventário');

    const res = await ProductController.avg_value();
    console.log(`Valor médio: R$ ${(res !== undefined)?res/100.0:'0,00'}`);
}

export const avgWeight = async () => {  
    console.log('MENU - Peso Médio do Inventário');

    const res = await ProductController.avg_weight();
    console.log(`Peso médio: ${(res !== undefined)?res/1000.0:'0,00'}Kg`);
}

export const totalItems = async () => {
    console.log('MENU - Quantidade de Itens');

    const res = await ProductController.count_items();
    console.log(`Quantidade de itens: ${res}`);
}

export const totalProducts = async () => {
    console.log('MENU - Quantidade de Produtos (Tipos)');

    const res = await ProductController.count_products();
    console.log(`Quantidade de produtos: ${res}`);
}