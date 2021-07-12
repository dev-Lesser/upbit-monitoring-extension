<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 >
        <v-card>
          
          <coin-box v-for="price,coin in upbit" :coin="coin" :price="price" :key="coin"/>
        </v-card>
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
      coinCode:[],
      upbit: {}
    }),
    async created(){
      this.coins.map(data => {
        this.coinNames.push(data.coin)
      })
      this.coinNames.map(data => {
        this.upbit[data] = undefined
      })
      console.log(this.upbit)
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
            {'ticket' :'test'},
            {
                "type": "ticker", // ticker -> 현재가, trade -> 체결, orderbook => 호가
                "codes":self.coinNames, // 수신 시세 종목 정보 (대문자)
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
