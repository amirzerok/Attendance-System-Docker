import cv2
import redis
import base64
import numpy as np
from persiantools.jdatetime import JalaliDateTime
import mysql.connector
from datetime import datetime

# اتصال به دیتابیس Redis
redis_connection = redis.StrictRedis(host='himalayas.liara.cloud', password='jfeHfKCSyXtqNBuPKdAnHKC6', port=30723, db=0)

# اتصال به دیتابیس MySQL
mysql_connection = mysql.connector.connect(host='himalayas.liara.cloud',
                             database='admiring_varahamihira',
                             port='30290',
                             user='root',
                             password='XSYrbTJ2bjpDtg5lE8liZTpx')

# استفاده از کلاسی برای تشخیص چهره
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# تابع تشخیص چهره
def detect_faces(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

# تبدیل تصویر رشته Base64 به تصویر OpenCV
def base64_to_cv2(base64_string):
    decoded_data = base64.b64decode(base64_string)
    np_data = np.frombuffer(decoded_data, np.uint8)
    image = cv2.imdecode(np_data, cv2.IMREAD_COLOR)
    return image

# تبدیل تصویر به رشته Base64
def cv2_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    jpg_as_text = base64.b64encode(buffer)
    return jpg_as_text.decode('utf-8')

# تابع برای مقایسه دو تصویر چهره
def compare_faces(face1, face2):
    # تبدیل تصاویر به grayscale و تغییر اندازه آن‌ها به یک اندازه استاندارد
    gray_face1 = cv2.resize(face1, (100, 100))
    gray_face2 = cv2.resize(face2, (100, 100))
    
    # محاسبه میانگین مربعاتی خطا بین دو تصویر
    error = np.square(gray_face1 - gray_face2).mean()
    
    # اگر مقدار خطای محاسبه شده کمتر از یک حد آستانه باشد، دو تصویر به یکدیگر شباهت دارند
    threshold = 100  # مقدار آستانه قابل تنظیم است
    if error < threshold:
        return True
    else:
        return False

# فلگ برای بررسی ثبت تکراری
is_person_detected = False

# اتصال به دوربین
camera = cv2.VideoCapture(0)

while True:
    # خواندن تصویر از دوربین
    ret, frame = camera.read()
    
    # تشخیص چهره‌ها در تصویر
    faces = detect_faces(frame)

    # نمایش مستطیل دور چهره‌ها و بررسی تشخیص هر چهره با موجودیت‌های قبلی
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        
        # برش تصویر چهره
        face_roi = frame[y:y+h, x:x+w]

        # تبدیل تصویر چهره به رشته Base64
        face_encoded_str = cv2_to_base64(face_roi)
        
        # جستجو در دیتابیس Redis برای کلید‌هایی که به عنوان کد ملی شناخته شده‌اند
        for key in redis_connection.scan_iter():
            national_code = key.decode('utf-8')  # تبدیل کلید به رشته
            # دریافت تصویر چهره از دیتابیس Redis
            face_from_redis = redis_connection.get(national_code)
            face_decoded = base64_to_cv2(face_from_redis)
            # مقایسه چهره‌ها
            if compare_faces(face_roi, face_decoded) and not is_person_detected:
                print("Face matched with national code:", national_code)
                
                # بررسی وجود رکورد‌های قبلی در جدول MatchedPersons با تاریخ فعلی
                current_date = datetime.now().strftime('%Y-%m-%d')
                cursor = mysql_connection.cursor()
                cursor.execute("SELECT COUNT(*) FROM MatchedPersons WHERE nationalCode = %s AND detectionTime LIKE %s", (national_code, f"{current_date}%"))
                existing_records_count = cursor.fetchone()[0]
                
                # اگر هیچ رکوردی با تاریخ مشخص در اون روز یافت نشد، اطلاعات را در جدول ذخیره کنید
                if existing_records_count == 0 and not is_person_detected:
                    # دریافت اطلاعات فرد از دیتابیس MySQL
                    cursor.execute("SELECT firstName, lastName FROM NewPerson WHERE nationalCode = %s", (national_code,))
                    person_data = cursor.fetchone()
                    first_name, last_name = person_data

                    # ذخیره تاریخ و زمان شمسی فعلی
                    current_jalali_time = JalaliDateTime.now().strftime('%Y-%m-%d %H:%M:%S')
                    
                    # ذخیره اطلاعات در جدول جدید
                    cursor.execute("INSERT INTO MatchedPersons (nationalCode, firstName, lastName, detectionTime) VALUES (%s, %s, %s, %s)", (national_code, first_name, last_name, current_jalali_time))
                    mysql_connection.commit()
                    is_person_detected = True
                elif existing_records_count > 0:
                    print("This person has already been detected today.")

    # نمایش تصویر باز شده
    cv2.imshow('Camera', frame)
    
    # ایجاد امکان خروج از حلقه با فشردن کلید 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# آزاد کردن دوربین و بستن پنجره‌های نمایش
camera.release()
cv2.destroyAllWindows()
mysql_connection.close()
