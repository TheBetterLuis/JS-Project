
class Product {
    constructor(sku, name, desc, price, discountedPrice, stock, imgUrl) {
        this.sku = sku;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.stock = stock;
        this.imgUrl = imgUrl;
    }
};




const productos = [
    {
        sku: "12EF",
        name: "Camiseta roja",
        desc: "Camiseta de algodón 100% roja, perfecta para un look casual.",
        price: 25.99,
        discountedPrice: 12.99,
        stock: 24,
        imgUrl: "https://i5.walmartimages.com/seo/Gildan-B02060704-Softstyle-Women-Midweight-T-Shirt-Red-Medium_bea847bb-2b19-4e49-8f11-903a1b9267aa.f430e098b3072789b08fe3b61f09b654.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    },
    {
        sku: "XZY3",
        name: "Jeans azules",
        desc: "Jeans ajustados de mezclilla azul, ideales para cualquier ocasión.",
        price: 49.99,
        discountedPrice: null,
        stock: 20,
        imgUrl: "https://generation.com.mm/web/image/product.template/32342/image_256/CPJ2728%20Slim%20Fit%20Jean%20Pant%20Man%20?unique=b91eca0"
    },
    {
        sku: "TL78",
        name: "Zapatillas blancas",
        desc: "Zapatillas deportivas blancas clásicas, cómodas y versátiles.",
        price: 65.99,
        discountedPrice: 32.05,
        stock: 2,
        imgUrl: "https://m.media-amazon.com/images/I/71I2QrobMRS._AC_UY1000_.jpg"
    },
    {
        sku: "K9LP",
        name: "Mochila negra",
        desc: "Mochila negra multifuncional, perfecta para la escuela, el trabajo o viajes.",
        price: 39.99,
        discountedPrice: 15.99,
        stock: 12,
        imgUrl: "https://img.fruugo.com/product/3/65/691311653_max.jpg"
    },
    {
        sku: "QR01",
        name: "Reloj inteligente",
        desc: "Reloj inteligente con pantalla táctil, monitoreo de actividad física y notificaciones.",
        price: 199.99,
        discountedPrice: 160.00,
        stock: 2,
        imgUrl: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT5W3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR_GEO_IN?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=ZDBuKzI4V2k1SE9UL3g2MjNDZ3JseEZPYUtzeTRQVVJ5RG0wcnpadi96L1VYSXRUN1VQK3Nhb1hTK1VFYms2a0IzMDBvaSthcUJDc2lUMklaVFdPN1lxMHdmWUhUbHhWZXRCWndOTDlaS2xXQkk0RzkwMjlwcytnSllWZENtT0hkK0FiVXJOTmlPU21KWjREMEt1bUNTbmJVazJMS2NZeDNpd3p6WnVuWUthMkxNZkh4MDB4dUpVaFAyTU5LMk1GbW9kVWxVMFJ4OGc5Z1paZGRsWGlndz09"
    },
    {
        sku: "BSWK",
        name: "Libro de cocina",
        desc: "Libro de cocina con recetas deliciosas y fáciles de preparar.",
        price: 29.99,
        discountedPrice: null,
        stock: 23,
        imgUrl: "https://books.disney.com/content/uploads/2022/05/9781368074964-1.jpg"
    },
    {
        sku: "2HJN",
        name: "Audífonos inalámbricos",
        desc: "Audífonos inalámbricos con sonido de alta calidad y cancelación de ruido.",
        price: 79.99,
        discountedPrice: null,
        stock: 5,
        imgUrl: "https://helios-i.mashable.com/imagery/articles/06efyGVjSH6yuLnik0go8IR/images-1.fill.size_256x256.v1708008433.png"
    },
    {
        sku: "V5TM",
        name: "Cafetera eléctrica",
        desc: "Cafetera eléctrica para preparar café delicioso en minutos.",
        price: 45.99,
        discountedPrice: 25.50,
        stock: 12,
        imgUrl: "https://m.media-amazon.com/images/I/71LlWRsTGnL._UC256,256_CACC,256,256_.jpg"
    },
    {
        sku: "D6YA",
        name: "Smart TV",
        desc: "Smart TV con pantalla LED de alta definición y aplicaciones integradas.",
        price: 499.99,
        discountedPrice: 399.99,
        stock: 24,
        imgUrl: "https://img-prd-pim.poorvika.com/prodvarval/Samsung-4k-ultra-hd-led-smart-tv-du7700-50-inch-Front-View-Thumbnail.png"
    },
    {
        sku: "FX14",
        name: "Consola de videojuegos",
        desc: "Consola de videojuegos con los últimos juegos y gráficos de alta definición.",
        price: 349.99,
        discountedPrice: null,
        stock: 5,
        imgUrl: "https://www.gamestore.com.kw/web/image/product.template/28089/image_256"
    },
    {
        sku: "3GPO",
        name: "Aspiradora robot",
        desc: "Aspiradora robot inteligente que limpia tu hogar automáticamente.",
        price: 249.99,
        discountedPrice: null,
        stock: 4,
        imgUrl: "https://pipl.eu/uploads/product_galleries/4d/f9/w256_fjdpun0vp_e97f167a.png"
    },
    {
        sku: "WZ9C",
        name: "Cámara fotográfica",
        desc: "Cámara fotográfica digital con lente intercambiable para capturar tus mejores momentos.",
        price: 399.99,
        discountedPrice: 349.99,
        stock: 3,
        imgUrl: "https://public.blenderkit.com/thumbnails/assets/5326041dbc7b4298bb798084c743da48/files/thumbnail_c944f432-3c94-4d13-80d2-62c677553a37.jpg.256x256_q85_crop-%2C.jpg.webp?webp_generated=1672005968"
    },
    {
        sku: "NQ87",
        name: "Bicicleta de montaña",
        desc: "Bicicleta de montaña",
        price: 599.99,
        discountedPrice: 200.99,
        stock: 25,
        imgUrl: "https://roko.bike/public/images/products/10/thumbs/6426f9479a1ad_roko-bike-20s-black2.jpg"
    },
    {
        sku: "J5KL",
        name: "Película Blu-ray",
        desc: "Película Blu-ray con alta definición y contenido adicional.",
        price: 19.99,
        discountedPrice: null,
        stock: 16,
        imgUrl: "https://m.media-amazon.com/images/I/81HbgXx9qrL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        sku: "R0AB",
        name: "Auriculares con cable",
        desc: "Auriculares con cable para una experiencia de audio clásica.",
        price: 29.99,
        discountedPrice: null,
        stock: 23,
        imgUrl: "https://qph.cf2.quoracdn.net/main-qimg-616ba7ed52c995b6248422377de76072-lq"
    },
    {
        sku: "8EVT",
        name: "Smartwatch",
        desc: "Smartwatch con notificaciones, monitoreo de actividad física y seguimiento del sueño.",
        price: 149.99,
        discountedPrice: null,
        stock: 16,
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4S2BRRYe99okfMiJLQhcS9w14-nptt0KfMw&s"
    },
    {
        sku: "SX2D",
        name: "Impresora multifunción",
        desc: "Impresora multifunción para imprimir, escanear y copiar documentos.",
        price: 99.99,
        discountedPrice: null,
        stock: 1,
        imgUrl: "https://d3e54emdgoy1fq.cloudfront.net/uploads/new_category/image/17369/medium_2a95b-MX710de.jpg"
    },
    {
        sku: "ZM6Y",
        name: "Mochila portabebé",
        desc: "Mochila portabebé cómoda y segura para transportar a tu bebé.",
        price: 79.99,
        discountedPrice: null,
        stock: 2,
        imgUrl: "https://m.media-amazon.com/images/I/71m-0T4CTRL._AC_UF894,1000_QL80_.jpg"
    },
    {
        sku: "HY31",
        name: "Set de cubiertos",
        desc: "Set de cubiertos de alta calidad para 12 personas.",
        price: 39.99,
        discountedPrice: 25.99,
        stock: 14,
        imgUrl: "https://m.media-amazon.com/images/I/71owv+Dh+QL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        sku: "CPW9",
        name: "Cafetera portátil",
        desc: "Cafetera portátil para disfrutar de un café caliente en cualquier lugar.",
        price: 34.99,
        discountedPrice: 29.99,
        stock: 17,
        imgUrl: "https://i.ebayimg.com/images/g/HrUAAOSwP~phl9PV/s-l1600.jpg"
    }

];

const cart = [];

export {productos, Product, cart};
