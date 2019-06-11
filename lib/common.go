package lib

var (
	Client *HTTPClient
)

func init() {
	Client = NewHTTPClient(5000)
}
