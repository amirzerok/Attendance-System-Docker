# سیستم حضور غیاب با تشخیص چهره

این پروژه شامل سرویس‌های NestJS، Next.js و یک اسکریپت Python برای تشخیص چهره است که همگی با Docker و Docker Compose مدیریت می‌شوند.

## پیش‌نیازها

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## مراحل استقرار

### 1. کلون کردن مخزن

ابتدا، مخزن را کلون کنید:

```sh
git clone https://github.com/username/repository.git
cd repository

### 2. ساخت و اجرای کانتینرها

ابرای ساخت و اجرای کانتینرها، دستورات زیر را اجرا کنید:

```sh
docker-compose build
docker-compose up -d



### 3. 3. دسترسی به سرویس‌ها:

Next.js: از طریق مرورگر به آدرس http://server_ip_address:3000 بروید.
NestJS: از طریق مرورگر به آدرس http://server_ip_address:3001 بروید.
Python Service: از طریق مرورگر به آدرس http://server_ip_address:5000 بروید.
