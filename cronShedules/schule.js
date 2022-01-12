
const cron    =   require('node-cron');
const { market_prices_preciousMetal } = require('../crons/croneJobs');
const priceTicket   =   require('../cronjobs/cron')

    //binance current market prices crone now this is stop
    cron.schedule('*/2 * * * * *', () => {
        
        priceTicket.price();
    });