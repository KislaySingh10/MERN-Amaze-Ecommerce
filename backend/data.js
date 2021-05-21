import bcrypt from "bcryptjs";

const data={
    users:[
        {
            name:'Kislay',
            email:'abcsd@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:true
        },
        {
            name:'Kingslayer',
            email:'lannister@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:false
        }
    ],
    products:[
        {
            name:"Nike Full Sleeve",
            category:"Shirts",
            price:120,
            rating:4.5,
            brand:"Nike",
            image:"/images/product1.jpg",
            numReviews:15,
            description:"Premium quality shirt",
            count:10
        },{
            name:"Adidas Full Sleeve",
            category:"Shirts",
            price:100,
            rating:4.0,
            brand:"Adidas",
            image:"/images/product2.jpg",
            numReviews:10,
            description:"Premium quality shirt",
            count:15
        },{
            name:"Puma Tshirt",
            category:"T-Shirts",
            price:110,
            rating:4.5,
            brand:"Puma",
            image:"/images/product3.jpg",
            numReviews:11,
            description:"Premium quality t-shirt",
            count:1
        },{
            name:"Reebok Polo T-shirt",
            category:"T-Shirts",
            price:90,
            rating:3.5,
            brand:"Reebok",
            image:"/images/product4.jpg",
            numReviews:8,
            description:"Premium quality polo t-shirt",
            count:7
        },{
            name:"Allen Solly Pants",
            category:"Pants",
            price:130,
            rating:4.5,
            brand:"Allen Solly",
            image:"/images/product5.jpg",
            numReviews:15,
            description:"Premium quality pants",
            count:25
        },{
            name:"Van Heusen Jeans",
            category:"Jeans",
            price:150,
            rating:5.0,
            brand:"Van Heusen",
            image:"/images/product6.jpg",
            numReviews:5,
            description:"Premium quality jeans",
            count:12
        }
    ]
}

export default data