# میتوانید از طریق آدرس دامنه زیر دمو نرم افزار را مشاهده بفرمایید:
https://next-naft.liara.run/

# آموزش دپلوی اپلیکیشن هوشمند حضور غیاب (با تشخیص چهره) در سرور لوکال

به منظور دپلوی این پروژه به صورت لوکال لازم است که سه سرویس NestJS، Next.js و Python بر روی سرور مورد نظر Run شوند. به منظور راحتی شما عزیزان دو روش دپلوی در زیر توضیخ داده شده است. پیشنهاد ما استفاده از روش استقرار اول (با استفاده از داکر) است. 

## پیش‌نیازها

داکر باید روی سیستمتون نصب باشه 

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


# اجرا بدون داکر  

## پیش‌نیازها


- [Node-js](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Python](https://www.python.org/downloads)
## مراحل نصب و جرا  



### 1. Next js 

```sh
npm install
#
npm run build
#
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 2. Nest js

```sh
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 
### 3. main.py

```sh
# install MySQL Connector
pip install mysqlclient

# install Redis-py
pip install redis

# run code
python script.py
```
 
### 3. camera.py

```sh
# Install OpenCV for image processing and face detection
pip install opencv-python

# Install Redis client for connecting to Redis database
pip install redis

# Install NumPy for numerical operations
pip install numpy

# Install PersianTools for working with Jalali dates
pip install persiantools

# Install MySQL Connector for connecting to MySQL database
pip install mysql-connector-python

# run code
python script.py
```
