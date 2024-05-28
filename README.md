# Cryptocurrency Notification System

## Setup

1. Clone the repository
2. Install dependencies
    ```bash
    npm install
    ```
3. Create a `.env` file with the following content:
    ```env
  DB_URI= 'mongodb://127.0.0.1:27017/crypto-notifier'
  API_KEY=coinranking053f8eb5b815ed164e6b337b8b404c5541613e06901a21a8
  NODE_ENV = development
    ```
4. Start the application
    ```bash
    npm start
    ```

## Endpoints

### Add to Watchlist

- **URL**: `/api/watchlist`
- **Method**: `POST`
- **Request Payload**:
    ```json
    {
        "code": "BTC",
        "min_price": 35000,
        "max_price": 60000
    }
    ```

## Cron Job

The scraper runs every 5 minutes to fetch the latest cryptocurrency prices and check against the watchlist.

## Notification

Notifcations are saved in `error.log` and `combined.log`.
