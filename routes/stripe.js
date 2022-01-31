const router = require("express").Router();

const uniqid = require("uniqid");
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);
// router.post('/payment' , (req,res)=>{
// //    stripe.charges.create({
// //        source : req.body.tokenId,
// //        amount : req.body.amount,
// //        currency : 'INR'
// //    }, (stripeErr , stripeRes)=>{
// //        if(stripeErr){
// //            res.status(503).send(stripeErr)
// //        }else{
// //            res.status(200).send(stripeRes)
// //        }
// //    })
//  const {product , token} = req.body;
//  const idempotencyKey = uniqid();

//  return stripe.customers.create({
//      email : token.email,
//      source : token.id
//  }).then(customer=>{
//      stripe.checkout.sessions.create({
//          payment_method_types : ["card", "googlepay"],
//          mode : "payment",
//          succes_url : "http://localhost:3000/success",
//          cancel_url : "http://localhost:3000/pay",
//         amount : product.price *100,
//         currency : 'usd',
//         customer : customer.id,
//         receipt_email: token.email,
//         description : product.name,
//         shipping : {
//             name : token.card.name,
//             address : {
//                 country : token.card.address_country
//             }
//         }
//      }, {idempotencyKey})
//  })
//   .then(result=>res.status(200).json(result))
//   .catch(err => console.log(err))

// })

router.post("/payment", async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "LAMA shop",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

module.exports = router;