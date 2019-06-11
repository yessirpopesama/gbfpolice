package model

type RankInfo struct {
	UpdateDate string `json:"updatedate"`
	MaxP       string `json:"maxp"`
	MinP       string `json:"minp"`
}

type PoliceResp struct {
	Err    string     `json:"err"`
	Msg    string     `json:"msg"`
	Result []RankInfo `json:"result"`
}
