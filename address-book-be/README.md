## Requirements
Laravel `10.43.0`  
PHP `8.1.8.3`

## Installation
1. Install [Xampp](https://www.apachefriends.org/it/download.html) or any php support.
2. Install [Composer](https://getcomposer.org/download/)
```
cd <repo>\address-book-be
```
```
npm install
```
```
composer install
```
```
cp .env.example .env
```
Tune DB info
```
php artisan key:generate
```

## Run
Run MySQL DB by Xampp

One terminal for
```
npm run dev
```
One terminal for
```
php artisan serve
```