const marketDataUrl = 'https://5tvhojvc665dsy7cb6marzsdny0wtaaw.lambda-url.eu-central-1.on.aws/';
const pdfUrl = 'https://cdmujpyl5y5d3qirfa6ssap4n40fmhjw.lambda-url.eu-central-1.on.aws/';
const emailUrl = 'https://3sa4tfqdw3uzj3xnbnokjbib7y0vfrii.lambda-url.eu-central-1.on.aws/';

export interface CoinData  {
    current_price: number
    price_change_percentage_24h: number
    symbol: string
}

export interface CallPdfServiceParams {
    identifier: string
    created_at: string
    due_date: string
    from_name: string
    from_address: string
    from_wallet_address: string
    bc_name: string
    payment_amount: number
    coin_symbol: string
    receivers: {
        address: string
        amount: number
    }[]
}

export interface CallMailServiceParams {
    link: string
}

export async function callPdfService(callData: CallPdfServiceParams): Promise<string> {
  const data = await (await fetch(pdfUrl, {
    method: 'POST',
    body: JSON.stringify({
      "jsonrpc": "2.0", 
      "method": "pdfGeneratorService.getPdf", 
      "params": [
        {
          "identifier": callData.identifier,
          "created_at": callData.created_at,
          "due_date": callData.due_date,
          "from_name": callData.from_name,
          "from_address":   callData.from_address,
          "from_wallet_address": callData.from_wallet_address,
          "bc_name":   callData.bc_name,
          "payment_amount": callData.payment_amount,
          "coin_symbol":   callData.coin_symbol,
          "receivers": callData.receivers
        }
      ], 
      "id": "3"
    })
  })).json();

  return data.result;
}

export async function callMailService(callData: CallMailServiceParams) {
  await (await fetch(emailUrl, {
    method: 'POST',
    body: JSON.stringify({
      "jsonrpc": "2.0", 
      "method": "MailService.sendEmail",
      "params": [
        "dreneamarius@gmail.com",
        `Payment link is available at ${callData.link}. Pay now fast and securely using the BC power!`
      ], 
      "id": "3"
    })  
  })).json();

}

export async function callMarketDataService(): Promise<CoinData[]> {
  const data =  await (await fetch(marketDataUrl, {
    method: 'POST',
    body: JSON.stringify({
      "jsonrpc": "2.0", 
      "method": "MarketDataService.getCoins", 
      "params": [], 
      "id": "3"
    })
  })).json();

  return data.result.coins;    
}