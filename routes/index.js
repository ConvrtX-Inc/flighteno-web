var express = require('express');
var router = express.Router();

const MongoClient =   require('mongodb').MongoClient;
const objectId    =   require('mongodb').ObjectId;
var conn          =   require("../dataBaseConnection/connection");
var helper        =   require('../helpers/common_helpers');
// const  fetch      =   require('node-fetch'); 
const Stripe      =   require('stripe');
const stripe      =   Stripe('sk_test_51Jbh0xES5y6t2EWhBXW6uiNciYBvFwBa1P6j0kVMODnPdljX5FSVgdFZIVBLNuTo93dKf7G7fexdWgfI6FlIUs8n00f4ZwlI63');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/create-connected-account', async (req, res) => {
  let db = await conn
  let admin_id = req.body.admin_id.toString();
  let count = await db.collection('users').find({_id : new objectId(admin_id), conected_account_id : {'$exists' : true} }).toArray()

  // console.log(count[0])
  if(count.length > 0){
    var responseArray = {
      'status' : 'Already Link Account exists!',
      'type'   : 200,
      accountLinks : count[0]['conected_account_id']
    };
    res.status(200).send(responseArray);

    console.log('already Connected')

  }else{

    console.log('coneected account creating')
    let user = await db.collection('users').find({_id : new objectId(admin_id)}).toArray()
    if(user.length > 0){
      const account = await stripe.accounts.create({
        type: 'express',
        email:    user[0]['email_address'],
        metadata: user[0]['_id'],//req.body.metadata,
      });
    
      // console.log('working')
      var returnUrl = 'http://3.120.159.133:3000/update-connected-account-id/?admin_id=' + admin_id + '&connected_account_id='+ account.id;
    
      console.log('=================>>>>>>>>>>>>>..',returnUrl)
      const accountLinks = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'https://example.com/reauth',
        return_url: returnUrl,
        type: 'account_onboarding',
      });
      
      console.log('accountLinks.url ========>>>>>>>>..',accountLinks.url)
      var responseArray = {
        'status' : 'Link Account is Created!',
        'type'   : 200,
        conected_account_id : accountLinks.url
      };
      res.status(200).send(responseArray);
      
    }else{

      var responseArray = {
        'status' : 'Admin is wrong',
        'type'   : 401,
      };
      res.status(401).send(responseArray);
    }
  }
});

router.get('/update-connected-account-id', async (req, res) => {

  let db = await conn;
  let admin_id  = req.query.admin_id// req.body.admin_id.toString(); 
  let connected_account_id  =  req.query.connected_account_id//  req.body.connected_account_id.toString(); 

  db.collection('users').updateOne({_id : new objectId(admin_id)},  {$set : {'conected_account_id' :  connected_account_id}}, async (err,result) => {
    if(err){

      console.log('database Error')
    }else{

      console.log('update');
    res.status(201).send('You are Done, you can now go back')
    }
  })

});

router.get('/create-payment', async (req, res) => {

  let user_id  = req.query.admin_id.toString();
  let offerId  = req.query.offerId.toString(); 

console.log('user_id ========>>>>>>>>>', user_id)
console.log('offerId ========>>>>>>>>>', offerId)

  let db    = await conn;
  let count = await db.collection('users').find({_id : new objectId(user_id), customer_id : {'$exists' : true} }).toArray();

  let customer_id = '';
  if(count.length > 0){

    customer_id =  count[0]['customer_id']

  }else{

    let user = await db.collection('users').find({_id : new objectId(user_id)}).toArray();

    console.log('user==========>>>', user[0]['email_address'])

    const customer = await stripe.customers.create({
      email:    user[0]['email_address'],
      name:     user[0]['full_name'],
      phone:    user[0]['phone_number'],
      metadata: {
       'flighteno_admin_id' : user[0]['_id'].toString(),
      }
    });
    customer_id = customer.id;
    await db.collection('users').updateOne({_id : new objectId(user_id)}, {$set: {customer_id :  customer.id} })
    console.log('customer.id ===========>>>>>>>>>>>>>>',customer.id)

  }

  let offer = await db.collection('accepted_offers').find({_id : new objectId(offerId), status : 'new' }).toArray();
  if(offer.length > 0){

    const amount = offer[0]['total'] * 100; 
    var customer = await stripe.customers.retrieve(customer_id);
    if(customer != null){

      const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
      );
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        customer: customer.id,

        description: offerId,
        metadata: {
          'fligteno_admin_id' :  user_id,
        }
      });

      var responseArray = {
        'status' : 'Create Payment is done!',
        'type'   : 200,
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id
      };
      res.status(200).send(responseArray);
    }
  }else{

    var responseArray = {
      'status' : 'Payment is Alredy done or Offer Id is wrong!',
      'type'   : 200
    };
    res.status(200).send(responseArray);
  }
});

