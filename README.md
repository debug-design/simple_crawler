
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
http://HOST:9090/historico?turbina=1&grupo=1&date=08%2F21%2F2017
```