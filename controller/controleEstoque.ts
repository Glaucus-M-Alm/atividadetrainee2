import { ProductService } from '../services/ServicoProduto'
import { ProductInterface } from '../types/InterfaceProduto'

export class ProductController{

    static async addProduct(el : ProductInterface) {
        try{
            await ProductService.saveProduct(el);
            console.log('Produto adicionado com sucesso!');
        }catch(err : unknown){
            if(typeof err === 'string') console.error('ERRO (controller): ', err);
            else if(err instanceof Error) console.error('ERRO (controller): ', err.message);
            else console.error('ERRO (controller): ERRO DESCONHECIDO');
        }
    }

    static async getInvertory() : Promise<ProductInterface[]> {
        let res : ProductInterface[] = [];    
        try{
            res = await ProductService.getProducts();
        }catch(err){
            console.error('Erro: ', err)
        }
        return res;
    }

    static async deleteProduct(name : string){
        try{
            await ProductService.deleteProduct(name);
            console.log('Produto deletado com sucesso!');
        }catch(err){
            console.error('Erro: ', err);
        }
    }

    static async find(name : string) : Promise<ProductInterface | undefined>{
        try{
            return await ProductService.find(name);
        }catch(err){
            console.error('Erro: ', err);
        }
    }

    static async total_value(){
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            res.forEach((el) => {
                if(el.valor !== undefined && el.quantidade !== undefined) 
                total += el.valor * el.quantidade;
            });


            return total;
        }catch(err){
            console.error('Erro: ', err);
        }
    }

    static async total_weight(){
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            res.forEach((el) => {
                if(el.peso !== undefined && el.quantidade !== undefined) 
                total += el.peso * el.quantidade;
            }); 
            return total;
        }catch(err){
            console.error('Erro: ', err);
        }
    }

    static async avg_value(){
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            let quantity: number = 0;
            res.forEach((el) => {
                if(el.valor !== undefined && el.quantidade !== undefined) {
                    total += el.valor * el.quantidade;
                    quantity += el.quantidade;
                }
            }); 
            return quantity == 0 ? 0 :(total/quantity);
        }catch(err){
            console.error('Erro: ', err);
        }
    }

    static async avg_weight(){
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            let quantity: number = 0;
            res.forEach((el) => {
                if(el.peso!== undefined && el.quantidade !== undefined) {
                    total += el.peso * el.quantidade;
                    quantity += el.quantidade;
                }
            }); 
            return quantity == 0 ? 0 :(total/quantity);
        }
        catch(err){
            console.error('Erro: ', err);
        }
    }

    static async count_items(){
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            res.forEach((el) => {
                if(el.quantidade !== undefined) total += Number(el.quantidade);
            }); 
            return total;
        }
        catch(err){
            console.error('Erro: ', err);
        }
    }

    static async count_products(){  
        try{
            const res = await ProductService.getProducts();
            let total: number = 0;
            res.forEach((el) => {
                if(el.quantidade !== undefined) total++;
            }); 
            return total;
        }
        catch(err){
            console.error('Erro: ', err);
        }
    }

};