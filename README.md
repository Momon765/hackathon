# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
    - 3.3.0
* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
* ...

## Setup

### イメージビルド & コンテナ起動
```bash
docker compose up --build -d
```

### Dockerのコンテナ起動
```bash
 docker compose up -d
```

### Dockerのコンテナ終了
```bash
 docker compose down
```

### Dockerのコンテナ再起動
```bash
 docker compose restart -d
```

### Dockerのコンテナに入る
```bash
 docker compose exec runner bash
```

### データベースの作成
```bash
 docker compose exec runner sh db/entrypoint.sh
```

### rspecの実行
```bash
 docker compose exec runner bundle exec rspec
```

### rubocopの実行
```bash
 docker compose exec runner bundle exec rubocop
```

