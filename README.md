### Prerequisities

- Install [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

<br>

### Usage

- Download and navigate to project
```
git clone https://github.com/Jonathan-Eid/hrdashboard.git
cd hrdashboard
```

- Install Dependencies
```
cd client && yarn
cd ../server && yarn
cd ..
```


- Start project
```
docker-compose build
docker-compose up -d
```

- Navigate to ```localhost:5173```

### Teardown

```
docker-compose down
cd ..
sudo rm -rf hrdashboard
```



### Documentation

- Read about the User Flow and Design Considerations:

[UserFlow.pdf](https://github.com/Jonathan-Eid/hrdashboard/blob/master/UserFlow.pdf)
[Commentary.pdf](https://github.com/Jonathan-Eid/hrdashboard/blob/master/Commentary.pdf)