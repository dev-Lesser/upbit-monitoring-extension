<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 v-for="price,coin in upbit"  :key="coin">
        
          <coin-box :coin="coin" :name="name" :price="price" />
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { w3cwebsocket as W3CWebSocket } from "websocket";
import encoding from "text-encoding";
import CoinBox from "@/components/CoinBox"
import coinList from "@/assets/coins.json"
  export default {
    name: 'HelloWorld',
    components:{
      CoinBox
    },
    data: () => ({
      coins: coinList,
      coinNames : [],
      coinCodes:[],
      upbitList: []
    }),
    async created(){
      this.coins.map(data => {
        this.coinCodes.push(data.coin)
        this.upbitList.push({
          coinCode: data.coin,
          coinName: data.name,
          price: 0
          })
      })
      this.coinCodes.map(data => {
        this.upbit[data] = 0
      })
    },
    async mounted(){
      this.connection = new W3CWebSocket("wss://api.upbit.com/websocket/v1")
      this.connection.binaryType = "arraybuffer";
      let self = this;
      this.connection.onmessage = function(event) {        
        const enc = new encoding.TextDecoder("utf-8");
        const arr = new Uint8Array(event.data);
        const data = JSON.parse(enc.decode(arr));
        console.log(data)
        self.upbit[data.cd] = data.tp
      }
      
      this.connection.onopen = function() {
        var subscribe_fmt = JSON.stringify([ 
            {'ticket' :'upbit-chrome-extension'},
            {
                "type": "ticker", // ticker -> 현재가, trade -> 체결, orderbook => 호가
                "codes":self.coinCodes, // 수신 시세 종목 정보 (대문자)
                "isOnlyRealtime": true // 실시간 시세만
            },
            {"format":"SIMPLE"} //# simple -> 간소화,
        ])
      
        self.connection.send(subscribe_fmt)
      }
     

      },
  
  methods:{
    send(){
      
    }
  }
  }
</script>
