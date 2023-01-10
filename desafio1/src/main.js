class ProductManager {
    constructor(products){
        this.products = []
    };

    addProduct(title, description, price, thumbnail, code, stock){
        let newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock                    
        }

        const codeValidator = ()=>{
            const findCode = this.products.find(product => product.code == code);
            if(findCode != undefined || findCode != null){
                console.log('El código debe ser único por cada producto')
            } else if ((title == null || undefined) || (description == null || undefined) || (price == null || undefined) || (thumbnail == null || undefined) || (code == null || undefined) || (stock == null || undefined)){
                console.log('Todos los campos son obligatorios')
            } else {
                this.products.push(newProduct);
            }
        }
        codeValidator()
    }

    getProductById(id){        
            let product = this.products.find(product => product.id === id);
            if(product != undefined){
                console.log(product);
            } else{
                console.log('Not found')
            }        
    };

    getProducts(){
        console.log(this.products)
    }
}

/* Ejecución del código */

const manager = new ProductManager();

manager.addProduct('iPhone 13', '256GB', 999, 'apple.com/iphone13.png', 12, 213)

manager.addProduct('iPhone 14 PRO MAX', '256GB', 1299, 'apple.com/iphone14promax.png', 23);

manager.getProducts();
