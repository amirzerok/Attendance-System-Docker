import MySQLdb
import redis
import base64
import urllib.request
import time  # برای استفاده از توقف (pause)

# اتصال به دیتابیس Redis
redis_connection = redis.StrictRedis(host='himalayas.liara.cloud', password='jfeHfKCSyXtqNBuPKdAnHKC6', port=30723, db=0)

while True:  # حلقه بی‌نهایت برای اجرای مداوم کد
    try:
        # اتصال به دیتابیس MySQL
        mysql_connection = MySQLdb.connect(host='himalayas.liara.cloud', user='root', password='XSYrbTJ2bjpDtg5lE8liZTpx', database='admiring_varahamihira', port=30290)
        mysql_cursor = mysql_connection.cursor()

        # دریافت اطلاعات از جدول دیتابیس MySQL
        mysql_cursor.execute("SELECT nationalCode, face FROM NewPerson")
        results = mysql_cursor.fetchall()

        # بستن اتصال MySQL
        mysql_cursor.close()
        mysql_connection.close()

        # پردازش اطلاعات
        for result in results:
            national_code, face_link = result
            print("National Code:", national_code)
            print("Face Link:", face_link)
            print()

            # دانلود تصویر از لینک
            try:
                image_path, _ = urllib.request.urlretrieve(face_link)
                with open(image_path, "rb") as img_file:
                    # انکود تصویر به صورت base64
                    encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
                    # ذخیره تصویر انکود شده در دیتابیس Redis با استفاده از کد ملی به عنوان کلید
                    redis_connection.set(national_code, encoded_image)
                    print("Image encoded and saved successfully!")
            except Exception as e:
                print("Error processing image:", e)

    except Exception as e:
        print("Error connecting to MySQL:", e)

    # استراحت برای مدت زمانی خاص (مثلا یک دقیقه)
    time.sleep(5)
