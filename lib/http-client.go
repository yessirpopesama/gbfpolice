package lib

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	NetUrl "net/url"
	"time"
)

type HTTPClient struct {
	timeout int64
}

func (http_client *HTTPClient) SetTimeout(timeout int64) {
	http_client.timeout = timeout
}

func NewHTTPClient(timeout int64) *HTTPClient {
	return &HTTPClient{
		timeout: timeout,
	}
}

func (http_client *HTTPClient) FetchRequest(method string, url string, params NetUrl.Values, data interface{}, headers http.Header) (*http.Response, error) {
	var (
		req *http.Request
		err error
	)
	if params != nil {
		url += "?" + params.Encode()
	}
	if data != nil {
		body, err := json.Marshal(data)
		if err != nil {
			return nil, err
		}

		req, err = http.NewRequest(method, url, bytes.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
	} else {
		req, err = http.NewRequest(method, url, nil)
	}
	// req.Header = headers
	if headers != nil {
		req.Header = headers
	}
	if err != nil {
		return nil, err
	}
	client := http.Client{}
	if http_client.timeout > 0 {
		client.Timeout = time.Duration(http_client.timeout) * time.Millisecond
	}
	resp, err := client.Do(req)
	//fmt.Println("resp headers", resp.Header)
	if err != nil {
		log.Printf("try get url<%s> failed, get error %s\n", url, err)
	} else if resp.StatusCode >= 500 {
		log.Printf("try get url<%s> failed, get error code %d\n", url, resp.StatusCode)
	} else if resp.StatusCode >= 400 {
		log.Printf("try get url<%s> failed, get error code %d\n", url, resp.StatusCode)
	}
	return resp, err
}

func (http_client *HTTPClient) Post(url string, params NetUrl.Values, data interface{}, headers http.Header) (*http.Response, error) {
	resp, err := http_client.FetchRequest("POST", url, params, data, headers)
	return resp, err
}
