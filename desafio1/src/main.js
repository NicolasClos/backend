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
            } else {
                this.products.push(newProduct);
            }
        }

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

/*manager.addProduct('iPhone 14 PRO MAX', '256GB', 1299, 'apple.com/iphone14promax.png', 410, 23);*/

manager.getProducts();



