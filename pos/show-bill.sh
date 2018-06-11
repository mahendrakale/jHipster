!#/bin/bash

# Authenticate
token=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUzMTI4Nzg1MH0.Btzr8NWKYnngfW6qbWFZcBdjai-0rkjp_IhY4ZSNB_4OuE2-k1nEGDmabHe_bmc3CDhstLd90fygUbUcbzplBg' -d '{     "password": "admin",     "rememberMe": true,     "username": "admin"   }' 'http://localhost:8080/api/authenticate')

authToken=$(echo $token | jq -r '.id_token' )
echo $authToken

# Show the generated Bill
echo "";
echo "Generated the bill ... ";
output=$(curl -s -X GET --header 'Accept: application/problem+json' --header 'Authorization: Bearer '$authToken 'http://localhost:8080/api/billgen/1')
echo $output
