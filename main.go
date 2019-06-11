package main

import (
	"encoding/json"
	"fmt"
	"gbf-police/lib"
	"gbf-police/model"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "http://info.gbfteamraid.fun/web/userrank"
	body := map[string]interface{}{}

	resp, err := lib.Client.Post(url, nil, body, http.Header{
		"Host":             []string{"info.gbfteamraid.fun"},
		"Connection":       []string{"keep-alive"},
		"Content-Length":   []string{"86"},
		"Pragma":           []string{"no-cache"},
		"Cache-Control":    []string{"no-cache"},
		"Accept":           []string{"*/*"},
		"Origin":           []string{"http://info.gbfteamraid.fun"},
		"X-Requested-With": []string{"XMLHttpRequest"},
		"User-Agent":       []string{"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"},
		"Content-Type":     []string{"application/x-www-form-urlencoded;charset=UTF-8"},
		"Accept-Encoding":  []string{"gzip, deflate"},
		"Accept-Language":  []string{"zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7"},
		"Cookie":           []string{"JSESSIONID=01494BAA7D8B95E213073DE3DA6AECEA"},
	})
	if err != nil {
		fmt.Println("request error", err)
		panic("request error")
	}
	respBody, err := ioutil.ReadAll(resp.Body)
	fmt.Println("resp Body: ", respBody)

	var policeResp model.PoliceResp
	err = json.Unmarshal(respBody, &policeResp)
	if err != nil {
		fmt.Println("err: ", err)
	}
	defer resp.Body.Close()
}
