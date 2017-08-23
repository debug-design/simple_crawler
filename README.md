
```
npm install
node crawler.js
```

docker build -t juscah/simple_crawler .
docker run -ti --rm -p 9090:9090 -v crawler:/data juscah/simple_crawler sh

example url
```
http://190.119.255.126/egasa/Formularios/Charcani5.aspx?turbina=1&grupo=1&date=08%2F21%2F2017
```