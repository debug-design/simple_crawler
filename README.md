
```
npm install
node crawler.js
```

docker build -t juscah/simple_crawler .
docker run -ti --rm -p 9090:9090 -v crawler:/data juscah/simple_crawler sh



example url table
```
http://HOST:9090/
```

example url historico
```
http://HOST:9090/historico?turbina=5&grupo=2&fecha=01%2F02%2F2017
```