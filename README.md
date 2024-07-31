# میتوانید از طریق آدرس دامنه زیر دمو نرم افزار را مشاهده بفرمایید:
https://next-naft.liara.run/

# آموزش دپلوی و استقرار اپلیکیشن هوشمند حضور غیاب (تشخیص چهره با روش های هوش مصنوعی) در سرور لوکال

به منظور دپلوی اپلیکیشن این پروژه (کد های پایتون باید به صورت جدا بر روی برد ای مانند رزبری پای یا سرور داخلی نصب شوند) به صورت لوکال لازم است که 2 سرویس NestJS، Next.js بر روی سرور تحت وب مورد نظر Run شوند. به منظور راحتی شما عزیزان، 2 روش برای دپلوی در زیر توضیح داده شده است. پیشنهاد ما استفاده از روش استقرار اول (با استفاده از داکر) است. در روش دوم (بدون استفاده از داکر) ممکن است به دلیل محدودیت های مختلفی مانند تحریم و سرعت اینترنت، سرویس ها به درستی Run نشوند.

## روش استقرار 1 - با استفاده از داکر

## پیش‌نیاز
قبل از اینکه مراحل را انجام دهید اطمینان حاصل کنید که داکر بر روی سرور شما نصب باشد: 

- [Docker](https://www.docker.com/get-started)
### 1. کلون کردن مخزن گیت هاب

ابتدا، مخزن گیت هاب را کلون کنید. بدین منظور دستورات زیر را در محیط ترمینال به ترتیب وارد کنید:

```sh
git clone https://github.com/amirzerok/Attendance-System-Docker.git
cd repository
```
### 2. ساخت و اجرای کانتینرها با استفاده از فایل docker-compose.yml

برای ساخت و اجرای کانتینرها، دستورات زیر را در محیط ترمینال به ترتیب وارد کنید:

```sh
docker-compose build
docker-compose up -d
```
### 3. تست UP بودن سرویس های next و nest که در بالا دستور بالا آمدن آنها را وارد کردیم :
```sh
Next.js: http://server_ip_address:3000 
NestJS:  http://server_ip_address:3001
```
### 4. باز کردن پورت‌ها در فایروال (در صورت نیاز)
اگر از فایروال استفاده می‌کنید، ممکن است نیاز باشد که پورت‌های مربوطه را باز کنید. برای مثال، در اوبونتو:
```sh
sudo ufw allow 3000
sudo ufw allow 3001
```
###

# روش استفرار 2 - بدون استفاده از داکر  

## پیش‌نیازها
قبل از اینکه مراحل را انجام دهید اطمینان حاصل کنید که کتابخانه های زیر بر روی سرور شما نصب باشند:


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


# آموزش دپلوی و استقرار کد پایتون مربوط به ...... در سرور لوکال مستقر در شبکه داخلی



 
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
