/**
 * Constants used in various places for data acquisition and manipulation.
 *
 * @author Aleksandar Varga (aleksandar.varga@uns.ac.rs)
 */


const API_KEY = 'P7S43A98HP26MCVF';

const COMPANIES = [
    {
        name: 'Advanced Micro Devices, Inc.',
        symbol: 'AMD',
    },
    {
        name: 'Intel Corporation',
        symbol: 'INTC',
    },
    {
        name: 'Apple Inc.',
        symbol: 'AAPL',
    },
    {
        name: 'Microsoft Corporation',
        symbol: 'MSFT',
    },
    {
        name: 'Alphabet Inc.',
        symbol: 'GOOG',
    },
];

const DIGITAL_CURRENCIES = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
    },
    {
        name: 'Ripple',
        symbol: 'XRP',
    },
    {
        name: 'Bitcoin Cash',
        symbol: 'BCH',
    },
    {
        name: 'Litecoin',
        symbol: 'LTC',
    },
];

const PHYSICAL_CURRENCIES = [
    {
        name: 'United States Dollar',
        symbol: 'USD',
    },
    {
        name: 'Euro',
        symbol: 'EUR',
    },
    {
        name: 'Serbian Dinar',
        symbol: 'RSD',
    },
    {
        name: 'Australian Dollar',
        symbol: 'AUD',
    },
    {
        name: 'Japanese yen',
        symbol: 'JPY',
    },
    {
        name: 'British Pound Sterling',
        symbol: 'GBP',
    },
    {
        name: 'Swiss Franc',
        symbol: 'CHF',
    },
];

const DATA_VIEWS = [
    {
        name: 'Line chart',
        view: 'line-chart',
    },
    {
        name: 'Column chart',
         view: 'column-chart',
    },
    {
        name: 'Bar chart',
        view: 'bar-chart',
    },
    {
        name: 'Scatter chart',
        view: 'scatter-chart',
    },
    {
        name: 'Table',
        view: 'table-view',
    },
    {
        name: 'Trend',
        view: 'big-number-view'
    }
];

const FUNCTIONS = {
    TIME_SERIES_INTRADAY: 'TIME_SERIES_INTRADAY',
    TIME_SERIES_DAILY: 'TIME_SERIES_DAILY',
    TIME_SERIES_WEEKLY: 'TIME_SERIES_WEEKLY',
    TIME_SERIES_MONTHLY: 'TIME_SERIES_MONTHLY',
    CURRENCY_EXCHANGE_RATE: 'CURRENCY_EXCHANGE_RATE',
    DIGITAL_CURRENCY_INTRADAY: 'DIGITAL_CURRENCY_INTRADAY',
    DIGITAL_CURRENCY_DAILY: 'DIGITAL_CURRENCY_DAILY',
    DIGITAL_CURRENCY_WEEKLY: 'DIGITAL_CURRENCY_WEEKLY',
    DIGITAL_CURRENCY_MONTHLY: 'DIGITAL_CURRENCY_MONTHLY',
};

const UPDATE_FREQUENCIES = {
    REALTIME: 'Real-time (approx. 1 min)',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
};

const FREQUENCY_TO_STOCK_FUNCTION = {};

FREQUENCY_TO_STOCK_FUNCTION[UPDATE_FREQUENCIES.REALTIME] = FUNCTIONS.TIME_SERIES_INTRADAY;
FREQUENCY_TO_STOCK_FUNCTION[UPDATE_FREQUENCIES.DAILY] = FUNCTIONS.TIME_SERIES_DAILY;
FREQUENCY_TO_STOCK_FUNCTION[UPDATE_FREQUENCIES.WEEKLY] = FUNCTIONS.TIME_SERIES_WEEKLY;
FREQUENCY_TO_STOCK_FUNCTION[UPDATE_FREQUENCIES.MONTHLY] = FUNCTIONS.TIME_SERIES_MONTHLY;

const FREQUENCY_TO_DC_FUNCTION = {};

FREQUENCY_TO_DC_FUNCTION[UPDATE_FREQUENCIES.REALTIME] = FUNCTIONS.DIGITAL_CURRENCY_INTRADAY;
FREQUENCY_TO_DC_FUNCTION[UPDATE_FREQUENCIES.DAILY] = FUNCTIONS.DIGITAL_CURRENCY_DAILY;
FREQUENCY_TO_DC_FUNCTION[UPDATE_FREQUENCIES.WEEKLY] = FUNCTIONS.DIGITAL_CURRENCY_WEEKLY;
FREQUENCY_TO_DC_FUNCTION[UPDATE_FREQUENCIES.MONTHLY] = FUNCTIONS.DIGITAL_CURRENCY_MONTHLY;


const PARAMETERS = {
    FUNCTION: 'function',
    SYMBOL: 'symbol',
    INTERVAL: 'interval',
    OUTPUTSIZE: 'outputsize',
    MARKET: 'market',
    FROM_CURRENCY: 'from_currency',
    TO_CURRENCY: 'to_currency',
};

const REQUIRED_PARAMS = {};

REQUIRED_PARAMS[FUNCTIONS.TIME_SERIES_INTRADAY] = [PARAMETERS.SYMBOL, PARAMETERS.INTERVAL];
REQUIRED_PARAMS[FUNCTIONS.TIME_SERIES_DAILY] = [PARAMETERS.SYMBOL];
REQUIRED_PARAMS[FUNCTIONS.TIME_SERIES_WEEKLY] = [PARAMETERS.SYMBOL];
REQUIRED_PARAMS[FUNCTIONS.TIME_SERIES_MONTHLY] = [PARAMETERS.SYMBOL];
REQUIRED_PARAMS[FUNCTIONS.CURRENCY_EXCHANGE_RATE] = [PARAMETERS.FROM_CURRENCY, PARAMETERS.TO_CURRENCY];
REQUIRED_PARAMS[FUNCTIONS.DIGITAL_CURRENCY_INTRADAY] = [PARAMETERS.SYMBOL, PARAMETERS.MARKET];
REQUIRED_PARAMS[FUNCTIONS.DIGITAL_CURRENCY_DAILY] = [PARAMETERS.SYMBOL, PARAMETERS.MARKET];
REQUIRED_PARAMS[FUNCTIONS.DIGITAL_CURRENCY_WEEKLY] = [PARAMETERS.SYMBOL, PARAMETERS.MARKET];
REQUIRED_PARAMS[FUNCTIONS.DIGITAL_CURRENCY_MONTHLY] = [PARAMETERS.SYMBOL, PARAMETERS.MARKET];

const PROPERTY_FROM_FUNCTION = {};

PROPERTY_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_INTRADAY] = 'Time Series (1min)';
PROPERTY_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_DAILY] = 'Time Series (Daily)';
PROPERTY_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_WEEKLY] = 'Weekly Time Series';
PROPERTY_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_MONTHLY] = 'Monthly Time Series';
PROPERTY_FROM_FUNCTION[FUNCTIONS.CURRENCY_EXCHANGE_RATE] = 'Realtime Currency Exchange Rate';
PROPERTY_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_INTRADAY] = 'Time Series (Digital Currency Intraday)';
PROPERTY_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_DAILY] = 'Time Series (Digital Currency Daily)';
PROPERTY_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_WEEKLY] = 'Time Series (Digital Currency Weekly)';
PROPERTY_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_MONTHLY] = 'Time Series (Digital Currency Monthly)';

const INTERVAL_FROM_FUNCTION = {};


INTERVAL_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_INTRADAY] = 60000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_DAILY] = 86400000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_WEEKLY] = 86400000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_MONTHLY] = 86400000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.CURRENCY_EXCHANGE_RATE] = 60000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_INTRADAY] = 300000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_DAILY] = 86400000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_WEEKLY] = 86400000;
INTERVAL_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_MONTHLY] = 86400000;

const ID_FROM_FUNCTION = {};

ID_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_INTRADAY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_DAILY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_WEEKLY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.TIME_SERIES_MONTHLY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.CURRENCY_EXCHANGE_RATE] = [PARAMETERS.FUNCTION, PARAMETERS.FROM_CURRENCY];
ID_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_INTRADAY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_DAILY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_WEEKLY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];
ID_FROM_FUNCTION[FUNCTIONS.DIGITAL_CURRENCY_MONTHLY] = [PARAMETERS.FUNCTION, PARAMETERS.SYMBOL];

const STOCK_POINTS = {
    OPEN: 'open',
    CLOSE: 'close',
    HIGH: 'high',
    LOW: 'low',
    VOLUME: 'volume'
};

const EXCHANGE_RATE_PROPERTIES = {
    FROM_CURRENCY: 'from_currency',
    TO_CURRENCY: 'to_currency',
    RATE: 'rate'
};

const CRYPTO_POINTS = {
    OPEN: 'open',
    CLOSE: 'close',
    HIGH: 'high',
    LOW: 'low',
    VOLUME: 'volume',
    MARKET_CAP: 'market_cap',
    PRICE: 'price',
};

const MAP_PROPERTIES = {};

const PROPERTIES_TIME_SERIES = {};

PROPERTIES_TIME_SERIES[STOCK_POINTS.OPEN] = '1. open';
PROPERTIES_TIME_SERIES[STOCK_POINTS.HIGH] = '2. high';
PROPERTIES_TIME_SERIES[STOCK_POINTS.LOW] = '3. low';
PROPERTIES_TIME_SERIES[STOCK_POINTS.CLOSE] = '4. close';
PROPERTIES_TIME_SERIES[STOCK_POINTS.VOLUME] = '5. volume';

MAP_PROPERTIES[FUNCTIONS.TIME_SERIES_INTRADAY] = PROPERTIES_TIME_SERIES;
MAP_PROPERTIES[FUNCTIONS.TIME_SERIES_DAILY] = PROPERTIES_TIME_SERIES;
MAP_PROPERTIES[FUNCTIONS.TIME_SERIES_WEEKLY] = PROPERTIES_TIME_SERIES;
MAP_PROPERTIES[FUNCTIONS.TIME_SERIES_MONTHLY] = PROPERTIES_TIME_SERIES;

const PROPERTIES_CURRENCY_EXCHANGE_RATE = {};

PROPERTIES_CURRENCY_EXCHANGE_RATE[EXCHANGE_RATE_PROPERTIES.FROM_CURRENCY] = '1. From_Currency Code';
PROPERTIES_CURRENCY_EXCHANGE_RATE[EXCHANGE_RATE_PROPERTIES.TO_CURRENCY] = '3. To_Currency Code';
PROPERTIES_CURRENCY_EXCHANGE_RATE[EXCHANGE_RATE_PROPERTIES.RATE] = '5. Exchange Rate';

MAP_PROPERTIES[FUNCTIONS.CURRENCY_EXCHANGE_RATE] = PROPERTIES_CURRENCY_EXCHANGE_RATE;

const PROPERTIES_DIGITAL_CURRENCY_INTRADAY = {};

PROPERTIES_DIGITAL_CURRENCY_INTRADAY[CRYPTO_POINTS.PRICE] = '1a. price (*)';
PROPERTIES_DIGITAL_CURRENCY_INTRADAY[CRYPTO_POINTS.VOLUME] = '2. volume';
PROPERTIES_DIGITAL_CURRENCY_INTRADAY[CRYPTO_POINTS.MARKET_CAP] = '3. market cap (USD)';

MAP_PROPERTIES[FUNCTIONS.DIGITAL_CURRENCY_INTRADAY] = PROPERTIES_DIGITAL_CURRENCY_INTRADAY;

const PROPERTIES_DIGITAL_CURRENCY = {};

PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS.OPEN] = '1a. open (*)';
PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS.HIGH] = '2a. high (*)';
PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS.LOW] = '3a. low (*)';
PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS.CLOSE] = '4a. close (*)';
PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS.VOLUME] = '5. volume';
PROPERTIES_DIGITAL_CURRENCY[CRYPTO_POINTS] = '6. market cap (USD)';

MAP_PROPERTIES[FUNCTIONS.DIGITAL_CURRENCY_DAILY] = PROPERTIES_DIGITAL_CURRENCY;
MAP_PROPERTIES[FUNCTIONS.DIGITAL_CURRENCY_WEEKLY] = PROPERTIES_DIGITAL_CURRENCY;
MAP_PROPERTIES[FUNCTIONS.DIGITAL_CURRENCY_MONTHLY] = PROPERTIES_DIGITAL_CURRENCY;


export {
    API_KEY,
    COMPANIES,
    DIGITAL_CURRENCIES,
    PHYSICAL_CURRENCIES,
    DATA_VIEWS,
    FUNCTIONS,
    UPDATE_FREQUENCIES,
    FREQUENCY_TO_STOCK_FUNCTION,
    FREQUENCY_TO_DC_FUNCTION,
    PARAMETERS,
    REQUIRED_PARAMS,
    PROPERTY_FROM_FUNCTION,
    INTERVAL_FROM_FUNCTION,
    ID_FROM_FUNCTION,
    STOCK_POINTS,
    CRYPTO_POINTS,
    MAP_PROPERTIES
};
