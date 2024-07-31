# سیستم حضور غیاب با تشخیص چهره

این پروژه شامل سرویس‌های NestJS، Next.js و یک اسکریپت Python برای تشخیص چهره است که همگی به غیر از کد Python با Docker و Docker Compose مدیریت می‌شوند.

## پیش‌نیازها

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## مراحل استقرار

### 1. کلون کردن مخزن

ابتدا، مخزن را کلون کنید:

```sh
git clone https://github.com/amirzerok/Attendance-System-Docker.git
cd repository
```
### 2. ساخت و اجرای کانتینرها

ابرای ساخت و اجرای کانتینرها، دستورات زیر را اجرا کنید:

```sh
docker-compose build
docker-compose up -d
```


### 3. دسترسی به سرویس‌ها:
```sh
Next.js: از طریق مرورگر به آدرس http://server_ip_address:3000 بروید.
NestJS: از طریق مرورگر به آدرس http://server_ip_address:3001 بروید.
```




### 4. باز کردن پورت‌ها در فایروال (در صورت نیاز)
اگر از فایروال استفاده می‌کنید، ممکن است نیاز باشد که پورت‌های مربوطه را باز کنید. برای مثال، در اوبونتو:
```sh
sudo ufw allow 3000
sudo ufw allow 3001
```
###
### متغیرهای محیطی پایگاه داده
در فایل docker-compose.yml، تنظیمات پایگاه داده PostgreSQL به صورت زیر است:

```sh
environment:
  POSTGRES_DB: mydatabase
  POSTGRES_USER: myuser
  POSTGRES_PASSWORD: mypassword
```
