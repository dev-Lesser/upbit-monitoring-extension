<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 sm6 md3 v-for="i, key in coinCodes" :key="key">
          <coin-box :coin="i" :info="coinNames[key]"  :value="$store.state.coinPrices[key]"/>
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
    name: 'HomeLayout',
    components:{
      CoinBox
    },
    data: () => ({
      coins: coinList,
      coinNames : [],
      coinCodes:[],
      
    }),
    computed:{
      coinPrices(){
        return this.$store.state.coinPrices;
      }
    },
    

    async created(){
      this.$store.state.coinPrices = [];
      this.coins.map(data => {
        this.coinCodes.push(data.coin)
        this.coinNames.push(data.name)
        this.$store.state.coinPrices.push(null)
      })
      
    },
    async mounted(){
      let self = this;
      this.connection = new W3CWebSocket("wss://api.upbit.com/websocket/v1")
      this.connection.binaryType = "arraybuffer";
      
      this.connection.onmessage = function(event) {        
        const enc = new encoding.TextDecoder("utf-8");
        const arr = new Uint8Array(event.data);
        const data = JSON.parse(enc.decode(arr));
        // self.add([data.cd, data.tp])
        // console.log(data)
        for (var i in self.coinCodes){
          // console.log(coin)
          if (self.coinCodes[i] == data.cd){
            self.$store.state.coinPrices[i]=data.tp
            self.$store.state.coinPrices.push(data.tp)
            self.$store.state.coinPrices.pop()
            // console.log(self.$store.state.coinPrices.length )
          }
        }        
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
  

  }
</script>
