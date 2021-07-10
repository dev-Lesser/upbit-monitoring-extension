<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 >
        <v-card>
          <v-card-subtitle>
            {{upbit}}
          </v-card-subtitle>
          <v-btn v-on:click="send()">send</v-btn>
          {{upbit}}
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { w3cwebsocket as W3CWebSocket } from "websocket";
import encoding from "text-encoding";
  export default {
    name: 'HelloWorld',

    data: () => ({
      upbit: {
        "KRW-BTC": null, "KRW-ETH": null,
      }
    }),
    async mounted(){
      this.connection = new W3CWebSocket("wss://api.upbit.com/websocket/v1")
      this.connection.binaryType = "arraybuffer";
      let self = this;
      this.connection.onmessage = function(event) {
        // console.log(event)
        
        const enc = new encoding.TextDecoder("utf-8");
        const arr = new Uint8Array(event.data);
        const data = JSON.parse(enc.decode(arr));
        console.log(data)
        self.upbit[data.cd] = data.tp
      }

      this.connection.onopen = function(event) {
        console.log(event)
        console.log("Successfully connected to the echo websocket server...")
      }

      },
  
  methods:{
    send(){
      var subscribe_fmt = JSON.stringify([ 
            {'ticket' :'test'},
            {
                "type": "ticker", // ticker -> 현재가, trade -> 체결, orderbook => 호가
                "codes":["KRW-BTC", "KRW-ETH"], // 수신 시세 종목 정보 (대문자)
                "isOnlyRealtime": true // 실시간 시세만
            },
            {"format":"SIMPLE"} //# simple -> 간소화,
        ])
      
        this.connection.send(subscribe_fmt)
    }
  }
  }
</script>
