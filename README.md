## Home Library Service Part 2

clone repository

git checkout part-2

rename: .env.examlpe --> .env

### build from local

docker-compose up -d

### build from dockerhub

docker-compose -f ./docker-compose.public.yml up -d

---

localhost:4000 - nest app

localhost:4000/docs - swagger

if need, localhost:8080 - adminer for postgres container
