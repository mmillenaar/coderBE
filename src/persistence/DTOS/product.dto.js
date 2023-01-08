class ProductDto {
    constructor({ _id, title, price, thumbnail }) {
        this.id = _id,
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
}

export const asProductsDto = (products) => {
    if (Array.isArray(products)) {
        return products.map(product => new ProductDto(product))
    }
    else {
        return new ProductDto(products)
    }
}