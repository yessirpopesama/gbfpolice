import requests

def session():
	url = 'http://info.gbfteamraid.fun/login'
	s = requests.session()
	res = s.post(url)
	tmp = s.cookies.get_dict()
	return tmp['JSESSIONID']


demo_session = session()
print demo_session