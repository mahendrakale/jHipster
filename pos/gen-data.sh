!#/bin/bash

# Authenticate
token=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUzMTI4Nzg1MH0.Btzr8NWKYnngfW6qbWFZcBdjai-0rkjp_IhY4ZSNB_4OuE2-k1nEGDmabHe_bmc3CDhstLd90fygUbUcbzplBg' -d '{     "password": "admin",     "rememberMe": true,     "username": "admin"   }' 'http://localhost:8080/api/authenticate')

authToken=$(echo $token | jq -r '.id_token' )
#echo $authToken

# Create Tax entities
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{ "category": "FOOD",     "percent": 0,     "taxName": "ZERO_TAX"   }' 'http://localhost:8080/api/taxes'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{ "category": "BEVRAGES",     "percent": 10,     "taxName": "TEN_PERCENT_TAX"   }' 'http://localhost:8080/api/taxes'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{  "category": "CLOTHS",     "percent": 20,     "taxName": "TWENTY_PERCENT_TAX"   }' 'http://localhost:8080/api/taxes'


# Create Products
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "barcode": "",     "category": "FOOD",     "description": "",     "expDate": "2018-07-11",     "mfDate": "2018-04-11",     "price": 42,     "productName": "Milk",     "taxId": 1   }' 'http://localhost:8080/api/products'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "barcode": "",     "category": "BEVRAGES",     "description": "",     "expDate": "2018-07-11",     "mfDate": "2018-04-11",     "price": 55,     "productName": "Sprite",     "taxId": 2   }' 'http://localhost:8080/api/products'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "barcode": "",     "category": "CLOTHS",     "description": "",     "expDate": "2018-07-11",     "mfDate": "2018-04-11",     "price": 1999,     "productName": "Shirt (Formal)",     "taxId": 3   }' 'http://localhost:8080/api/products'

# Create payment
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "card": "",     "date": "2018-06-11",     "paymentMode": "CASH"   }' 'http://localhost:8080/api/payments'

# Create Bill
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "billDate": "2018-06-11",     "billNo": "AAA1",     "discount": 0,     "paymentId": 1,     "total": "",     "totalTax": ""   }' 'http://localhost:8080/api/bills'

# Create Bill items
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "billId": 1,     "productId": 1,     "quantity": 4,     "tax": 1   }' 'http://localhost:8080/api/bill-items'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "billId": 1,     "productId": 2,     "quantity": 3,     "tax": 2   }' 'http://localhost:8080/api/bill-items'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer '$authToken -d '{     "billId": 1,     "productId": 3,     "quantity": 2,     "tax": 3   }' 'http://localhost:8080/api/bill-items'


