To install avalanche network runner
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-network-runner/main/scripts/install.sh | sh -s -- -b <relative directory>

Normally install in the $GOPATH/bin folder



Install the avalanchego.

1) Clone the repository from git clone git@github.com:ava-labs/avalanchego.git 

2) The repository should be cloned inside the $GOPPATH/src/ folder

3) build the go binary using
./scripts/build.sh

4) The avalanche go executable will be presen in
./build/




To start avalanche network runner  

./avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"



To start avalanche network with three nodes(max of 5 nodes supported the staking tls cert and key are pre provided)

/**** network-id = mainnet/fuji to connect to the main net or testnet ***/

/***********Node1***************/

./build/avalanchego \
--public-ip=127.0.0.1 \
--http-port=9611 \
--staking-port=9612 \
--db-dir=db/node1 \
--network-id=local \
--staking-tls-cert-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker1.crt \
--staking-tls-key-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker1.key \
--health-check-frequency 2s \
--log-display-level INFO \
--log-level INFO \
--whitelisted-subnets=29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL


/***********Node2***************/

./build/avalanchego \
--public-ip=127.0.0.1 \
--http-port=9621 \
--staking-port=9622 \
--db-dir=db/node2 \
--network-id=local \
--bootstrap-ips=127.0.0.1:9612 \
--bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg \
--staking-tls-cert-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker2.crt \
--staking-tls-key-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker2.key \
--health-check-frequency 2s \
--log-display-level INFO \
--log-level INFO \
--whitelisted-subnets=29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL

/***********Node3***************/

./build/avalanchego \
--public-ip=127.0.0.1 \
--http-port=9631 \
--staking-port=9632 \
--db-dir=db/node3 \
--network-id=local \
--bootstrap-ips=127.0.0.1:9612 \
--bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg \
--staking-tls-cert-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker3.crt \
--staking-tls-key-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker3.key \
--health-check-frequency 2s \
--log-display-level INFO \
--log-level INFO \
--whitelisted-subnets=29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL


/***********Node4***************/

./build/avalanchego \
--public-ip=127.0.0.1 \
--http-port=9641 \
--staking-port=9642 \
--db-dir=db/node4 \
--network-id=local \
--bootstrap-ips=127.0.0.1:9612 \
--bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg \
--staking-tls-cert-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker4.crt \
--staking-tls-key-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker4.key \
--health-check-frequency 2s \
--log-display-level INFO \
--log-level INFO
 
/***********Node5***************/

./build/avalanchego \
--public-ip=127.0.0.1 \
--http-port=9651 \
--staking-port=9652 \
--db-dir=db/node5 \
--network-id=local \
--bootstrap-ips=127.0.0.1:9612 \
--bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg \
--staking-tls-cert-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker5.crt \
--staking-tls-key-file=/Users/prabhakaran/workspace/go/src/avalanchego/staking/local/staker5.key \
--health-check-frequency 2s \
--log-display-level INFO \
--log-level INFO
 


Use the following api to create a user
http://127.0.0.1:9611/ext/keystore

Import the private key X Chain
PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN 
using http://127.0.0.1:9611/ext/bc/X

Returns the public key "address": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"


Import the private key into C chain
using 127.0.0.1:9611/ext/bc/C/avax

Returns the public key "address" : "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"

Add the local C chain network to metamask 
Network Name: Avalanche Local C-Chain
New RPC URL: http://127.0.0.1:9650/ext/bc/C/rpc
ChainID: 43112
Symbol: AVAX

Import the account "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC" using the private key
"0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"


Import the private key P Chain
PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN 
using http://127.0.0.1:9611/ext/bc/X

Returns the public key "address": "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"

